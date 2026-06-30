# `Path Syntax`

Every input in informed needs an associated field name. In its simplest form, field names are just strings. However, sometimes you may have some complex forms that require special ways of organizing your fields, this is where the special syntax comes in. Fields can be simple strings, strings that contain `"."` , and strings that contain `"[ ]"` , much like how you access and write to objects and arrays in javascript. Below are some examples of field names and what they resolve to in the forms values object. This syntax is commonly referred to as Java Script Property Access Notation or JSPAN.

```jsx
"username"
```

```jsx
values.username
```

```jsx
"mothers.mother"
```

```jsx
values.mothers.mother
```

```jsx
"friends[0]"
```

```jsx
values.friends[0]
```

```jsx
"siblings.1"
```

```jsx
values.siblings[1]
```

```jsx
"parents[0].name"
```

```jsx
values.parents[0].name
```

```jsx
"foo.bar[0].baz[1]"
```

```jsx
values.foo.bar[0].baz[1]
```

```jsx
import { Debug } from 'informed';
import { Form, Button, Input } from 'YourComponents';

const Example = () => (
  <Form>
    <Input name="username" label="Username:" initialValue="Joe" />
    <Input name="mothers.mother" label="Mothers Mother:" initialValue="Jill" />
    <Input name="friends[0]" label="Friend[0]:" initialValue="Jake" />
    <Input name="siblings.1" label="Siblings.1:" initialValue="Jeff" />
    <Input name="parents[0].name" label="parents[0].name" initialValue="John" />
    <Input
      name="foo.bar[0].baz[1]"
      label="foo.bar[0].baz[1]"
      initialValue="Taz"
    />
    <Button type="submit">submit</Button>
    <Debug values />
  </Form>
);

export default Example;
```

```jsx
import { Debug } from 'informed';
import { Form, Button, Input } from 'YourComponents';

const Example = () => (
  <Form>
    <Input name="username" label="Username:" initialValue="Joe" />
    <Input name="mothers.mother" label="Mothers Mother:" initialValue="Jill" />
    <Input name="friends[0]" label="Friend[0]:" initialValue="Jake" />
    <Input name="siblings.1" label="Siblings.1:" initialValue="Jeff" />
    <Input name="parents[0].name" label="parents[0].name" initialValue="John" />
    <Input
      name="foo.bar[0].baz[1]"
      label="foo.bar[0].baz[1]"
      initialValue="Taz"
    />
    <Button type="submit">submit</Button>
    <Debug values />
  </Form>
);

export default Example;
```