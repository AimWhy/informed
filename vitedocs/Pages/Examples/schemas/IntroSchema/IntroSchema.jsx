import { useEffect } from 'react';
import Example from './Example';
import exampleCode from './Example.jsx?raw';
import Code from '../../../../YourComponents/Code';
import { SideBySide } from '../../../../SideBySide';
import { Info } from '../../../../Info';
import adapderCode from '../../../../YourComponents/AdobeAdapter.jsx?raw';

export default function IntroSchema() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <h1>
        <code>JSON Schema Form</code>
      </h1>
      <Info>
        Informed allows you to pass a JSON schema to the form and it will render
        out the form accoding to the adapter configured.
      </Info>
      <SideBySide
        leftHeader={<h3>Example: </h3>}
        rightHeader={<h3>Code:</h3>}
        left={<Example />}
        right={<Code links input1={exampleCode} />}
      />
      <hr />
      <Info>
        How did it know? It knew what to render based on an adapter.
        <br />
        <br />
        Informed has a default adapter but more often than not you will create
        your own adapter that maps to your components.
      </Info>
      <Code input1={adapderCode} />
      <Info>Then when you wrap your form component you pass the adapter.</Info>
      <Code />
      <br />
      <br />
    </>
  );
}
