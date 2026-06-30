# Hidden Field

Sometimes you need to store values that are not shown to the user.

```jsx
import { Debug } from 'informed';
import { Form, Input, Hidden } from 'YourComponents';

const Example = () => (
  <Form initialValues={{ name: 'Elon', age: 51, worth: 200_000_000_000 }}>
    <Input name="name" label="Name" />
    <Input name="age" type="number" label="Age" />
    <Hidden name="worth" />
    <Debug values />
  </Form>
);

export default Example;
```

In order to do so you must build a custom hidden field as follows:

```jsx
import { useField } from 'informed';

const Hidden = props => {
  const { informed, render, userProps, ref } = useField({
    type: 'text',
    ...props
  });

  return render(<input {...informed} {...userProps} ref={ref} type="hidden" />);
};

export default Hidden;
```

```jsx
import { Debug } from 'informed';
import { Form, Input, Hidden } from 'YourComponents';

const Example = () => (
  <Form initialValues={{ name: 'Elon', age: 51, worth: 200_000_000_000 }}>
    <Input name="name" label="Name" />
    <Input name="age" type="number" label="Age" />
    <Hidden name="worth" />
    <Debug values />
  </Form>
);

export default Example;
```

```jsx
import { useField } from 'informed';

const Hidden = props => {
  const { informed, render, userProps, ref } = useField({
    type: 'text',
    ...props
  });

  return render(<input {...informed} {...userProps} ref={ref} type="hidden" />);
};

export default Hidden;
```