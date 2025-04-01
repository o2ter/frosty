import _ from 'lodash';
import { useState, useEffect } from '~/index';

export const App = () => {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => { setCounter(v => v + 1); }, 1);
    return () => clearTimeout(handle);
  }, []);
  return (
    <div>
      {typeof window === 'undefined' && (
        <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossOrigin="anonymous" />
        </head>
      )}
      <table bgColor='aliceblue'>
        {_.map(_.range(2), i => <tr>
          {_.map(_.range(2), j => <td>{i * counter + j}</td>)}
        </tr>
        )}
      </table>
      <div innerHTML={`<span>${counter}</span>`} />
      <button onClick={() => setCounter2(v => v + 1)}>Click</button>
      <span>{counter2}</span>
    </div>
  );
};
