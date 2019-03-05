## Textfield

### Overview
**Textfield** component allow users to input, edit, and select text.

### HTML Structure
```html
<div class="row">
    <div class="col-sm-12 col-md-4">
        <div class="form-field form-field--column">
            <label for="textfield-1">Textfield #01</label>
            <div class="textfield">
                <input type="text" name="textfield-1" placeholder="Textfield" class="textfield__control" />
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-4">
        <div class="form-field form-field--column">
            <label for="textfield-2">Textfield #02</label>
            <div class="textfield textfield--required">
                <input type="text" name="textfield-2" placeholder="Required" class="textfield__control" />
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-4">
        <div class="form-field form-field--column">
            <label for="textfield-3">Textfield #03</label>
            <div class="textfield textfield--error" data-error="!">
                <input type="text" name="textfield-3" placeholder="Error" value="Error" class="textfield__control" />
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-4">
        <div class="form-field form-field--column">
            <label for="textfield-4">Textfield #04</label>
            <div class="textfield textfield--textarea">
                <textarea class="textfield__control" name="textfield-4"></textarea>
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-4">
        <div class="form-field form-field--column">
            <label for="textfield-1">Textfield #05</label>
            <div class="textfield textfield--shaped">
                <input type="text" name="textfield-5" placeholder="Textfield Shaped" class="textfield__control" />
            </div>
        </div>
    </div>
</div>
```
