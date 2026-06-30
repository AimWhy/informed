# Intro

First lets take a look at whats possible with informed. Below is an example where we wrapped informed around Adobe's [desgin-system](https://react-spectrum.adobe.com/react-spectrum/index.html) .

Those components got defined once inside `YourComponents` directory. You will see how this was done later inside the [setup](/getting-started/setup) docs.

```jsx
// Example.jsx

import { Relevant, Debug } from 'informed';

// Inputs that were hooked up to informed via "useField"
import { Form, Input, Select, Checkbox, Option, Button } from 'YourComponents';

const onSubmit = ({ values }) => window.alert(`Hello ${values.name}`);

const Example = () => (
  <Form onSubmit={onSubmit} initialValues={{ phone: '1234567899' }}>
    <Input name="name" label="Name" placeholder="Elon" required />
    <Input name="age" type="number" label="Age" required="Age Required" />
    <Input name="phone" label="Phone" formatter="+1 (###)-###-####" />
    <Select name="car" label="Car" initialValue="ms">
      <Option key="ms">Model S</Option>
      <Option key="m3">Model 3</Option>
      <Option key="mx">Model X</Option>
      <Option key="my">Model Y</Option>
    </Select>
    <Checkbox name="married" label="Married?" />
    <Relevant when={({ formState }) => formState.values.married}>
      <Input name="spouse" label="Spouse" />
    </Relevant>
    <Button type="submit">Submit</Button>
    <Debug valid pristine dirty values errors />
  </Form>
);

export default Example;
```

Whats going on here? Basically informed manages form state for you, and allows you to easily hook ito its state managemenet with the use of `useField` Above, we imported inputs that were already wrapped and simply rendered them on the page. **This is the way!** You should most of the time not even realize you are using a form library 😁

---

# Capabilities

Informed is cabable of A LOT of cool things! The below example shows off many of those cababilites in one form. - Arrays: ability to render dynamic arrays of fields `[ 'a', 'b' ]` or `[ { name: 'Joe', age: 29 }, { name: 'Hope', age: 24 }]` - Relevance: ability to render fields conditionally depending on the state of other parts of the form - JSPAN: ability to easily and intuitively manipulate form state - Formatting: ability to perform display formatting, where the format shown to user can differ from the state of the values stored - Validation: ability to perform both synchronous and asynchronous validation in a controlled manner - Api: ability to manipulate the form state both inside and outside the context of the form - State: ability to access field and form data - Multistep: ability to create dynamic multistep forms - Scope: ability to scope ( group ) fields - Schema: ability to render forms based on pure JSON schema - Dynaic: ability to hide and show fields ( render and unrender ) and either cleanup or maintain state of unmounted fields - Debugging: ability to easily debug users state as well as internals of the library - Nesting: ability to have highly nested value structure `state.values.friends[1].brother.parents.cars[0].model`

---

# How do I start!?

In order to use informed all you need to do is wrap your own inputs with informed via a `useField` hook.

You do this one time and then can use your form inputs as normal JSX or via schema! Lets go get [SETUP](/getting-started/setup)

```jsx
// Example.jsx

import { Relevant, Debug } from 'informed';

// Inputs that were hooked up to informed via "useField"
import { Form, Input, Select, Checkbox, Option, Button } from 'YourComponents';

const onSubmit = ({ values }) => window.alert(`Hello ${values.name}`);

const Example = () => (
  <Form onSubmit={onSubmit} initialValues={{ phone: '1234567899' }}>
    <Input name="name" label="Name" placeholder="Elon" required />
    <Input name="age" type="number" label="Age" required="Age Required" />
    <Input name="phone" label="Phone" formatter="+1 (###)-###-####" />
    <Select name="car" label="Car" initialValue="ms">
      <Option key="ms">Model S</Option>
      <Option key="m3">Model 3</Option>
      <Option key="mx">Model X</Option>
      <Option key="my">Model Y</Option>
    </Select>
    <Checkbox name="married" label="Married?" />
    <Relevant when={({ formState }) => formState.values.married}>
      <Input name="spouse" label="Spouse" />
    </Relevant>
    <Button type="submit">Submit</Button>
    <Debug valid pristine dirty values errors />
  </Form>
);

export default Example;
```