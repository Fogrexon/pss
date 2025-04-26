import { Application, Container } from 'pixi.js';
import { VNode, RenderTarget } from './types';
import { IReconciler } from './reconciler';

/**
 * Renderer class for managing the rendering of virtual DOM trees to PixiJS containers.
 */
export class Renderer {
    private rootVNode: VNode | null = null;
    private rootContainer: Container | null = null;
    private reconcilerInstance: IReconciler;

    /**
     * Creates a Renderer instance with the specified reconciler.
     * @param reconciler The reconciler instance to use.
     */
    constructor(reconciler: IReconciler) {
        this.reconcilerInstance = reconciler;
    }

    /**
     * Renders the specified virtual DOM tree to the given PixiJS container.
     * @param element The root virtual DOM element to render.
     * @param container The target PixiJS container for rendering.
     */
    public render(element: VNode | null, container: RenderTarget): void {
        if (!container) {
            console.error('Render target container is required.');
            return;
        }

        const targetContainer = container instanceof Application ? container.stage : container;

        // Delegate processing to the reconciler
        this.reconcilerInstance.reconcile(element, this.rootVNode, targetContainer);

        // Update the root VNode after rendering
        this.rootVNode = element;
        if (element) {
            this.rootContainer = targetContainer;
        } else {
            // Clear container reference if element is null (unmount)
            this.rootContainer = null;
        }
    }

    // TODO: Implement additional methods like unmountComponentAtNode if needed
}
