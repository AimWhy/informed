# `Modified`

Sometimes you want to know what fields have been changed from their initial values. Informed provides a `modified` object that tracks which fields have been modified since the form was initialized. The `modified` object contains: • `true` for fields that have been changed • `false` for fields that remain unchanged • `undefined` for fields that don't exist in initialValues This is useful for: • Optimizing API calls by only sending changed data • Showing visual indicators for modified fields • Implementing "unsaved changes" warnings • Conditional form submission logic Try changing the values in the form below and see how the modified object updates in the Debug component.

```jsx
import { Debug } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const onSubmit = ({ modified }) => {
  window.alert(JSON.stringify(modified, null, 2));
};

export default function Example() {
  return (
    <Form
      onSubmit={onSubmit}
      autocomplete="off"
      initialValues={{
        name: 'Joe',
        age: 27
      }}>
      <Input name="name" label="Name:" />
      <Input name="age" type="number" label="Age:" />
      <Button type="submit">Submit</Button>
      <Debug values modified initialValues />
    </Form>
  );
}
```

```jsx
import { Debug } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const onSubmit = ({ modified }) => {
  window.alert(JSON.stringify(modified, null, 2));
};

export default function Example() {
  return (
    <Form
      onSubmit={onSubmit}
      autocomplete="off"
      initialValues={{
        name: 'Joe',
        age: 27
      }}>
      <Input name="name" label="Name:" />
      <Input name="age" type="number" label="Age:" />
      <Button type="submit">Submit</Button>
      <Debug values modified initialValues />
    </Form>
  );
}
```