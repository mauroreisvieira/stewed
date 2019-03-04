## Card

#### Overview
**Card** component is a user interface element representing a virtual piece of paper that contains related data.

#### HTML Structure
```html
<div class="row">
    <div class="col-sm-12 col-md-6 col-lg-3">
        <div class="card">
            <div class="card__thumbnail">
                <img src="assets/images/card/toomas-tartes.jpg" alt="Toomas Tartes">
            </div>
            <div class="card__body">
                <h5 class="h5">The Coldest Sunset</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos mollitia harum beatae.</p>
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-3">
        <div class="card">
            <div class="card__header">
                <h4 class="h4">Basic (19.99€)</h4>
                <div class="tag tag--shaped tag--warning">2 days left</div>
            </div>
            <div class="card__body">
                <p><strong>Includes:</strong></p>
                <ul class="list list--check">
                    <li>Lorem ipsum dolor</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit.</li>
                </ul>
            </div>
            <div class="card__footer">
                <button class="btn btn--shaped btn--primary">Sign up</button>
                <button class="btn btn--shaped">Maybe later</button>
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-3">
        <div class="card">
            <div class="card__body">
                <div class="tag tag--shaped tag--accent">Website</div>
                <div class="tag tag--shaped tag--primary">Dashboard</div>
                <h5 class="h5">Website Road map</h5>
                <div class="progress progress--accent">
                    <label class="progress__label">Product Management</label>
                    <progress class="progress__control" max="100" value="43" data-value="43%"></progress>
                </div>
                <div class="progress progress--warning">
                    <label class="progress__label">Design & Prototype</label>
                    <progress class="progress__control" max="100" value="67" data-value="67%"></progress>
                </div>
                <div class="progress progress--primary">
                    <label class="progress__label">Development</label>
                    <progress class="progress__control" max="100" value="40" data-value="40%"></progress>
                </div>
                <div class="progress progress--success">
                    <label class="progress__label">Production</label>
                    <progress class="progress__control" max="100" value="20" data-value="20%"></progress>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-3">
        <div class="card">
            <div class="card__body">
                <h6 class="h6">Summary</h6>
                <p><strong>Includes:</strong></p>
                <ul class="list">
                    <li>25% off entire order</li>
                    <li>Active from today</li>
                </ul>
            </div>
            <div class="card__footer">
                <p class="uppercase"><strong>Performance:</strong></p>
                <ul class="list">
                    <li>0 used</li>
                </ul>

                <p>View the <a href="">Sales by discount report</a></p>
            </div>
        </div>
    </div>
</div>
```
