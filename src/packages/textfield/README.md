## Textfield

### Overview

Textfield component allow users to input, edit, and select text.

### Basic

```html
<div class="form-field form-field--column">
    <label for="textfield-1">Textfield #01</label>
    <div class="textfield">
        <input
            type="text"
            name="textfield-1"
            placeholder="Textfield"
            class="textfield__control"
        />
    </div>
</div>
```

### Outlined

```html
<div class="form-field form-field--column">
    <label for="textfield-1">Textfield #01</label>
    <div class="textfield textfield--outlined">
        <input
            type="text"
            name="textfield-1"
            placeholder="Textfield"
            class="textfield__control"
        />
    </div>
</div>
```

### Error

```html
<div class="form-field form-field--column">
    <label for="textfield-2">Textfield #02</label>
    <div class="textfield textfield--sm has-error textfield--outlined">
        <input
            type="text"
            name="textfield-2"
            placeholder="Error"
            value="Error"
            class="textfield__control"
        />
    </div>
</div>
```

### Shaped

```html
<div class="form-field form-field--column">
    <label for="textfield-2">Textfield #03</label>
    <div class="textfield textfield--shaped textfield--outlined">
        <input
            type="text"
            name="textfield-3"
            placeholder="Warning"
            value="Shaped"
            class="textfield__control"
        />
    </div>
</div>
```
