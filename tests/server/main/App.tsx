import _ from 'lodash';
import { useState, useEffect } from '~/index';

export const App = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => { setCounter(v => v + 1); }, 1);
    return () => clearTimeout(handle);
  }, []);
  return (
    <div>
      <table>
        {_.map(_.range(2), i => <tr>
          {_.map(_.range(2), j => <td>{i * counter + j}</td>)}
        </tr>
        )}
      </table>
    </div>
  );
};
