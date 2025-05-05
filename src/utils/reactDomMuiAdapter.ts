/**
 * This file provides compatibility functions for MUI components that expect
 * older React DOM APIs that have been moved or renamed in React 18
 */
import * as ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';
import { flushSync } from 'react-dom';

// Adding missing methods to ReactDOM for MUI compatibility
if (!ReactDOM.createPortal) {
  (ReactDOM as any).createPortal = createPortal;
}

if (!ReactDOM.flushSync) {
  (ReactDOM as any).flushSync = flushSync;
}

export default ReactDOM; 