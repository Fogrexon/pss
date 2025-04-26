// filepath: c:\projects\bubble-ui\src\core\createRenderer.ts
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
 * This factory function simplifies the setup process for users.
 * 
 * @returns A configured renderer instance
 */
export function createRenderer(): Renderer {
  // Initialize all the necessary components
  const eventManager = new EventManager();
  const componentManager = new ComponentManager();
  const differ = new Differ();
  const committer = new Committer(eventManager);
  
  // Create and configure the reconciler with its dependencies
  const reconciler = new Reconciler(
    componentManager,
    differ,
    committer,
    eventManager
  );
  
  // Return a ready-to-use renderer
  return new Renderer(reconciler);
}
