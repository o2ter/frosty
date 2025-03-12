import { DOMRenderer } from '~/renderer/dom';

const root = document.getElementById('root');

const App = () => {
  return (
    <div>
      <span>test</span>
    </div>
  );
};

DOMRenderer.createRoot(root!).mount(<App />);