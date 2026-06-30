# After Render Bug In Array

This is a similar issue as AfterRenderBug but within an array field.

This issue occured when we had validateOnMount and also validateWhen passed to inputs within an array field. Specifically where field "a" validates when field "b" changes and field "b" gets rendered after field "a". The behavior observed would occur when changing profiles and therefore triggering a form reset. The validateOnMount would trigger a validation after the "Second Initialize" of field "a". But due to the lifecycle of react. Because array fields maintain a state of keys, which are used to optimize how array fields work internally, a reset would trigger a clear of these keys and a new one will be built. So basically what would occur would be the following: 1: The array field `stuff` would set a new array of keys, causing new fields to start to render. Remember, interally we call initialize in a layoutEffect which occurs **BEFORE** any `useEffect` cleanups. 2: Now, the old field `"b"` would start to clean itself up, **REMOVING** the value that just got initialized. 3: Finally the second initialize would trigger for field `"a"` but now B value is gone do to the cleanup that occured The order these occurs matters as it will set the new value to "Elon" but then the cleanup function will blow it away! Technically it comes back due to our "SecondInitialize" call but thats to little too late because at the time `"a"` validates ( on second initialize ) `"b"` wont have its value. The solution to this was a bit interesting but seems to have worked! Basically Internally I wait until all fields part of an array field, in this case `"stuff"` finish cleaning up after themselves, only then do I set the new set of keys which will begin the process of re-rendering the new inputs :) **Bug - Fixed in v4.60.0**

Note: This bug could more clearly be seen with this example as we error out IF there is NO value for "b". Prior to this fix, as you change from profile1 to profile2, field A would error out! This is due to the issue described above.

Note: To better undertand reacts lifecylce please open inspector and view the example below labeled `Understanding Effect Order`

```jsx
import { Relevant, Debug, Select, ArrayField } from 'informed';
import { Form, Input, Checkbox } from 'Components';
import { useEffect, useRef, useState } from 'react';

const validate = (value, values, { formApi, scope, name }) => {
  const vals = formApi.getValue(`${scope}`);
  console.log('B VALUE:', vals?.b);
  if (!vals?.b) return 'A needs B';
};

const profiles = [
  // This should NOT error on selection as its valid
  {
    name: 'Profile1',
    stuff: [
      {
        a: 'Hello1',
        b: 'World'
      }
    ]
  },
  // This should NOT error on selection as its valid... but will because of bug
  {
    name: 'Profile2',
    stuff: [
      {
        a: 'Hello2',
        b: 'Elon'
      }
    ]
  },
  // This actually should error on selection
  {
    name: 'Profile3',
    stuff: [
      {
        a: 'Hello3',
        b: undefined
      }
    ]
  }
];

const ProfileForm = ({ profile: initialValues }) => {
  // Ref to the form api
  const formApiRef = useRef();

  // Reset the form whenever initial values change ( happens when user selects profile )
  useEffect(
    () => {
      if (!formApiRef.current.getFormState().pristine) {
        formApiRef.current.reset();
      }
    },
    [initialValues]
  );

  return (
    // Remember to get access to the formApi and pass in the initial values
    <Form formApiRef={formApiRef} initialValues={initialValues}>
      <ArrayField name="stuff">
        {() => {
          return (
            <ArrayField.Items>
              {({ name }) => (
                <>
                  <h4>{name}</h4>
                  {/* --------- Field A has validation that depends on B -------- */}
                  <Input
                    name="a"
                    label="A"
                    validate={validate}
                    validateOnMount
                    showErrorIfError
                    validateWhen={['b']}
                  />
                  {/* ----- Field B effects A's validation ------ */}
                  <Input name="b" label="B" />
                  {/* </Relevant> */}
                </>
              )}
            </ArrayField.Items>
          );
        }}
      </ArrayField>

      {/* ---------- Debug the form state ----------- */}
      <Debug values />
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
          <option value={i}>{profile.name}</option>
        ))}
      </Select>
      <ProfileForm profile={selectedProfile} />
    </Form>
  );
};

export default Example;
```

---

## Understanding Effect Order

```jsx
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect
} from 'react';

const Context = createContext();

const useRenderCount = () => {
  const countRef = useRef(0);

  countRef.current = countRef.current + 1;

  return countRef.current;
};

const Renders = () => {
  const renders = useRenderCount();

  return <span style={{ color: 'red' }}>{renders}</span>;
};

const useEffectLog = label => {
  useEffect(
    () => {
      console.log(`Effect - ${label}`);
      return () => {
        console.log(`Cleanup - ${label}`);
      };
    },
    [label]
  );
  useLayoutEffect(
    () => {
      console.log(`LayoutEffect - ${label}`);
    },
    [label]
  );
};

const computeStyle = ({ depth }) => {
  return {
    marginLeft: `${depth * 10}px`,
    padding: '5px',
    marginTop: '5px',
    marginBottom: '5px',
    border: '2px solid black'
  };
};

const Inspector = ({ name, depth, child }) => {
  useEffectLog(name);
  return (
    <div style={computeStyle({ depth })}>
      {name} <Renders /> {console.log(name)}
      {child && (
        <Inspector depth={depth + 1} name={child.name} child={child.child} />
      )}
    </div>
  );
};

const children1 = {
  name: 'A',
  child: {
    name: 'B',
    child: {
      name: 'C',
      child: {
        name: 'D',
        child: {
          name: 'E'
        }
      }
    }
  }
};

const children2 = {
  name: 'F',
  child: {
    name: 'G',
    child: {
      name: 'H',
      child: {
        name: 'I',
        child: {
          name: 'J'
        }
      }
    }
  }
};

export default function EffectOrder() {
  const [children, setChildren] = useState(children1);

  const toggleChildren = () => {
    setChildren(prev => {
      if (prev.name === 'A') {
        return children2;
      }
      return children1;
    });
  };

  return (
    <div className="App">
      <Inspector name={children.name} depth={0} child={children.child} />
      <button type="button" onClick={toggleChildren}>
        Toggle Children
      </button>
    </div>
  );
}
```

