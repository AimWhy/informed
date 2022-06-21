import React, { useCallback, useRef, useState } from 'react';
import withDocs from '../../utils/withDocs';
import readme from './README.md';

import { Form, Debug, SchemaFields } from '../../../src';

const schema1 = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      'ui:control': 'input'
    },
    age: {
      type: 'number',
      title: 'Age',
      'ui:control': 'input',
      'ui:props': {
        type: 'number'
      }
    }
  }
};

const schema2 = {
  type: 'object',
  properties: {
    brother: {
      type: 'string',
      title: 'Brother name',
      'ui:control': 'input'
    },
    age: {
      type: 'number',
      title: 'Brother age',
      'ui:control': 'input',
      'ui:props': {
        type: 'number'
      }
    }
  }
};

const Schema = () => {
  const [schema, setSchema] = useState(schema1);
  const formApiRef = useRef();

  const onClick = useCallback(() => {
    // Set new schema
    setSchema(prev => (prev === schema1 ? schema2 : schema1));
    // Reset the form
    formApiRef.current.reset();
  }, []);

  return (
    <Form schema={schema} formApiRef={formApiRef}>
      <SchemaFields />
      <button type="button" onClick={onClick}>
        Toggle
      </button>
      <Debug values />
    </Form>
  );
};

export default withDocs(readme, Schema);