# `Form Api`

You can gain access to the forms api via `useFormApi` or `formApiRef` Below we create some buttons to randomly set the color of our car using `formApi.setValue`

```jsx
import { Debug, useFieldState, useFormApi } from 'informed';
import { useRef } from 'react';
import { Form, Select, Option, Button, Car } from 'YourComponents';

// Helper function
const random = formApi => {
  const colors = ['red', 'green', 'blue', 'pink'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  formApi.setValue('color', colors[randomIndex]);
};

const ColoredCar = () => {
  const { value } = useFieldState('color');

  // We get formApi from context via hook
  const formApi = useFormApi();

  return (
    <div className={`car-color-${value}`}>
      <Car />
      <Button type="button" onClick={() => random(formApi)} width={'100%'}>
        Random Color via useFormApi
      </Button>
    </div>
  );
};

const Example = () => {
  const formApiRef = useRef();
  return (
    <Form formApiRef={formApiRef}>
      <Select name="color" label="Color" initialValue="green">
        <Option key="red">Red</Option>
        <Option key="green">Green</Option>
        <Option key="blue">Blue</Option>
        <Option key="pink">Pink</Option>
      </Select>
      <Button type="submit">Submit</Button>
      <Debug values />
      <ColoredCar />
      <Button type="button" onClick={() => random(formApiRef.current)}>
        Random Color via formApiRef
      </Button>
    </Form>
  );
};

export default Example;
```

---

## Api

```jsx
submitForm()
```

- It will set all the fields to touched.
- It will call all validators.
- It will call onSubmit if the form is valid.

```jsx
setValue('greeting', 'Hello')
```

```jsx
getValue('greeting')
```

```jsx
setTouched('greeting', true)
```

```jsx
getTouched('greeting')
```

```jsx
setError('greeting', 'Error message')
```

```jsx
getError('greeting')
```

```jsx
getFormState()
```

```jsx
reset()
```

```jsx
setFormError('There was an error!')
```

```jsx
validate()
```

```jsx
setValues(values)
```

```jsx
setTheseValues(values)
```

```jsx
fieldExists('fieldName')
```

```jsx
resetPath("brothers.friend")
```

```jsx
disable()
```

```jsx
enable()
```

---

## `More Examples`

Here is some more examples of the api in action!

```jsx
import { Debug, useFieldState, useFormApi } from 'informed';
import { useRef } from 'react';
import { Form, Input, Button, ButtonGroup } from 'YourComponents';

// Helper function
const random = formApi => {
  const colors = ['red', 'green', 'blue', 'pink'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  formApi.setValue('color', colors[randomIndex]);
};

const Buttons = () => {
  // We get formApi from context via hook
  const formApi = useFormApi();

  return (
    <ButtonGroup orientation="vertical" align="center">
      <Button type="button" onClick={() => formApi.setValue('name', 'Bill')}>
        Set Name
      </Button>
      <Button
        type="button"
        onClick={() => formApi.setValueQuietly('name', 'Kevin')}>
        Set Name Quietly
      </Button>
      <Button type="button" onClick={() => formApi.reset()}>
        Reset
      </Button>
      <Button
        type="button"
        onClick={() =>
          formApi.reset({
            values: { name: 'Elon', age: 51, phone: '6991234567' }
          })
        }>
        Reset To New Values
      </Button>
      <Button
        type="button"
        onClick={() =>
          formApi.reset({
            resetValues: false
          })
        }>
        Reset But not Values
      </Button>
      <Button type="button" onClick={() => formApi.setValue('foo', 'Bar')}>
        Set Hidden Field
      </Button>
      <Button type="button" onClick={() => formApi.disable()}>
        Disable
      </Button>
      <Button type="button" onClick={() => formApi.enable()}>
        Enable
      </Button>
      <Button
        type="button"
        onClick={() =>
          formApi.setTheseValues({ age: 30, phone: '6991234567' })
        }>
        Set These Values
      </Button>
      <Button
        type="button"
        onClick={() => formApi.setValues({ age: 26, phone: '1234567899' })}>
        Set Values
      </Button>
      <Button
        type="button"
        onClick={() => formApi.clearValue('name')}>
        Clear field value ('First Name')
      </Button>
      <Button
        type="button"
        onClick={() => formApi.clearAllValues()}>
        Clear all field values
      </Button>
      <Button
        type="button"
        onClick={() => formApi.clearError('age')}>
        Clear field error ('Age')
      </Button>
      <Button
        type="button"
        onClick={() => formApi.clearAllErrors()}>
        Clear all field errors
      </Button>
    </ButtonGroup>
  );
};

const Example = () => {
  const formApiRef = useRef();
  return (
    <Form formApiRef={formApiRef}>
      <Input name="name" label="First Name:" defaultValue="Joe" required />
      <Input name="age" label="Age:" type="number" defaultValue={28} required />
      <Input name="phone" label="Phone Number:" formatter="+1 (###) ###-####" required />
      <Buttons />
      <Button type="submit">Submit</Button>
      <Debug values dirt disabled />
    </Form>
  );
};

export default Example;
```

