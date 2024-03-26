import { useEffect } from 'react';
import Example from './Example';
import exampleCode from './Example.jsx?raw';
import Code from '../../../YourComponents/Code';
import { SideBySide } from '../../../SideBySide';
import { Info } from '../../../Info';
import SlowExample from './SlowExample';
import slowExampleCode from './SlowExample.jsx?raw';

export const Metadata = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <h1>
        <code>Metadata</code>
      </h1>
      <h2>Sometimes you want to store some metadata next to a field.</h2>
      <Info>
        It helps to se an example where we slow it down with a fake request.
      </Info>
      <Info type="notice">
        Note: you can optionally pass <code>gatherOnBlur</code> to make it only
        gather data on blur.
      </Info>
      <Info type="notice">
        Note: you can optionally pass <code>gatherOnMount</code> to make it
        gather on mount.
      </Info>
      <SideBySide
        leftHeader={<h3>Example:</h3>}
        rightHeader={<h3>Code:</h3>}
        left={<SlowExample />}
        right={<Code links input1={slowExampleCode} />}
      />
      <hr />
      <Info>
        This example shows how you can use informed's gatherData to make api
        calls via google api.
      </Info>
      <SideBySide
        leftHeader={<h3>Example:</h3>}
        rightHeader={<h3>Code:</h3>}
        left={<Example />}
        right={<Code links input1={exampleCode} />}
      />
      <br />
      <br />
    </>
  );
};
