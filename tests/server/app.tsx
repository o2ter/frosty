import _ from 'lodash';
import { useState, useEffect, useAsyncEager } from '~/index';
import { useLocation, useSearchParams } from '~/web';

export default () => {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [text, setText] = useState('');
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(location)
  useEffect(() => {
    const handle = setInterval(() => { setCounter(v => v + 1); }, 1);
    return () => clearTimeout(handle);
  }, []);
  useAsyncEager(async () => {
    console.log('hello')
    await new Promise(res => setTimeout(res, 1000));
  }, []);
  return (
    <div
      style={{
        padding: 64,
        margin: 16,
        backgroundColor: `rgb(${counter % 256}, 0, 0)`,
      }}
      inlineStyle={{
        padding: 32,
        margin: 16,
      }}
    >
      <table bgColor='aliceblue'>
        {_.map(_.range(2), i => <tr>
          {_.map(_.range(2), j => <td>{i * counter + j}</td>)}
        </tr>
        )}
      </table>
      <div innerHTML={`<span>${counter}</span>`} />
      <button onClick={() => setCounter2(v => v + 1)}>Click</button>
      <button onClick={() => setSearchParams(v => {
        v.set('test', `${counter}`);
        return v;
      })}>Click2</button>
      <span>{counter2}</span>
      <input value={text} onInput={(e) => {
        setText(e.currentTarget.value);
      }} />
      <input value={text} onInput={(e) => {
        setText(e.currentTarget.value);
      }} />
    </div>
  );
};
