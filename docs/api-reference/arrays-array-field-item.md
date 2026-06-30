# `ArrayField.Item`

Informed gives you access to two components for array fields: There are many cool features these give you:

# `ArrayFieldApi`

```jsx
add()
```

```jsx
remove(1)
```

```jsx
reset()
```

```jsx
swap(1,2)
```

# `ArrayFieldItemApi`

```jsx
remove()
```

```jsx
reset()
```

```jsx
setValue('name', 'Joe')
```

```jsx
resetField('name')
```

# `ArrayFieldItemInfo`

```jsx
"friends[0]"
```

```jsx
0
```

# `ArrayFieldItemState`

### Example:

```jsx
"friends[0]"
```

```jsx
0
```

```jsx
"d9f97dee..."
```

```jsx
"friends"
```

```jsx
true
```

## Example:

For each feature a visualization will be shown based on this example array: An example state for this array looks like

```jsx
arrayFieldItemApi.resetField('b')
```

```jsx
arrayFieldItemApi.setValue('a', 'Yo')
```

```jsx
arrayFieldItemApi.remove()
```

```jsx
arrayFieldItemApi.reset()
```

```jsx
arrayFieldApi.add()
```

```jsx
arrayFieldApi.reset()
```

```jsx
import { Debug, ArrayField } from 'informed';
import { Form, Button, Input } from 'YourComponents';

const initialValue = [
  {
    name: 'Matt',
    age: '28'
  },
  {
    name: 'Hope',
    age: '23'
  }
];

const Example = () => (
  <Form>
    <ArrayField name="friends" initialValue={initialValue}>
      {({ add, addWithInitialValue, reset }) => {
        return (
          <>
            <Button
              onClick={add}
              type="button"
              variant="accent"
              style="outline">
              Add
            </Button>
            <Button onClick={reset} type="button">
              Reset
            </Button>
            <Button
              onClick={() => {
                addWithInitialValue({ name: 'test' });
              }}>
              Add with initialValue
            </Button>
            <ArrayField.Items>
              {({ remove, name, reset, resetField, setValue }) => (
                <>
                  <h4>{name}</h4>
                  <Input name="name" label="Name" required />
                  <Input name="age" label="Age" type="number" />
                  <Button type="button" onClick={reset}>
                    Reset
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setValue('name', 'Elon')}>
                    Set Name to "Elon"
                  </Button>
                  <Button type="button" onClick={() => resetField('name')}>
                    Reset Name
                  </Button>
                  <Button type="button" onClick={remove} variant="negative">
                    Remove
                  </Button>
                </>
              )}
            </ArrayField.Items>
          </>
        );
      }}
    </ArrayField>
    <Button type="submit">submit</Button>
    <Debug values />
  </Form>
);

export default Example;
```

```jsx
import { Debug, ArrayField } from 'informed';
import { Form, Button, Input } from 'YourComponents';

const initialValue = [
  {
    name: 'Matt',
    age: '28'
  },
  {
    name: 'Hope',
    age: '23'
  }
];

const Example = () => (
  <Form>
    <ArrayField name="friends" initialValue={initialValue}>
      {({ add, addWithInitialValue, reset }) => {
        return (
          <>
            <Button
              onClick={add}
              type="button"
              variant="accent"
              style="outline">
              Add
            </Button>
            <Button onClick={reset} type="button">
              Reset
            </Button>
            <Button
              onClick={() => {
                addWithInitialValue({ name: 'test' });
              }}>
              Add with initialValue
            </Button>
            <ArrayField.Items>
              {({ remove, name, reset, resetField, setValue }) => (
                <>
                  <h4>{name}</h4>
                  <Input name="name" label="Name" required />
                  <Input name="age" label="Age" type="number" />
                  <Button type="button" onClick={reset}>
                    Reset
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setValue('name', 'Elon')}>
                    Set Name to "Elon"
                  </Button>
                  <Button type="button" onClick={() => resetField('name')}>
                    Reset Name
                  </Button>
                  <Button type="button" onClick={remove} variant="negative">
                    Remove
                  </Button>
                </>
              )}
            </ArrayField.Items>
          </>
        );
      }}
    </ArrayField>
    <Button type="submit">submit</Button>
    <Debug values />
  </Form>
);

export default Example;
```