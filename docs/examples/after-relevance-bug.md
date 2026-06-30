# After Render Bug

The issue occured when a field “a” validates using a field “b” where field “b” is rendered after field “a”. There are three scenarios that are of concern here.

`Scenario1:` validateOnMount IS passed in, the form will validate for the first profile but not the second. This is because when we validate "OnReset" field "b" does not have a value yet. This is an inconsistancy due to the fact that there is a difference between first render and reset. On first render there is a "double" initialization, one that happens before render, and one that occurs after. The purpose of this was to ensure things ( such as validation ) got triggered once all fields were rendered. When the user changes to the second profile, a reset will get triggered on all fields, validateOnMount still forces the field to validate, however at the time of validation for field "a", field "b" has not yet been set back to its new value. The solution to this was to break up the form "reset" function into two parts, where we first itterate and initialize the values and the second goes back and re-validates each field! ( only if validateOnMount was passed to that field ) **Bug - Fixed in v4.60.0**

`Scenario2:` This results in the form performing NO validation for field "a" when it was first rendered, however when choosing a new profile it would perform validation. This is obviously due do the fact that when a reset occurs, a value change occurs for field "b" as it goes from "World" to "Elon" ( see example below ). This triggers the internal subscription that gets created when passing to field "a". To fix this we could update the code to emit an event in the second initialization because truly the value is changing. However this causes an entire new issue. Now this would, for example, trigger validation on a field that is required but we have no intention of showing the user this required error on mount. If we make this change, while it would fix the issue described, it would cause another. For now we may accept that there is truly a difference between the initial mount and a reset in the context of a validateWhen. **Expected Behavior - Nothing to fix**

`Scenario3:` This had a bug because, while in theory it would not encounter an issue as it should validate no matter what due to the issue descirbed in 2, it in fact has an issue in array fields... Why? ... Because array fields themselves have a special reset function. Similar to how leaf nodes ( normal fields ) register with the form controller so do arrayFields. Because array fields maintain a state of keys, which are used to optimize how array fields work internally, a reset will trigger a clear of these keys and a new one will be built. Note, this is similar to how the FormController will reset the entire form state before calling reset on all registered fields. In order to go into more details on this issue please visit the array version of this bug in the docs :) **Bug - Fixed in v4.60.0**

## Example Scneario 1

```jsx
import { Relevant, Debug, Select } from 'informed';
import { Form, Input, Checkbox } from 'Components';
import { useEffect, useRef, useState } from 'react';

const validate = (value, values) => {
  console.log('B Value', values.b);
  if (values.b === 'Elon') return 'Cant Equal Elon!';
  if (values.b === 'World') return 'Cant Equal World!';
};

const profiles = [
  {
    a: 'Hello1',
    b: 'World',
    show: true
  },
  {
    a: 'Hello2',
    b: 'Elon',
    show: true
  }
];

const ProfileForm = ({ profile: initialValues }) => {
  // Ref to the form api
  const formApiRef = useRef();

  // Reset the form whenever initial values change ( happens when user selects profile )
  useEffect(
    () => {
      // We check this because internally informed will reset by default if you change initialValues on pristine form
      if (!formApiRef.current.getFormState().pristine) {
        formApiRef.current.reset();
      }
    },
    [initialValues]
  );

  return (
    // Remember to get access to the formApi and pass in the initial values
    <Form formApiRef={formApiRef} initialValues={initialValues}>
      {/* --------- Field A has validation that depends on B -------- */}
      <Input
        name="a"
        label="A"
        validate={validate}
        validateOnMount
        showErrorIfError
        // validateWhen={['b']}
      />
      {/* ----- Field B effects A's validation ------ */}
      <Input name="b" label="B" />
      {/* ---------- Debug the form state ----------- */}
      <Debug values modified />
    </Form>
  );
};

const Example = () => {
  // Select the first profile by default
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

  const selectProfile = ({ value }) => setSelectedProfile(profiles[value]);

  return (
    <Form>
      {/* A rare case where we want to track the value outside the form */}
      <Select name="profile" label="Profile" onValueChange={selectProfile}>
        {profiles.map((profile, i) => (
          <option value={i}>{profile.a}</option>
        ))}
      </Select>
      <ProfileForm profile={selectedProfile} />
    </Form>
  );
};

export default Example;
```

```jsx
import { Relevant, Debug, Select } from 'informed';
import { Form, Input, Checkbox } from 'Components';
import { useEffect, useRef, useState } from 'react';

const validate = (value, values) => {
  console.log('B Value', values.b);
  if (values.b === 'Elon') return 'Cant Equal Elon!';
  if (values.b === 'World') return 'Cant Equal World!';
};

const profiles = [
  {
    a: 'Hello1',
    b: 'World',
    show: true
  },
  {
    a: 'Hello2',
    b: 'Elon',
    show: true
  }
];

const ProfileForm = ({ profile: initialValues }) => {
  // Ref to the form api
  const formApiRef = useRef();

  // Reset the form whenever initial values change ( happens when user selects profile )
  useEffect(
    () => {
      // We check this because internally informed will reset by default if you change initialValues on pristine form
      if (!formApiRef.current.getFormState().pristine) {
        formApiRef.current.reset();
      }
    },
    [initialValues]
  );

  return (
    // Remember to get access to the formApi and pass in the initial values
    <Form formApiRef={formApiRef} initialValues={initialValues}>
      {/* --------- Field A has validation that depends on B -------- */}
      <Input
        name="a"
        label="A"
        validate={validate}
        validateOnMount
        showErrorIfError
        // validateWhen={['b']}
      />
      {/* ----- Field B effects A's validation ------ */}
      <Input name="b" label="B" />
      {/* ---------- Debug the form state ----------- */}
      <Debug values modified />
    </Form>
  );
};

const Example = () => {
  // Select the first profile by default
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

  const selectProfile = ({ value }) => setSelectedProfile(profiles[value]);

  return (
    <Form>
      {/* A rare case where we want to track the value outside the form */}
      <Select name="profile" label="Profile" onValueChange={selectProfile}>
        {profiles.map((profile, i) => (
          <option value={i}>{profile.a}</option>
        ))}
      </Select>
      <ProfileForm profile={selectedProfile} />
    </Form>
  );
};

export default Example;
```