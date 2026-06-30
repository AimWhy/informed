# Two Way Dependence

Sometimes fields values depend on each other.

Note: each field affects the other, therefore we need to detect if this is a native change ( user input ) so we never loop.

```jsx
import { Debug, useFieldState, useFieldApi } from 'informed';
import { useEffect } from 'react';
import { Form, Input } from 'YourComponents';

const Multiplyer = () => {
  const { setValue } = useFieldApi('rate');

  const updateRate = ({ value }) => {
    setValue(value * 2);
  };

  return (
    <Input
      name="multiplyer"
      label="Multiplyer"
      type="number"
      defaultValue={2}
      onNativeChange={updateRate}
    />
  );
};

const Rate = () => {
  const { setValue } = useFieldApi('multiplyer');

  const updateMultiplyer = ({ value }) => {
    setValue(value / 2);
  };

  return (
    <Input
      name="rate"
      label="Rate"
      type="number"
      defaultValue={4}
      onNativeChange={updateMultiplyer}
    />
  );
};

const Example = () => (
  <Form>
    <Multiplyer />
    <Rate />
    <button type="submit">Submit</button>
    <Debug values dirty pristine dirt />
  </Form>
);

export default Example;
```

```jsx
import { Debug, useFieldState, useFieldApi } from 'informed';
import { useEffect } from 'react';
import { Form, Input } from 'YourComponents';

const Multiplyer = () => {
  const { setValue } = useFieldApi('rate');

  const updateRate = ({ value }) => {
    setValue(value * 2);
  };

  return (
    <Input
      name="multiplyer"
      label="Multiplyer"
      type="number"
      defaultValue={2}
      onNativeChange={updateRate}
    />
  );
};

const Rate = () => {
  const { setValue } = useFieldApi('multiplyer');

  const updateMultiplyer = ({ value }) => {
    setValue(value / 2);
  };

  return (
    <Input
      name="rate"
      label="Rate"
      type="number"
      defaultValue={4}
      onNativeChange={updateMultiplyer}
    />
  );
};

const Example = () => (
  <Form>
    <Multiplyer />
    <Rate />
    <button type="submit">Submit</button>
    <Debug values dirty pristine dirt />
  </Form>
);

export default Example;
```