# `NumberFormatter`

Informed comes with a built in number formatter that makes use of the INTL spec! **Note:** It will format based on the intl config passed to the util. **Note:** What gets stored in values is an actualy js number but whats shown to user is the formatted value itself.

```jsx
import { Debug, utils } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const Example = () => {
  // Generate formatter & parser from INTL options
  const { formatter, parser } = utils.createIntlNumberFormatter('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <Form>
      <Input
        field="localeMask"
        label={`Locale Masked Field (USD currency)`}
        formatter={formatter}
        parser={parser}
        initialValue={3000.25}
      />
      <Button type="submit">Submit</Button>
      <Debug values maskedValues />
    </Form>
  );
};

export default Example;
```

---

## Changing Locale

Thats cool but lets take a look at a more complex example where we can change the currency and locale.

```jsx
import { Debug, useFieldState, utils } from 'informed';
import { useMemo } from 'react';
import { Form, Button, Select, Input } from 'YourComponents';
import { currencyOptions, localeOptions } from './LocaleData';

// const localeOptions = [const localeOptions = [
//   { value: 'af-NA', label: 'Afrikaans (Namibia)' },
//   { value: 'af-ZA', label: 'Afrikaans (South Africa)' },
//   { value: 'af', label: 'Afrikaans' },
//   ...rest, shortened for readability
// ];

// const currencyOptions = [
//   {
//     value: 'EUR',
//     label: 'EUR',
//   },
//   {
//     value: 'AED',
//     label: 'AED',
//   },
//   ...rest, shortened for readability
// ]

const FormattedField = () => {
  const { value: locale } = useFieldState('locale');
  const { value: currency } = useFieldState('currency');

  // Generate mask from locale and currency
  const { formatter, parser } = useMemo(
    () =>
      utils.createIntlNumberFormatter(locale, {
        style: 'currency',
        currency
      }),
    [currency, locale]
  );

  return (
    <Input
      field="localeMask"
      label={`Locale Masked Field (${currency} currency)`}
      formatter={formatter}
      parser={parser}
      formatterDependencies={[locale, currency]}
      initialValue={3000.25}
    />
  );
};

const Example = () => (
  <Form>
    <Select
      label="Locale"
      field="locale"
      options={localeOptions}
      initialValue="en-US"
    />
    <Select
      label="Currency"
      field="currency"
      options={currencyOptions}
      initialValue="USD"
    />
    <FormattedField />
    <Button type="submit">Submit</Button>
    <Debug values maskedValues />
  </Form>
);

export default Example;
```

---

## Custom Formatter

Sometimes you may for whatever reason need to override the way it formats. You can achieve this by passing a custom part formatter. **Note:** In the below example the commas are replaced by underscores.

```jsx
import { Debug, utils } from 'informed';
import { Form, Input, Button } from 'YourComponents';

// Custom format to parts function ( replaces commas with underscores )
const formatToParts = (value, locale, opts) => {
  const formatter = new Intl.NumberFormat(locale, opts);
  const parts = formatter.formatToParts(value);
  parts.forEach(p => {
    if (p.type == 'group') p.value = '_';
  });
  return parts;
};

const Example = () => {
  // Generate formatter & parser from INTL options
  const { formatter, parser } = utils.createIntlNumberFormatter(
    'en-US',
    {
      style: 'currency',
      currency: 'USD'
    },
    { formatToParts }
  );

  return (
    <Form>
      <Input
        field="localeMask"
        label={`Locale Masked Field (USD currency)`}
        formatter={formatter}
        parser={parser}
        initialValue={3000.25}
      />
      <Button type="submit">Submit</Button>
      <Debug values maskedValues />
    </Form>
  );
};

export default Example;
```

---

## Complex Formatting

This shows how this formatter works for even complex locales with different decimal and grouping decimal characters.

```jsx
import { Debug, utils } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const Example = () => {
  const usFormatter = utils.createIntlNumberFormatter('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
    style: 'decimal'
  });

  const egFormatter = utils.createIntlNumberFormatter('ar-EG', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  const nlFormatter = utils.createIntlNumberFormatter('nl-BE', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  });

  return (
    <Form>
      <Input
        field="en-US"
        label={`Locale Masked Field with decimal (en-US)`}
        formatter={usFormatter.formatter}
        parser={usFormatter.parser}
        initialValue={3000.25}
      />
      <Input
        field="ar-EG"
        label={`Locale Masked Field with decimal (ar-EG)`}
        formatter={egFormatter.formatter}
        parser={egFormatter.parser}
        initialValue={3000.25}
      />
      <Input
        field="nl-BE"
        label={`Locale Masked Field with decimal (nl-BE)`}
        formatter={nlFormatter.formatter}
        parser={nlFormatter.parser}
        initialValue={3000.25}
      />
      <Button type="submit">Submit</Button>
      <Debug values maskedValues />
    </Form>
  );
};

export default Example;
```

