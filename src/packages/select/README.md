## Select

### Overview

Select component allow users to select from a single-option menu.

### Basic

```html
<div class="form-field form-field--column">
    <label for="select-1">Select #01</label>
    <div class="select" data-arrow="↓">
        <select name="select-1" class="select__control">
            <option value="1">Option #1</option>
            <option value="2">Option #2</option>
            <option value="3">Option #3</option>
            <option value="4">Option #4</option>
        </select>
        <div class="select__arrow">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="fill-current h-4 w-4"
            >
                <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                ></path>
            </svg>
        </div>
    </div>
</div>
```

### Error

```html
<div class="form-field form-field--column">
    <label for="select-1">Select #02</label>
    <div class="select select--error" data-arrow="↓">
        <select name="select-1" class="select__control">
            <option value="1">Option #1</option>
            <option value="2">Option #2</option>
            <option value="3">Option #3</option>
            <option value="4">Option #4</option>
        </select>
        <div class="select__arrow">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="fill-current h-4 w-4"
            >
                <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                ></path>
            </svg>
        </div>
    </div>
</div>
```
