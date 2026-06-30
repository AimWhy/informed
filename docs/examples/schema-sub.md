# `Sub Schema`

Sometimes you want to render separate schemas within the same form. This is useful when you have different sections of a form that should be managed independently but still be part of the same form submission. You can use multiple `FormFields` components with different schemas to achieve this. Each `FormFields` component will render its own set of fields based on its schema.

```jsx
import { FormFields, Debug } from 'informed';
import { Form, Button } from 'YourComponents';

const schema1 = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      'ui:control': 'input'
    },
    age: {
      type: 'number',
      title: 'Age',
      'ui:control': 'input',
      'ui:props': {
        type: 'number'
      }
    }
  }
};

const schema2 = {
  type: 'object',
  properties: {
    brother: {
      type: 'string',
      title: 'Brother name',
      'ui:control': 'input'
    },
    age: {
      type: 'number',
      title: 'Brother age',
      'ui:control': 'input',
      'ui:props': {
        type: 'number'
      }
    }
  }
};

export default function Example() {
  return (
    <Form>
      <h5>Your Info:</h5>
      <FormFields schema={schema1} />
      <br />
      <h5>Brother's Info:</h5>
      <FormFields schema={schema2} />
      <br />
      <Button type="submit">Submit</Button>
      <Debug />
    </Form>
  );
}
```

```jsx
import { FormFields, Debug } from 'informed';
import { Form, Button } from 'YourComponents';

const schema1 = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      'ui:control': 'input'
    },
    age: {
      type: 'number',
      title: 'Age',
      'ui:control': 'input',
      'ui:props': {
        type: 'number'
      }
    }
  }
};

const schema2 = {
  type: 'object',
  properties: {
    brother: {
      type: 'string',
      title: 'Brother name',
      'ui:control': 'input'
    },
    age: {
      type: 'number',
      title: 'Brother age',
      'ui:control': 'input',
      'ui:props': {
        type: 'number'
      }
    }
  }
};

export default function Example() {
  return (
    <Form>
      <h5>Your Info:</h5>
      <FormFields schema={schema1} />
      <br />
      <h5>Brother's Info:</h5>
      <FormFields schema={schema2} />
      <br />
      <Button type="submit">Submit</Button>
      <Debug />
    </Form>
  );
}
```