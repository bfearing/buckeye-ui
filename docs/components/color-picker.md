# Color Picker

[component-header:bui-color-picker]

```html preview
<bui-color-picker label="Select a color"></bui-color-picker>
```

```jsx react
import { ColorPicker } from 'buckeye-ui/dist/react';

const App = () => <ColorPicker label="Select a color" />;
```

?> This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.

## Examples

### Initial Value

Use the `value` attribute to set an initial value for the color picker.

```html preview
<bui-color-picker value="#4a90e2" label="Select a color"></bui-color-picker>
```

```jsx react
import { ColorPicker } from 'buckeye-ui/dist/react';

const App = () => <ColorPicker value="#4a90e2" label="Select a color" />;
```

### Opacity

Use the `opacity` attribute to enable the opacity slider. When this is enabled, the value will be displayed as HEXA, RGBA, HSLA, or HSVA based on `format`.

```html preview
<bui-color-picker value="#f5a623ff" opacity label="Select a color"></bui-color-picker>
```

```jsx react
import { ColorPicker } from 'buckeye-ui/dist/react';

const App = () => <ColorPicker opacity label="Select a color" />;
```

### Formats

Set the color picker's format with the `format` attribute. Valid options include `hex`, `rgb`, `hsl`, and `hsv`. Note that the color picker's input will accept any parsable format (including CSS color names) regardless of this option.

To prevent users from toggling the format themselves, add the `no-format-toggle` attribute.

```html preview
<bui-color-picker format="hex" value="#4a90e2" label="Select a color"></bui-color-picker>
<bui-color-picker format="rgb" value="rgb(80, 227, 194)" label="Select a color"></bui-color-picker>
<bui-color-picker format="hsl" value="hsl(290, 87%, 47%)" label="Select a color"></bui-color-picker>
<bui-color-picker format="hsv" value="hsv(55, 89%, 97%)" label="Select a color"></bui-color-picker>
```

```jsx react
import { ColorPicker } from 'buckeye-ui/dist/react';

const App = () => (
  <>
    <ColorPicker format="hex" value="#4a90e2" />
    <ColorPicker format="rgb" value="rgb(80, 227, 194)" />
    <ColorPicker format="hsl" value="hsl(290, 87%, 47%)" />
    <ColorPicker format="hsv" value="hsv(55, 89%, 97%)" />
  </>
);
```

### Swatches

Use the `swatches` attribute to add convenient presets to the color picker. Any format the color picker can parse is acceptable (including CSS color names), but each value must be separated by a semicolon (`;`). Alternatively, you can pass an array of color values to this property using JavaScript.

```html preview
<bui-color-picker
  label="Select a color"
  swatches="
    #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
    #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
  "
></bui-color-picker>
```

```jsx react
import { ColorPicker } from 'buckeye-ui/dist/react';

const App = () => (
  <ColorPicker
    label="Select a color"
    swatches="
      #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe; 
      #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
    "
  />
);
```

### Sizes

Use the `size` attribute to change the color picker's trigger size.

```html preview
<bui-color-picker size="small" label="Select a color"></bui-color-picker>
<bui-color-picker size="medium" label="Select a color"></bui-color-picker>
<bui-color-picker size="large" label="Select a color"></bui-color-picker>
```

```jsx react
import { ColorPicker } from 'buckeye-ui/dist/react';

const App = () => (
  <>
    <ColorPicker size="small" label="Select a color" />
    <ColorPicker size="medium" label="Select a color" />
    <ColorPicker size="large" label="Select a color" />
  </>
);
```

### Inline

The color picker can be rendered inline instead of in a dropdown using the `inline` attribute.

```html preview
<bui-color-picker inline label="Select a color"></bui-color-picker>
```

```jsx react
import { ColorPicker } from 'buckeye-ui/dist/react';

const App = () => <ColorPicker inline label="Select a color" />;
```

[component-metadata:bui-color-picker]
