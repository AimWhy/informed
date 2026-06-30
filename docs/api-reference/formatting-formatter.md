# `Formmater`

You can provide a pattern for formatting dates, credit cards, etc. To do this you can either provide a "Formatter String" or a "Formatter Array", where regular expression are used as a placeholder for the user input. As simple credit card pattern could be: const mask = '####-####-####-####'; OR const formatter = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ '-', /\d/, /\d/, /\d/, /\d/];

## Formatter Strings Syntax

```jsx
import { Debug } from 'informed';
import { Form, Button, Input } from 'YourComponents';

const formatter = '+1 ###-###-####';

const parser = value => {
  return value.replace('+1 ', '').replace(/-/g, '');
};

const Example = () => (
  <Form>
    <Input
      name="phone"
      label="Phone Number:"
      formatter={formatter}
      parser={parser}
      initialValue="1231231234"
    />
    <Input
      name="maskedField"
      label="Word Formatting"
      formatter="$***-**(**)***"
      initialValue="HelloWorld"
    />
    <Button type="submit">submit</Button>
    <Debug values maskedValues />
  </Form>
);

export default Example;
```

```jsx
import { Debug } from 'informed';
import { Form, Button, Input } from 'YourComponents';

const formatter = '+1 ###-###-####';

const parser = value => {
  return value.replace('+1 ', '').replace(/-/g, '');
};

const Example = () => (
  <Form>
    <Input
      name="phone"
      label="Phone Number:"
      formatter={formatter}
      parser={parser}
      initialValue="1231231234"
    />
    <Input
      name="maskedField"
      label="Word Formatting"
      formatter="$***-**(**)***"
      initialValue="HelloWorld"
    />
    <Button type="submit">submit</Button>
    <Debug values maskedValues />
  </Form>
);

export default Example;
```