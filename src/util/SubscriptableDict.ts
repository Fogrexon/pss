/* eslint-disable no-param-reassign */
type SubscriptionEvent = 'create' | 'change' | 'delete';

function isPrimitive(value: unknown) {
  return value !== Object(value);
}

export const createSubscriptableObject = <T extends Record<string, unknown>>(
  original: T,
  func: (eventType: SubscriptionEvent, key: string, value: unknown) => void
) => {
  const newObject = {} as T;

  Object.keys(original).forEach((key) => {
    if (isPrimitive(original[key])) {
      (newObject as Record<string, unknown>)[key] = original[key];
    } else if (Array.isArray(original[key])) {
      // eslint-disable-next-line no-use-before-define
      (newObject as Record<string, unknown>)[key] = createSubscriptableArray(
        original[key] as unknown[],
        (insideType, insideKey, insideValue) => {
          func(insideType, `${key}.${insideKey}`, insideValue);
        }
      );
    } else {
      (newObject as Record<string, unknown>)[key] = createSubscriptableObject(
        original[key] as Record<string, unknown>,
        (insideType, insideKey, insideValue) => {
          func(insideType, `${key}.${insideKey}`, insideValue);
        }
      );
    }
  });

  return new Proxy<T>(original, {
    get(target, prop) {
      if (prop in target) {
        return target[prop as string];
      }
      return undefined;
    },
    set(target, prop, value) {
      if (prop in target) {
        (target as Record<string, unknown>)[prop as string] = value;
        func('change', prop as string, value);
      }
      if (isPrimitive(value)) {
        (target as Record<string, unknown>)[prop as string] = value;
        func('create', prop as string, value);
      }
      if (Array.isArray(value)) {
        // eslint-disable-next-line no-use-before-define
        (target as Record<string, unknown>)[prop as string] = createSubscriptableArray(
          value,
          (insideType, insideKey, insideValue) => {
            func(insideType, `${prop as string}.${insideKey}`, insideValue);
          }
        );
        func('create', prop as string, value);
      } else {
        (target as Record<string, unknown>)[prop as string] = createSubscriptableObject(
          value,
          (insideType, insideKey, insideValue) => {
            func(insideType, `${prop as string}.${insideKey}`, insideValue);
          }
        );
        func('create', prop as string, value);
      }
      return true;
    },
    deleteProperty(target: T, prop: string | symbol): boolean {
      delete target[prop as string];
      func('delete', prop as string, undefined);
      return true;
    },
  });
};

export const createSubscriptableArray = <T extends Array<unknown>>(
  original: T,
  func: (eventType: SubscriptionEvent, key: string, value: unknown) => void
) => {
  const newArray = [];

  for (let i = 0; i < original.length; i += 0) {
    if (isPrimitive(original[i])) {
      newArray[i] = original[i];
    } else if (Array.isArray(original[i])) {
      // eslint-disable-next-line no-use-before-define
      newArray[i] = createSubscriptableArray(
        original[i] as unknown[],
        (insideType, insideKey, insideValue) => {
          func(insideType, `${i}.${insideKey}`, insideValue);
        }
      );
    } else {
      newArray[i] = createSubscriptableObject(
        original[i] as Record<string, unknown>,
        (insideType, insideKey, insideValue) => {
          func(insideType, `${i}.${insideKey}`, insideValue);
        }
      );
    }
  }

  return new Proxy<T>(original, {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop as unknown as number];
      }
      return undefined;
    },
    set: (target, prop, value) => {
      if (prop in target) {
        target[prop as unknown as number] = value;
        func('change', prop as string, value);
      }
      if (isPrimitive(value)) {
        target[prop as unknown as number] = value;
        func('create', prop as string, value);
      }
      if (Array.isArray(value)) {
        target[prop as unknown as number] = createSubscriptableArray(
          value,
          (insideType, insideKey, insideValue) => {
            func(insideType, `${prop as unknown as number}.${insideKey}`, insideValue);
          }
        );
        func('create', prop as string, value);
      } else {
        target[prop as unknown as number] = createSubscriptableObject(
          value,
          (insideType, insideKey, insideValue) => {
            func(insideType, `${prop as unknown as number}.${insideKey}`, insideValue);
          }
        );
        func('create', prop as string, value);
      }
      return true;
    },
    deleteProperty(target: T, prop: string | symbol): boolean {
      delete target[prop as unknown as number];
      func('delete', prop as string, undefined);
      return true;
    },
  });
};
