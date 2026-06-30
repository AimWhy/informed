# `Multistep Actions`

Sometimes you need to take actions when moving from step A to step B in a multistep form. This is useful for validation, API calls, data processing, or any asynchronous operations that need to complete before proceeding to the next step. The `next()` function from `useMultistepApi()` can accept an action function that will be executed before moving to the next step. This action function can: • Return a Promise for asynchronous operations • Access current form values • Prevent step progression if validation fails • Show loading states and error messages This example demonstrates username validation with loading states and error handling. Try entering names like "joe", "tanner", "billy", or "bob" to see validation errors, or "reject" to simulate a request failure.

```jsx
import { useState } from 'react';
import { Multistep, useMultistepApi, Debug } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const Info = () => {
  const { next } = useMultistepApi();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const doSomething = ({ values }) => {
    const { first } = values;
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        // Simulate username check
        if (['joe', 'tanner', 'billy', 'bob'].includes(first)) {
          setLoading(false);
          const error = 'That name is taken';
          setError(error);
          return reject(error);
        }
        // Simulate request failure
        if (first === 'reject') {
          setLoading(false);
          const error = 'Unable to validate name.';
          setError(error);
          return reject(new Error(error));
        }
        setLoading(false);
        setError();
        return resolve();
      }, 2000);
    });
  };

  return (
    <Multistep.Step step="info">
      <Input
        name="first"
        label="First Name"
        required
      />
      <Input name="last" label="Last Name" required />
      <Button type="button" onClick={() => next(doSomething)}>
        Next
      </Button>
      {loading ? <div className="loader">Loading...</div> : null}
      {error ? <div style={{ color: 'red' }}>Error: {error}</div> : null}
    </Multistep.Step>
  );
};

const Favorite = () => {
  const { next, previous } = useMultistepApi();
  return (
    <Multistep.Step step="favorite">
      <Input name="color" label="Favorite Color:" required />
      <Input name="food" label="Favorite Food:" required />
      <div className="button-group">
        <Button type="button" onClick={previous}>
          Previous
        </Button>
        <Button type="button" onClick={next}>
          Next
        </Button>
        {/* You can do this to skip this step */}
        <Button type="button" onClick={() => next(null, { skip: true })}>
          Skip
        </Button>
      </div>
    </Multistep.Step>
  );
};

const Additional = () => {
  const { previous } = useMultistepApi();
  return (
    <Multistep.Step step="additional">
      <Input name="height" label="Height:" required />
      <Input name="weight" label="Weight:" required />
      <div className="button-group">
        <Button type="button" onClick={previous}>
          Previous
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </Multistep.Step>
  );
};

export default function Example() {
  return (
    <div>
      <Form autocomplete="off">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <Multistep>
              <div
                style={{
                  padding: '10px',
                  marginBottom: '10px'
                }}>
                <Info />
                <Favorite />
                <Additional />
              </div>
            </Multistep>
          </div>
          <div style={{ flex: 2, minWidth: '300px', marginLeft: '3rem' }}>
            <Debug />
          </div>
        </div>
      </Form>
    </div>
  );
}
```

```jsx
import { useState } from 'react';
import { Multistep, useMultistepApi, Debug } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const Info = () => {
  const { next } = useMultistepApi();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const doSomething = ({ values }) => {
    const { first } = values;
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        // Simulate username check
        if (['joe', 'tanner', 'billy', 'bob'].includes(first)) {
          setLoading(false);
          const error = 'That name is taken';
          setError(error);
          return reject(error);
        }
        // Simulate request failure
        if (first === 'reject') {
          setLoading(false);
          const error = 'Unable to validate name.';
          setError(error);
          return reject(new Error(error));
        }
        setLoading(false);
        setError();
        return resolve();
      }, 2000);
    });
  };

  return (
    <Multistep.Step step="info">
      <Input
        name="first"
        label="First Name"
        required
      />
      <Input name="last" label="Last Name" required />
      <Button type="button" onClick={() => next(doSomething)}>
        Next
      </Button>
      {loading ? <div className="loader">Loading...</div> : null}
      {error ? <div style={{ color: 'red' }}>Error: {error}</div> : null}
    </Multistep.Step>
  );
};

const Favorite = () => {
  const { next, previous } = useMultistepApi();
  return (
    <Multistep.Step step="favorite">
      <Input name="color" label="Favorite Color:" required />
      <Input name="food" label="Favorite Food:" required />
      <div className="button-group">
        <Button type="button" onClick={previous}>
          Previous
        </Button>
        <Button type="button" onClick={next}>
          Next
        </Button>
        {/* You can do this to skip this step */}
        <Button type="button" onClick={() => next(null, { skip: true })}>
          Skip
        </Button>
      </div>
    </Multistep.Step>
  );
};

const Additional = () => {
  const { previous } = useMultistepApi();
  return (
    <Multistep.Step step="additional">
      <Input name="height" label="Height:" required />
      <Input name="weight" label="Weight:" required />
      <div className="button-group">
        <Button type="button" onClick={previous}>
          Previous
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </Multistep.Step>
  );
};

export default function Example() {
  return (
    <div>
      <Form autocomplete="off">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <Multistep>
              <div
                style={{
                  padding: '10px',
                  marginBottom: '10px'
                }}>
                <Info />
                <Favorite />
                <Additional />
              </div>
            </Multistep>
          </div>
          <div style={{ flex: 2, minWidth: '300px', marginLeft: '3rem' }}>
            <Debug />
          </div>
        </div>
      </Form>
    </div>
  );
}
```