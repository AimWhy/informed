# `useField`

useField allows you to create your very own inputs.

You do this once and then never have to do it agian.

```jsx
import { useField } from 'informed';
import { Form, Debug } from 'informed';

/* ---------- Define Input Here Once! ----------- */
const Input = props => {
  const { render, informed } = useField({
    type: 'text',
    ...props
  });
  return render(<input {...informed} />);
};

/* -------- Now use Input all you want! --------- */
const Example = () => {
  return (
    <Form>
      <Input name="name" required />
      <Debug valid pristine dirty values errors touched />
    </Form>
  );
};

export default Example;
```

Above is the most simplicitc informed input. You simply: - Call useField hook - Spread informed onto the native input. - Return the result of render And walla! You have an informed input.

---

## Do It yourself

That was pretty simple but whats happening under the hood? To understand this lets re-write the previous example in a more verbose way!

```jsx
import { useField } from 'informed';
import { Form, Debug } from 'informed';

/* ---------- Define Input Here Once! ----------- */
const Input = props => {
  // Calling useField makes this an informed input!
  const { fieldState, fieldApi, render, ref, userProps } = useField(props);

  // The field state ( contains value, error, dirty.. etc)
  const { value } = fieldState;

  // The field api ( allows you to control the field )
  const { setValue, setTouched } = fieldApi;

  // Everything else ( your personal props and native properties )
  const { id, ...rest } = userProps;

  // Now you simply call render and "hook" up your inputs state and handlers
  return render(
    <input
      {...rest}
      id={id}
      ref={ref}
      value={!value && value !== 0 ? '' : value}
      onChange={e => {
        setValue(e.target.value, e);
      }}
      onBlur={e => {
        setTouched(true, e);
      }}
    />
  );
};

/* -------- Now use Input all you want! --------- */
const Example = () => {
  return (
    <Form>
      <Input name="name" required />
      <Debug valid pristine dirty values errors touched />
    </Form>
  );
};

export default Example;
```

---

## What Does It Give Me?

Ok now that you are a bit more familiar with the hook lets take a look at the full API. And a more complete example.

```jsx
import { useField } from 'informed';
import { Form, Debug } from 'informed';

const Input = props => {
  const { fieldState, fieldApi, render, ref, userProps } = useField(props);

  /* ---------- Get acces to field state ----------- */
  const { value, error, showError } = fieldState;

  /* ---------- Get acces to field control ----------- */
  const { setValue, setTouched } = fieldApi;

  /* --------------- Everything else ----------------- */
  const { label, id, ...rest } = userProps;

  /* ----------------- Call Render ------------------- */
  return render(
    <>
      {/* ------------------ Label ------------------- */}
      {label ? <label htmlFor={id}>{label}</label> : null}
      {/* -------------- Native Input ---------------- */}
      <input
        {...rest}
        id={id}
        ref={ref}
        value={!value && value !== 0 ? '' : value}
        onChange={e => {
          setValue(e.target.value, e);
        }}
        onBlur={e => {
          setTouched(true, e);
        }}
        style={showError ? { border: 'solid 1px red' } : null}
      />
      {/* --------- Show error When showError -------- */}
      {showError ? <small style={{ color: 'red' }}>{error}</small> : null}
    </>
  );
};

const Example = () => {
  return (
    <Form>
      <Input name="name" required />
      <Debug />
    </Form>
  );
};

export default Example;
```

---

## Parameters:

Here are all the parameters that this hook can take. Note: these parameters will mainly be seen the following format, as this hook is called inside your component definitions.

---

## Return Values:

Here are all the values this hook returns.

```jsx
import { useField } from 'informed';
import { Form, Debug } from 'informed';

/* ---------- Define Input Here Once! ----------- */
const Input = props => {
  const { render, informed } = useField({
    type: 'text',
    ...props
  });
  return render(<input {...informed} />);
};

/* -------- Now use Input all you want! --------- */
const Example = () => {
  return (
    <Form>
      <Input name="name" required />
      <Debug valid pristine dirty values errors touched />
    </Form>
  );
};

export default Example;
```

```jsx
import { useField } from 'informed';
import { Form, Debug } from 'informed';

/* ---------- Define Input Here Once! ----------- */
const Input = props => {
  // Calling useField makes this an informed input!
  const { fieldState, fieldApi, render, ref, userProps } = useField(props);

  // The field state ( contains value, error, dirty.. etc)
  const { value } = fieldState;

  // The field api ( allows you to control the field )
  const { setValue, setTouched } = fieldApi;

  // Everything else ( your personal props and native properties )
  const { id, ...rest } = userProps;

  // Now you simply call render and "hook" up your inputs state and handlers
  return render(
    <input
      {...rest}
      id={id}
      ref={ref}
      value={!value && value !== 0 ? '' : value}
      onChange={e => {
        setValue(e.target.value, e);
      }}
      onBlur={e => {
        setTouched(true, e);
      }}
    />
  );
};

/* -------- Now use Input all you want! --------- */
const Example = () => {
  return (
    <Form>
      <Input name="name" required />
      <Debug valid pristine dirty values errors touched />
    </Form>
  );
};

export default Example;
```

```jsx
import { useField } from 'informed';
import { Form, Debug } from 'informed';

const Input = props => {
  const { fieldState, fieldApi, render, ref, userProps } = useField(props);

  /* ---------- Get acces to field state ----------- */
  const { value, error, showError } = fieldState;

  /* ---------- Get acces to field control ----------- */
  const { setValue, setTouched } = fieldApi;

  /* --------------- Everything else ----------------- */
  const { label, id, ...rest } = userProps;

  /* ----------------- Call Render ------------------- */
  return render(
    <>
      {/* ------------------ Label ------------------- */}
      {label ? <label htmlFor={id}>{label}</label> : null}
      {/* -------------- Native Input ---------------- */}
      <input
        {...rest}
        id={id}
        ref={ref}
        value={!value && value !== 0 ? '' : value}
        onChange={e => {
          setValue(e.target.value, e);
        }}
        onBlur={e => {
          setTouched(true, e);
        }}
        style={showError ? { border: 'solid 1px red' } : null}
      />
      {/* --------- Show error When showError -------- */}
      {showError ? <small style={{ color: 'red' }}>{error}</small> : null}
    </>
  );
};

const Example = () => {
  return (
    <Form>
      <Input name="name" required />
      <Debug />
    </Form>
  );
};

export default Example;
```