## Checkbox

### Overview

Checkbox component allow the user to select multiple options from a set.

### Basic

```html
<div class="form-field">
    <div class="checkbox" tabindex="1">
        <input class="checkbox__control" id="checkbox-1" type="checkbox" />
        <div class="checkbox__background"></div>
    </div>
    <label for="checkbox-1">Checkbox</label>
</div>
```

### Indeterminate

```html
<div class="form-field">
    <div class="checkbox" tabindex="-1">
        <input class="checkbox__control" id="checkbox-2" type="checkbox" />
        <div class="checkbox__background"></div>
    </div>
    <label for="checkbox-2">Checkbox</label>
</div>
```

### Disabled

```html
<div class="form-field">
    <div class="checkbox checkbox--disabled" tabindex="-1">
        <input
            class="checkbox__control"
            id="checkbox-3"
            type="checkbox"
            checked
            disabled="disabled"
        />
        <div class="checkbox__background"></div>
    </div>
    <label for="checkbox-3">Checkbox</label>
</div>
```

### Javascript Example

```js
document.querySelector('#checkbox-2').indeterminate = true;
```
