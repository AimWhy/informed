# `Evaluate When`

Use `ui:props.evaluate` with `evaluateWhen` so props are recomputed when listed fields change. Here the car field is disabled and cleared when age is missing or under 16. **Try it:** enter an age of 16 or more to enable the car select, pick a model, then reduce age below 16—the car value clears and the control disables again.

```jsx
import { SchemaFields, Debug } from 'informed';
import { Form, Button } from 'YourComponents';

const evaluate = ({ formState, formApi }) => {
  if (!formState.values.age || formState.values.age < 16) {
    formApi.clearValue('car');
    return { disabled: true };
  }
  return { disabled: false };
};

const schema = {
  type: 'object',
  properties: {
    age: {
      type: 'number',
      title: 'Age',
      'ui:control': 'input',
      'ui:props': {
        type: 'number'
      }
    },
    car: {
      type: 'string',
      title: 'Car',
      'ui:control': 'select',
      oneOf: [
        { const: 'ms', title: 'Model S' },
        { const: 'm3', title: 'Model 3' },
        { const: 'mx', title: 'Model X' },
        { const: 'my', title: 'Model Y' }
      ],
      default: null,
      'ui:props': {
        evaluate,
        evaluateWhen: ['age']
      }
    }
  }
};

const Schema = () => (
  <Form schema={schema}>
    <SchemaFields />
    <Button type="submit">Submit</Button>
    <Debug />
  </Form>
);

export default Schema;
```

```jsx
import { SchemaFields, Debug } from 'informed';
import { Form, Button } from 'YourComponents';

const evaluate = ({ formState, formApi }) => {
  if (!formState.values.age || formState.values.age < 16) {
    formApi.clearValue('car');
    return { disabled: true };
  }
  return { disabled: false };
};

const schema = {
  type: 'object',
  properties: {
    age: {
      type: 'number',
      title: 'Age',
      'ui:control': 'input',
      'ui:props': {
        type: 'number'
      }
    },
    car: {
      type: 'string',
      title: 'Car',
      'ui:control': 'select',
      oneOf: [
        { const: 'ms', title: 'Model S' },
        { const: 'm3', title: 'Model 3' },
        { const: 'mx', title: 'Model X' },
        { const: 'my', title: 'Model Y' }
      ],
      default: null,
      'ui:props': {
        evaluate,
        evaluateWhen: ['age']
      }
    }
  }
};

const Schema = () => (
  <Form schema={schema}>
    <SchemaFields />
    <Button type="submit">Submit</Button>
    <Debug />
  </Form>
);

export default Schema;
```