```jsx
import { Relevant, Debug, Select, ArrayField } from 'informed';
import { Form, Input, Checkbox } from 'Components';
import { useEffect, useRef, useState } from 'react';

const validate = (value, values, { formApi, scope, name }) => {
  const vals = formApi.getValue(`${scope}`);
  console.log('B VALUE:', vals?.b);
  if (!vals?.b) return 'A needs B';
};

const profiles = [
  // This should NOT error on selection as its valid
  {
    name: 'Profile1',
    stuff: [
      {
        a: 'Hello1',
        b: 'World'
      }
    ]
  },
  // This should NOT error on selection as its valid... but will because of bug
  {
    name: 'Profile2',
    stuff: [
      {
        a: 'Hello2',
        b: 'Elon'
      }
    ]
  },
  // This actually should error on selection
  {
    name: 'Profile3',
    stuff: [
      {
        a: 'Hello3',
        b: undefined
      }
    ]
  }
];

const ProfileForm = ({ profile: initialValues }) => {
  // Ref to the form api
  const formApiRef = useRef();

  // Reset the form whenever initial values change ( happens when user selects profile )
  useEffect(
    () => {
      if (!formApiRef.current.getFormState().pristine) {
        formApiRef.current.reset();
      }
    },
    [initialValues]
  );

  return (
    // Remember to get access to the formApi and pass in the initial values
    <Form formApiRef={formApiRef} initialValues={initialValues}>
      <ArrayField name="stuff">
        {() => {
          return (
            <ArrayField.Items>
              {({ name }) => (
                <>
                  <h4>{name}</h4>
                  {/* --------- Field A has validation that depends on B -------- */}
                  <Input
                    name="a"
                    label="A"
                    validate={validate}
                    validateOnMount
                    showErrorIfError
                    validateWhen={['b']}
                  />
                  {/* ----- Field B effects A's validation ------ */}
                  <Input name="b" label="B" />
                  {/* </Relevant> */}
                </>
              )}
            </ArrayField.Items>
          );
        }}
      </ArrayField>

      {/* ---------- Debug the form state ----------- */}
      <Debug values />
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
          <option value={i}>{profile.name}</option>
        ))}
      </Select>
      <ProfileForm profile={selectedProfile} />
    </Form>
  );
};

export default Example;
```

```jsx
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect
} from 'react';

const Context = createContext();

const useRenderCount = () => {
  const countRef = useRef(0);

  countRef.current = countRef.current + 1;

  return countRef.current;
};

const Renders = () => {
  const renders = useRenderCount();

  return <span style={{ color: 'red' }}>{renders}</span>;
};

const useEffectLog = label => {
  useEffect(
    () => {
      console.log(`Effect - ${label}`);
      return () => {
        console.log(`Cleanup - ${label}`);
      };
    },
    [label]
  );
  useLayoutEffect(
    () => {
      console.log(`LayoutEffect - ${label}`);
    },
    [label]
  );
};

const computeStyle = ({ depth }) => {
  return {
    marginLeft: `${depth * 10}px`,
    padding: '5px',
    marginTop: '5px',
    marginBottom: '5px',
    border: '2px solid black'
  };
};

const Inspector = ({ name, depth, child }) => {
  useEffectLog(name);
  return (
    <div style={computeStyle({ depth })}>
      {name} <Renders /> {console.log(name)}
      {child && (
        <Inspector depth={depth + 1} name={child.name} child={child.child} />
      )}
    </div>
  );
};

const children1 = {
  name: 'A',
  child: {
    name: 'B',
    child: {
      name: 'C',
      child: {
        name: 'D',
        child: {
          name: 'E'
        }
      }
    }
  }
};

const children2 = {
  name: 'F',
  child: {
    name: 'G',
    child: {
      name: 'H',
      child: {
        name: 'I',
        child: {
          name: 'J'
        }
      }
    }
  }
};

export default function EffectOrder() {
  const [children, setChildren] = useState(children1);

  const toggleChildren = () => {
    setChildren(prev => {
      if (prev.name === 'A') {
        return children2;
      }
      return children1;
    });
  };

  return (
    <div className="App">
      <Inspector name={children.name} depth={0} child={children.child} />
      <button type="button" onClick={toggleChildren}>
        Toggle Children
      </button>
    </div>
  );
}
```