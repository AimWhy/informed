# `FormProvider`

Sometimes you don't want to render a form element, just fields! The `FormProvider` component allows you to create form functionality without wrapping your fields in a `<form>` element. `FormProvider` provides the same form context and functionality as the regular `Form` component, but without the HTML form element. This is useful when: • You want to create custom form layouts without form semantics • You need to integrate form fields into existing UI components • You want to avoid form submission behavior and handle it manually • You're building complex layouts where a form wrapper doesn't make sense You can still access the form API using `useFormApi()` to programmatically submit the form or perform other form operations.

```jsx
import { FormProvider, Debug, useFormApi } from 'informed';
import { Input, Button } from 'YourComponents';

const onSubmit = ({ values }) => {
  window.alert(JSON.stringify(values, null, 2));
};

const SubmitButton = () => {
  const formApi = useFormApi();

  return <Button onClick={formApi.submitForm}>Submit</Button>;
};

export default function Example() {
  return (
    <FormProvider onSubmit={onSubmit}>
      <Input field="name" label="First name:" />
      <SubmitButton />
      <Debug values />
    </FormProvider>
  );
}
```

```jsx
import { FormProvider, Debug, useFormApi } from 'informed';
import { Input, Button } from 'YourComponents';

const onSubmit = ({ values }) => {
  window.alert(JSON.stringify(values, null, 2));
};

const SubmitButton = () => {
  const formApi = useFormApi();

  return <Button onClick={formApi.submitForm}>Submit</Button>;
};

export default function Example() {
  return (
    <FormProvider onSubmit={onSubmit}>
      <Input field="name" label="First name:" />
      <SubmitButton />
      <Debug values />
    </FormProvider>
  );
}
```