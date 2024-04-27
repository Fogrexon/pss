import { SampleClass } from './index';

test('sample class method', () => {
  expect(new SampleClass().testMethod()).toBe("SampleClass")
})