```jsx
import { Debug, useFieldState, utils } from 'informed';
import { useMemo } from 'react';
import { Form, Button, Select, Input } from 'YourComponents';
import { currencyOptions, localeOptions } from './LocaleData';

// const localeOptions = [const localeOptions = [
//   { value: 'af-NA', label: 'Afrikaans (Namibia)' },
//   { value: 'af-ZA', label: 'Afrikaans (South Africa)' },
//   { value: 'af', label: 'Afrikaans' },
//   ...rest, shortened for readability
// ];

// const currencyOptions = [
//   {
//     value: 'EUR',
//     label: 'EUR',
//   },
//   {
//     value: 'AED',
//     label: 'AED',
//   },
//   ...rest, shortened for readability
// ]

const FormattedField = () => {
  const { value: locale } = useFieldState('locale');
  const { value: currency } = useFieldState('currency');

  // Generate mask from locale and currency
  const { formatter, parser } = useMemo(
    () =>
      utils.createIntlNumberFormatter(locale, {
        style: 'currency',
        currency
      }),
    [currency, locale]
  );

  return (
    <Input
      field="localeMask"
      label={`Locale Masked Field (${currency} currency)`}
      formatter={formatter}
      parser={parser}
      formatterDependencies={[locale, currency]}
      initialValue={3000.25}
    />
  );
};

const Example = () => (
  <Form>
    <Select
      label="Locale"
      field="locale"
      options={localeOptions}
      initialValue="en-US"
    />
    <Select
      label="Currency"
      field="currency"
      options={currencyOptions}
      initialValue="USD"
    />
    <FormattedField />
    <Button type="submit">Submit</Button>
    <Debug values maskedValues />
  </Form>
);

export default Example;
```

```jsx
import { Debug, utils } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const Example = () => {
  // Generate formatter & parser from INTL options
  const { formatter, parser } = utils.createIntlNumberFormatter('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <Form>
      <Input
        field="localeMask"
        label={`Locale Masked Field (USD currency)`}
        formatter={formatter}
        parser={parser}
        initialValue={3000.25}
      />
      <Button type="submit">Submit</Button>
      <Debug values maskedValues />
    </Form>
  );
};

export default Example;
```

```jsx
import { Debug, utils } from 'informed';
import { Form, Input, Button } from 'YourComponents';

// Custom format to parts function ( replaces commas with underscores )
const formatToParts = (value, locale, opts) => {
  const formatter = new Intl.NumberFormat(locale, opts);
  const parts = formatter.formatToParts(value);
  parts.forEach(p => {
    if (p.type == 'group') p.value = '_';
  });
  return parts;
};

const Example = () => {
  // Generate formatter & parser from INTL options
  const { formatter, parser } = utils.createIntlNumberFormatter(
    'en-US',
    {
      style: 'currency',
      currency: 'USD'
    },
    { formatToParts }
  );

  return (
    <Form>
      <Input
        field="localeMask"
        label={`Locale Masked Field (USD currency)`}
        formatter={formatter}
        parser={parser}
        initialValue={3000.25}
      />
      <Button type="submit">Submit</Button>
      <Debug values maskedValues />
    </Form>
  );
};

export default Example;
```

```jsx
import { Debug, utils } from 'informed';
import { Form, Input, Button } from 'YourComponents';

const Example = () => {
  const usFormatter = utils.createIntlNumberFormatter('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
    style: 'decimal'
  });

  const egFormatter = utils.createIntlNumberFormatter('ar-EG', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  const nlFormatter = utils.createIntlNumberFormatter('nl-BE', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  });

  return (
    <Form>
      <Input
        field="en-US"
        label={`Locale Masked Field with decimal (en-US)`}
        formatter={usFormatter.formatter}
        parser={usFormatter.parser}
        initialValue={3000.25}
      />
      <Input
        field="ar-EG"
        label={`Locale Masked Field with decimal (ar-EG)`}
        formatter={egFormatter.formatter}
        parser={egFormatter.parser}
        initialValue={3000.25}
      />
      <Input
        field="nl-BE"
        label={`Locale Masked Field with decimal (nl-BE)`}
        formatter={nlFormatter.formatter}
        parser={nlFormatter.parser}
        initialValue={3000.25}
      />
      <Button type="submit">Submit</Button>
      <Debug values maskedValues />
    </Form>
  );
};

export default Example;
```