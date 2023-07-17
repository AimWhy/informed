import React, { useEffect } from 'react';
import { useFieldState } from '../hooks/useFieldState';

export const DebugField = ({ name, ...props }) => {
  const fieldState = useFieldState(name);

  let displayState = {};

  if (Object.keys(props).length > 0) {
    Object.keys(props).forEach(key => {
      displayState[key] = fieldState[key];
    });
  } else {
    displayState = fieldState;
  }

  useEffect(
    () => {
      // eslint-disable-next-line
      if (window?.Prism) Prism.highlightAll();
    },
    [displayState]
  );

  let content = JSON.stringify(displayState, null, 2);

  if (props.label) {
    content = `// ${props.label}\n` + content;
  }

  return (
    <pre className="language-js">
      <code className="language-js">{content}</code>
    </pre>
  );
};
