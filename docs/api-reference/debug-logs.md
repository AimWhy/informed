# Debugging Logs

Sometimes you just want to see whats going on under the hood. Informed also comes with internal logging that can be enabled in following ways:

## When running in a browser ( development )

```jsx
localStorage.debug = 'informed:.*';
```

## When running in React Native ( development )

## When running in node ( unit tests )

```jsx
DEBUG = 'informed:.*';
```

---

## Testing it out

Below is an example form with a single input and submit button. Look at the browser console and enable the logs with `localStorage.debug = 'informed:.*';`

```jsx
import { Debug, DebugField } from 'informed';
import { Form, Input } from 'YourComponents';

const Example = () => (
  <Form>
    <Input name="name" label="Name:" />
    <button type="submit">Submit</button>
  </Form>
);

export default Example;
```

If done correctly it should look like the following when you reload and then type `"Hi"`

```jsx
import { Debug, DebugField } from 'informed';
import { Form, Input } from 'YourComponents';

const Example = () => (
  <Form>
    <Input name="name" label="Name:" />
    <button type="submit">Submit</button>
  </Form>
);

export default Example;
```