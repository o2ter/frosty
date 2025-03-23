import { DOMRenderer } from '~/renderer/dom';
import { App } from './App';

const root = document.getElementById('root');

DOMRenderer.createRoot(root!).mount(<App />);