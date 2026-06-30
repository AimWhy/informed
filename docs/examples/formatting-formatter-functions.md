# `Formatter Functions`

You can achieve highly custom formatting by passing a function to each location in the formatter array. This allows you to apply custom logic to each character position in the input field. Instead of using regex patterns or string patterns, you can use functions that receive the current value and return the formatted character for that position. This is particularly useful for complex formatting requirements like custom case transformations, conditional formatting, or dynamic character placement.

```jsx
import { Debug } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const mask = value => value.toUpperCase();

const formatter = [mask, mask, '-', mask, mask, '-', mask, mask, mask, mask];

export default function Example() {
  return (
    <Form>
      <div>
        <Input
          field="uppercase"
          label="Uppercase"
          formatter={formatter}
          initialValue="abcdefg"
        />
        <Button type="submit">Submit</Button>
        <Debug values maskedValues />
      </div>
    </Form>
  );
}
```

```jsx
import { Debug } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const mask = value => value.toUpperCase();

const formatter = [mask, mask, '-', mask, mask, '-', mask, mask, mask, mask];

export default function Example() {
  return (
    <Form>
      <div>
        <Input
          field="uppercase"
          label="Uppercase"
          formatter={formatter}
          initialValue="abcdefg"
        />
        <Button type="submit">Submit</Button>
        <Debug values maskedValues />
      </div>
    </Form>
  );
}
```