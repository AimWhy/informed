# `Form State`

Lets see an example of a single input. Note the `Debug` component and how we can view everything inside of the form state.

```jsx
import { Debug } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const Example = () => {
  return (
    <Form>
      <Input label="Name:" name="name" required />
      <Button type="submit">Submit</Button>
      <Debug />
    </Form>
  );
};

export default Example;
```

---

## State Attributes

```jsx
true
```

```jsx
true
```

```jsx
true
```

```jsx
true
```

```jsx
false
```

```jsx
true
```

```jsx
true
```

```jsx
1
```

```jsx
1
```

```jsx
import { Debug } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const Example = () => {
  return (
    <Form>
      <Input label="Name:" name="name" required />
      <Button type="submit">Submit</Button>
      <Debug />
    </Form>
  );
};

export default Example;
```