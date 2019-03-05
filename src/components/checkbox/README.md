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

### Disabled
```html
<div class="form-field">
    <div class="checkbox checkbox--disabled" tabindex="-1">
        <input class="checkbox__control" id="checkbox-1" type="checkbox" checked disabled="disabled" />
        <div class="checkbox__background"></div>
    </div>
    <label for="checkbox-1">Checkbox</label>
</div>
