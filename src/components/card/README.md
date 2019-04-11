## Card

### Overview

Card component is a user interface element representing a virtual piece of paper that contains content and actions about a single subject.

### Basic

```html
<div class="card">
    <div class="card__body">
        <div class="tag tag--shaped tag--accent">Website</div>
        <div class="tag tag--shaped tag--primary">Dashboard</div>
        <h5 class="h5">Statistic's</h5>
        <div class="progress progress--accent">
            <label class="progress__label">Product Management</label>
            <progress
                class="progress__control"
                max="100"
                value="43"
                data-value="43%"
            ></progress>
        </div>
        <div class="progress progress--warning">
            <label class="progress__label">Design & Prototype</label>
            <progress
                class="progress__control"
                max="100"
                value="67"
                data-value="67%"
            ></progress>
        </div>
        <div class="progress progress--primary">
            <label class="progress__label">Development</label>
            <progress
                class="progress__control"
                max="100"
                value="40"
                data-value="40%"
            ></progress>
        </div>
        <div class="progress progress--success">
            <label class="progress__label">Production</label>
            <progress
                class="progress__control"
                max="100"
                value="20"
                data-value="20%"
            ></progress>
        </div>
    </div>
</div>
```
