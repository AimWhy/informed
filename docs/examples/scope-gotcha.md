# `Scope Gotcha`

Scope is a very useful tool for simplifying your code, but you can easily make mistakes when using it. One common gotcha is with the `useFieldState` hook. The key thing to remember is that the result of the `useField` hooks is affected just like `Input` fields. When you write: `<Input name="color" />` within a `<Scope scope="favorite" />` , the result in the values is `favorite.color` . Putting a component that uses `useFieldState` or `useFieldApi` is affected in the exact same way! **To opt out of this behavior:** Pass `false` as a second parameter to `useFieldState` or `useFieldApi` . **Instructions:** 1. Type into the color field and observe how the text updates 2. Notice how "favorite.color: (un-scoped)" and "color: (scoped)" both update 3. Notice how "favorite.color: (scoped)" does NOT update because it uses the full name of the field `useFieldState(name)` while inside of the scope.

```jsx
import { Scope, Debug, useFieldState } from 'informed';
import { Form, Input } from 'YourComponents';

const ScopedFieldState = ({ name }) => {
  const { value } = useFieldState(name);
  return (
    <pre>
      <code>{JSON.stringify(value, null, 2)}</code>
    </pre>
  );
};

const UnScopedFieldState = ({ name }) => {
  const { value } = useFieldState(name, false); // << Note the false here
  return (
    <pre>
      <code>{JSON.stringify(value, null, 2)}</code>
    </pre>
  );
};

export default function Example() {
  return (
    <div>
      <Form>
        <Scope scope="favorite">
          <Input field="color" />
          <h5>favorite.color: ( scoped )</h5>
          <ScopedFieldState name="favorite.color" />
          <h5>color: ( scoped )</h5>
          <ScopedFieldState name="color" />
          <h5>favorite.color: ( un-scoped )</h5>
          <UnScopedFieldState name="favorite.color" />
        </Scope>
        <h5>Form State</h5>
        <Debug values />
      </Form>
    </div>
  );
}
```

```jsx
import { Scope, Debug, useFieldState } from 'informed';
import { Form, Input } from 'YourComponents';

const ScopedFieldState = ({ name }) => {
  const { value } = useFieldState(name);
  return (
    <pre>
      <code>{JSON.stringify(value, null, 2)}</code>
    </pre>
  );
};

const UnScopedFieldState = ({ name }) => {
  const { value } = useFieldState(name, false); // << Note the false here
  return (
    <pre>
      <code>{JSON.stringify(value, null, 2)}</code>
    </pre>
  );
};

export default function Example() {
  return (
    <div>
      <Form>
        <Scope scope="favorite">
          <Input field="color" />
          <h5>favorite.color: ( scoped )</h5>
          <ScopedFieldState name="favorite.color" />
          <h5>color: ( scoped )</h5>
          <ScopedFieldState name="color" />
          <h5>favorite.color: ( un-scoped )</h5>
          <UnScopedFieldState name="favorite.color" />
        </Scope>
        <h5>Form State</h5>
        <Debug values />
      </Form>
    </div>
  );
}
```