## Checkbox

### Overview
**Checkboxes** component allow the user to select multiple options from a set.

### HTML Structure
```html
<div class="form-field">
    <div class="checkbox" tabindex="1">
        <input class="checkbox__control" id="checkbox-1" type="checkbox" />
        <div class="checkbox__background"></div>
    </div>
    <label for="checkbox-1">Checkbox #01</label>
</div>
<div class="form-field">
    <div class="checkbox" tabindex="1">
        <input class="checkbox__control" id="checkbox-2" type="checkbox" />
        <div class="checkbox__background"></div>
    </div>
    <label for="checkbox-2">Checkbox #02</label>
</div>
<div class="form-field">
    <div class="checkbox checkbox--disabled" tabindex="-1">
        <input class="checkbox__control" id="checkbox-3" type="checkbox" checked disabled="disabled" />
        <div class="checkbox__background"></div>
    </div>
    <label for="checkbox-3">Checkbox #03</label>
</div>
```
