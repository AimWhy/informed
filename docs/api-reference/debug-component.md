# `Debug Component`

Sometimes you just want to see whats going on with the form state. This can easily be achieved by rendering Debug components.

```jsx
import { Debug, DebugField } from 'informed';
import { Form, Input } from 'YourComponents';

const Example = () => (
  <Form>
    <Input name="name" label="Name:" />
    <button type="submit">Submit</button>
    <Debug />
    <DebugField name="name" />
  </Form>
);

export default Example;
```

```jsx
import { Debug, DebugField } from 'informed';
import { Form, Input } from 'YourComponents';

const Example = () => (
  <Form>
    <Input name="name" label="Name:" />
    <button type="submit">Submit</button>
    <Debug />
    <DebugField name="name" />
  </Form>
);

export default Example;
```