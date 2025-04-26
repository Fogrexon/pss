import {
  Reconciler,
  ComponentManager,
  Differ,
  Committer,
  EventManager
} from './reconciler';
import { Renderer } from './Renderer';

/**
 * Creates a renderer instance with all necessary dependencies configured.
 * This factory function instantiates and wires together the core components
 * (EventManager, ComponentManager, Differ, Committer, Reconciler)
 * required for the rendering process, simplifying setup for the user.
 *
 * @returns A fully configured and ready-to-use Renderer instance.
 */
export const createRenderer = (): Renderer => {
  const eventManager = new EventManager();
  const componentManager = new ComponentManager();
  const differ = new Differ();
  const committer = new Committer(eventManager);

  const reconciler = new Reconciler(
    componentManager,
    differ,
    committer,
    eventManager
  );

  return new Renderer(reconciler);
}