```jsx
import { Debug, useFieldState, useFormApi } from 'informed';
import { useRef } from 'react';
import { Form, Select, Option, Button, Car } from 'YourComponents';

// Helper function
const random = formApi => {
  const colors = ['red', 'green', 'blue', 'pink'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  formApi.setValue('color', colors[randomIndex]);
};

const ColoredCar = () => {
  const { value } = useFieldState('color');

  // We get formApi from context via hook
  const formApi = useFormApi();

  return (
    <div className={`car-color-${value}`}>
      <Car />
      <Button type="button" onClick={() => random(formApi)} width={'100%'}>
        Random Color via useFormApi
      </Button>
    </div>
  );
};

const Example = () => {
  const formApiRef = useRef();
  return (
    <Form formApiRef={formApiRef}>
      <Select name="color" label="Color" initialValue="green">
        <Option key="red">Red</Option>
        <Option key="green">Green</Option>
        <Option key="blue">Blue</Option>
        <Option key="pink">Pink</Option>
      </Select>
      <Button type="submit">Submit</Button>
      <Debug values />
      <ColoredCar />
      <Button type="button" onClick={() => random(formApiRef.current)}>
        Random Color via formApiRef
      </Button>
    </Form>
  );
};

export default Example;
```

```jsx
import { Debug, useFieldState, useFormApi } from 'informed';
import { useRef } from 'react';
import { Form, Input, Button, ButtonGroup } from 'YourComponents';

// Helper function
const random = formApi => {
  const colors = ['red', 'green', 'blue', 'pink'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  formApi.setValue('color', colors[randomIndex]);
};

const Buttons = () => {
  // We get formApi from context via hook
  const formApi = useFormApi();

  return (
    <ButtonGroup orientation="vertical" align="center">
      <Button type="button" onClick={() => formApi.setValue('name', 'Bill')}>
        Set Name
      </Button>
      <Button
        type="button"
        onClick={() => formApi.setValueQuietly('name', 'Kevin')}>
        Set Name Quietly
      </Button>
      <Button type="button" onClick={() => formApi.reset()}>
        Reset
      </Button>
      <Button
        type="button"
        onClick={() =>
          formApi.reset({
            values: { name: 'Elon', age: 51, phone: '6991234567' }
          })
        }>
        Reset To New Values
      </Button>
      <Button
        type="button"
        onClick={() =>
          formApi.reset({
            resetValues: false
          })
        }>
        Reset But not Values
      </Button>
      <Button type="button" onClick={() => formApi.setValue('foo', 'Bar')}>
        Set Hidden Field
      </Button>
      <Button type="button" onClick={() => formApi.disable()}>
        Disable
      </Button>
      <Button type="button" onClick={() => formApi.enable()}>
        Enable
      </Button>
      <Button
        type="button"
        onClick={() =>
          formApi.setTheseValues({ age: 30, phone: '6991234567' })
        }>
        Set These Values
      </Button>
      <Button
        type="button"
        onClick={() => formApi.setValues({ age: 26, phone: '1234567899' })}>
        Set Values
      </Button>
      <Button
        type="button"
        onClick={() => formApi.clearValue('name')}>
        Clear field value ('First Name')
      </Button>
      <Button
        type="button"
        onClick={() => formApi.clearAllValues()}>
        Clear all field values
      </Button>
      <Button
        type="button"
        onClick={() => formApi.clearError('age')}>
        Clear field error ('Age')
      </Button>
      <Button
        type="button"
        onClick={() => formApi.clearAllErrors()}>
        Clear all field errors
      </Button>
    </ButtonGroup>
  );
};

const Example = () => {
  const formApiRef = useRef();
  return (
    <Form formApiRef={formApiRef}>
      <Input name="name" label="First Name:" defaultValue="Joe" required />
      <Input name="age" label="Age:" type="number" defaultValue={28} required />
      <Input name="phone" label="Phone Number:" formatter="+1 (###) ###-####" required />
      <Buttons />
      <Button type="submit">Submit</Button>
      <Debug values dirt disabled />
    </Form>
  );
};

export default Example;
```