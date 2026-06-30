# `Schema Components`

You can add custom components to schema based forms, using special property names in the form of ui:[$id]. **Basic usage:** When wanting to render fields as children of your component, you should add these inside an allOf[] in the parent of the properties object. The entry in allOf[] should have an $id property to be able to reference those fields. **With children fields:**

```jsx
import { SchemaFields, Debug } from 'informed';
import { Form, Button } from 'YourComponents';

const schema = {
  properties: {
    'ui:fullName_wrapper': {},
    favorite: {
      'ui:control': 'PurpleBorder',
      type: 'object',
      properties: {
        color: {
          type: 'string',
          title: 'Favorite color',
          'ui:control': 'input'
        },
        food: {
          type: 'string',
          title: 'Favorite Food',
          'ui:control': 'input'
        }
      }
    }
  },
  allOf: [
    {
      $id: 'fullName_wrapper',
      'ui:control': 'PurpleBorder',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          title: 'First name',
          'ui:control': 'input'
        },
        lastName: {
          type: 'string',
          title: 'Last name',
          'ui:control': 'input'
        }
      }
    }
  ]
};

const PurpleBorder = ({ children }) => {
  return (
    <div
      style={{
        border: '3px solid purple',
        marginBottom: '1rem',
        padding: '1rem'
      }}>
      {children}
    </div>
  );
};

const Schema = () => (
  <Form schema={schema} components={{ PurpleBorder }}>
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

const schema = {
  properties: {
    'ui:fullName_wrapper': {},
    favorite: {
      'ui:control': 'PurpleBorder',
      type: 'object',
      properties: {
        color: {
          type: 'string',
          title: 'Favorite color',
          'ui:control': 'input'
        },
        food: {
          type: 'string',
          title: 'Favorite Food',
          'ui:control': 'input'
        }
      }
    }
  },
  allOf: [
    {
      $id: 'fullName_wrapper',
      'ui:control': 'PurpleBorder',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          title: 'First name',
          'ui:control': 'input'
        },
        lastName: {
          type: 'string',
          title: 'Last name',
          'ui:control': 'input'
        }
      }
    }
  ]
};

const PurpleBorder = ({ children }) => {
  return (
    <div
      style={{
        border: '3px solid purple',
        marginBottom: '1rem',
        padding: '1rem'
      }}>
      {children}
    </div>
  );
};

const Schema = () => (
  <Form schema={schema} components={{ PurpleBorder }}>
    <SchemaFields />
    <Button type="submit">Submit</Button>
    <Debug />
  </Form>
);
export default Schema;
```