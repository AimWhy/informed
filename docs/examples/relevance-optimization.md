# `Relevance Optimization`

By default, the relevant function will evaluate on every single form state change. This can lead to performance issues in complex forms with many fields. The `relevanceWhen` prop allows you to optimize relevance evaluation by specifying which fields should trigger the relevance function. This prevents unnecessary re-evaluations when irrelevant fields change. **Instructions:** 1. Click the checkbox to toggle the "Show Info?" field 2. Notice how the first field (with `relevanceWhen` ) only increments by 1, while the second field (without optimization) increments by 5 3. This demonstrates how `relevanceWhen` prevents unnecessary relevance evaluations

```jsx
import { useState } from 'react';
import { Debug } from 'informed';
import { Form, Input, Checkbox } from 'YourComponents';

export default function Example() {
  const [call1, setCall1] = useState(0);
  const [call2, setCall2] = useState(0);

  const relevant1 = ({ formState }) => {
    setCall1(prev => prev + 1);
    return formState.values.showInfo;
  };

  const relevant2 = ({ formState }) => {
    setCall2(prev => prev + 1);
    return formState.values.showInfo;
  };

  return (
    <Form autoComplete="off">
      <strong>relevant1 called {call1} times</strong>
      <br />
      <br />
      <strong>relevant2 called {call2} times</strong>
      <br />
      <br />
      <Checkbox label="Show Info?" name="showInfo" />
      <Input
        label="Favorite Food"
        name="food"
        relevanceWhen={['showInfo']}
        relevant={relevant1}
      />
      <Input label="Favorite Movie" name="movie" relevant={relevant2} />
      <Debug values />
    </Form>
  );
}
```

```jsx
import { useState } from 'react';
import { Debug } from 'informed';
import { Form, Input, Checkbox } from 'YourComponents';

export default function Example() {
  const [call1, setCall1] = useState(0);
  const [call2, setCall2] = useState(0);

  const relevant1 = ({ formState }) => {
    setCall1(prev => prev + 1);
    return formState.values.showInfo;
  };

  const relevant2 = ({ formState }) => {
    setCall2(prev => prev + 1);
    return formState.values.showInfo;
  };

  return (
    <Form autoComplete="off">
      <strong>relevant1 called {call1} times</strong>
      <br />
      <br />
      <strong>relevant2 called {call2} times</strong>
      <br />
      <br />
      <Checkbox label="Show Info?" name="showInfo" />
      <Input
        label="Favorite Food"
        name="food"
        relevanceWhen={['showInfo']}
        relevant={relevant1}
      />
      <Input label="Favorite Movie" name="movie" relevant={relevant2} />
      <Debug values />
    </Form>
  );
}
```