import _ from 'lodash';
import { useEffect, useState } from '~/index';
import { DOMRenderer } from '~/renderer/dom';

const root = document.getElementById('root');

const App = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => { setCounter(v => v + 1) }, 1);
    return () => clearTimeout(handle);
  }, []);
  return (
    <div>
      <table>
        {_.map(_.range(2), i =>
          <tr>
            {_.map(_.range(2), j => <td>{i * counter + j}</td>)}
          </tr>
        )}
      </table>
    </div>
  );
};

DOMRenderer.createRoot(root!).mount(<App />);