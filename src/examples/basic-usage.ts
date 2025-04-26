// filepath: c:\projects\bubble-ui\src\examples\basic-usage.ts
import { Application } from 'pixi.js';
import { createElement, createRenderer } from '../core';

// Create a PixiJS application
const app = new Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view as HTMLCanvasElement);

// Create our bubble-ui renderer
const renderer = createRenderer();

// Define a simple component
function Counter(props: { initialCount?: number }) {
  // In a real implementation, we would use hooks or some state management
  const count = props.initialCount || 0;
  
  return createElement(
    'container', // This would be mapped to a PIXI.Container in the reconciler
    { x: 400, y: 300 },
    createElement(
      'text',
      {
        text: `Count: ${count}`,
        style: {
          fill: 'white',
          fontSize: 24,
        },
        x: -50,
        y: -12,
      }
    ),
    createElement(
      'sprite',
      {
        texture: 'button', // In a real app, this would be a PIXI.Texture
        x: 50,
        y: 0,
        interactive: true,
        buttonMode: true,
        onClick: () => {
          // In a real implementation, this would update state and trigger a re-render
          console.log('Button clicked!');
        },
      }
    )
  );
}

// Create our virtual DOM tree
const vNode = createElement(
  'container',
  { x: 0, y: 0 },
  createElement(Counter, { initialCount: 0 })
);

// Render the virtual DOM tree to the PixiJS stage
renderer.render(vNode, app);

// In a real application, you might set up a render loop or event-based rendering
// For example:
/*
app.ticker.add(() => {
  // Update state based on time, input, etc.
  // Re-render the app
  renderer.render(updatedVNode, app);
});
*/
