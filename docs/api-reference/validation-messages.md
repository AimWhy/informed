```jsx
import { Debug } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const Example = () => (
  <Form
    errorMessage={{
      required: 'This is field is required for your profile!',
      pattern: 'Field MUST match the pattern'
    }}>
    <Input
      name="firstName"
      label="First name:"
      required
      pattern="^[A-Z]{1}[a-z]+$"
      minLength={6}
      errorMessage="There is a problem with this field!"
      validateOn="change"
      showErrorIfError
    />
    <Input
      name="lastName"
      label="Last name:"
      required
      pattern="^[A-Z]{1}[a-z]+$"
      minLength={6}
      errorMessage={{
        required: 'Last name is required!',
        minLength: 'Last name must be longer'
      }}
      validateOn="change"
      showErrorIfError
    />
    <Input
      name="favoriteColor"
      label="Favorite color:"
      required
      validateOn="change"
      showErrorIfError
    />
    <Button type="submit">Submit</Button>
    <Debug values errors invalid valid />
  </Form>
);

export default Example;
```

```jsx
import { SchemaFields, Debug } from 'informed';
import { Form, Button } from 'YourComponents';

const schema = {
  type: 'object',
  required: ['name', 'brother'],
  errorMessage: {
    _: 'name default error message',
    minLength: 'name must be longer',
    maxLength: 'name must be shorter',
    pattern: 'name match the pattern',
    maximum: 'must be smaller than that!'
  },
  properties: {
    name: {
      type: 'string',
      title: 'First name',
      'ui:control': 'input',
      minLength: 6,
      maxLength: 6,
      pattern: '^[0-9]{4}[a-zA-Z]{2}$',
      required: 'name is required!!'
    },
    brother: {
      type: 'object',
      required: ['name', 'age', 'height', 'sameError'],
      errorMessage: {
        _: 'brothers field default error message',
        required: 'brothers field is required',
        minLength: 'brothers field must be longer',
        maxLength: 'brothers field must be shorter',
        pattern: 'brother field match the pattern'
      },
      properties: {
        name: {
          type: 'string',
          title: 'Brother name',
          'ui:control': 'input'
        },
        lastName: {
          type: 'number',
          title: 'Brother Last Name',
          'ui:control': 'input',
          minLength: 6,
          maxLength: 6,
          pattern: '^[A-Z]{1}[a-z]+$',
          errorMessage: {
            _: 'brothers last name default error message',
            required: 'brothers last name is required',
            minLength: 'brothers last name must be longer',
            maxLength: 'brothers last name must be shorter',
            pattern: 'brother last name match the pattern'
          }
        },
        height: {
          type: 'number',
          title: 'Brother Height',
          'ui:control': 'number',
          minimum: 2,
          maximum: 8
        },
        sameError: {
          type: 'string',
          title: 'Same Error',
          'ui:control': 'input',
          minLength: 6,
          maxLength: 6,
          pattern: '^[0-9]{4}[a-zA-Z]{2}$',
          errorMessage: 'Ahhh!!!!!!'
        }
      }
    }
  }
};

const Example = () => (
  <Form schema={schema}>
    <SchemaFields />
    <Button type="submit">Submit</Button>
    <Debug errors values />
  </Form>
);

export default Example;
```