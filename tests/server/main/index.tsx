import { useEffect, useState } from '~/index';
import { DOMRenderer } from '~/renderer/dom';

const root = document.getElementById('root');

const App = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => { setCounter(v => v + 1) }, 1000);
    return () => clearTimeout(handle);
  }, []);
  return (
    <div>
      <span>counter: {counter}</span>
      <input></input>
    </div>
  );
};

DOMRenderer.createRoot(root!).mount(<App />);