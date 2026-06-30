# `Keep State If Relevant`

Sometimes you need to keep the state of a field even when it gets unmounted (no longer rendered on screen), but only if the field is still relevant. This is useful when you have conditional fields that may be hidden and shown based on other form values. The `keepStateIfRelevant` prop ensures that a field's state is preserved when it's unmounted, but only if the field would still be relevant according to its relevance conditions. If the field becomes irrelevant, its state will be removed. **Instructions:** 1. Fill in both name fields 2. Click "Hide" to unmount the fields - notice how name1's state is removed but name2's is kept 3. Click "Show" to remount the fields - name2's value returns 4. Uncheck the "Show" checkbox - notice how name2's state is removed because it's now irrelevant

```jsx
import { useState } from 'react';
import { Relevant, Debug } from 'informed';
import { Form, Input, Checkbox, Button } from 'YourComponents';

export default function Example() {
  const [show, setShow] = useState(true);

  const toggle = () => setShow(prev => !prev);

  return (
    <Form>
      {show ? <Input name="name1" label="Name:" /> : null}
      <Checkbox name="show" label="Show" defaultValue={true} />
      <Relevant when={({ formState }) => formState.values.show}>
        {show ? <Input name="name2" label="Name:" keepStateIfRelevant /> : null}
      </Relevant>
      <br />
      <Button type="button" onClick={toggle}>
        {show ? 'Hide' : 'Show'}
      </Button>
      <Debug values />
    </Form>
  );
}
```

```jsx
import { useState } from 'react';
import { Relevant, Debug } from 'informed';
import { Form, Input, Checkbox, Button } from 'YourComponents';

export default function Example() {
  const [show, setShow] = useState(true);

  const toggle = () => setShow(prev => !prev);

  return (
    <Form>
      {show ? <Input name="name1" label="Name:" /> : null}
      <Checkbox name="show" label="Show" defaultValue={true} />
      <Relevant when={({ formState }) => formState.values.show}>
        {show ? <Input name="name2" label="Name:" keepStateIfRelevant /> : null}
      </Relevant>
      <br />
      <Button type="button" onClick={toggle}>
        {show ? 'Hide' : 'Show'}
      </Button>
      <Debug values />
    </Form>
  );
}
```