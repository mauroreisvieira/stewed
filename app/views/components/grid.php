<div class="header-description">
    <div class="container">
        <div class="master-header">
            <h1>Grid System</h1>
            <div class="margin-bottom-10"></div>
            <p>Stewed by default have 12 columns.</p>
            <p>When resizing your browser, each of these columns will always have an equal width.</p>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="large-12 medium-12 small-12 margin-bottom-40">
            <h2>Column Grid Row</h2>
            <p>Can you choose if you want space between the columns or not, just by defining <code class="markup">.row</code> not to have a rift between them or <code class="markup">.row-space</code> pars have.</p>
            <p>Thus allowing you to use the entire screen space..</p>
        </div>
    </div>
    <div class="row">
        <div class="large-5 medium-6 small-12 column">large-5 medium-6 small-12</div>
        <div class="large-7 medium-6 small-12 column">large-7 medium-6 small-12</div>
        <!-- LARGE 6 -->
        <div class="large-6 medium-6 small-12 column">large-6 medium-6 small-6</div>
        <div class="large-6 medium-6 small-12 column">large-6 medium-6 small-6</div>
        <!-- LARGE 7 + 3 + 2 -->
        <div class="large-9 medium-7 small-6 column">large-7 medium-7 small-6</div>
        <div class="large-3 medium-5 small-6 column">large-5 medium-5 small-6</div>
        <!-- LARGE 12 -->
        <div class="large-12 medium-12 small-12 column">large-12 medium-12 small-12</div>
    </div>

    <div class="row">
        <div class="large-12 medium-12 small-12">
            <div class="card">
                <div class="card__header ">
                    <h5 class="card__header__title">Cooking</h5>
                </div>
                <div class="card__container">
                    <div id="view-html" class="code">
                        <pre class="brush: xml; toolbar: false; gutter: false;">
                            &lt;div class="row">
                                &lt;div class="large-4 medium-4 small-4">large-4 medium-4 small-4&lt;/div>
                                &lt;div class="large-4 medium-4 small-4">large-4 medium-4 small-4&lt;/div>
                                &lt;div class="large-4 medium-4 small-4">large-4 medium-4 small-4&lt;/div>

                                &lt;div class="large-4 medium-4 small-4">large-4 medium-4 small-4&lt;/div>
                                &lt;div class="large-8 medium-8 small-8">large-8 medium-8 small-8&lt;/div>

                                &lt;div class="large-6 medium-6 small-6">large-6 medium-6 small-6&lt;/div>
                                &lt;div class="large-6 medium-6 small-6">large-6 medium-6 small-6&lt;/div>

                                &lt;div class="large-12 medium-12 small-12">large-12 medium-12 small-12&lt;/div>
                            &lt;/div>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="large-12 medium-12 small-12 margin-bottom-40">
            <hr class="custom-hr margin-top-40">
            <h2>Column Grid Row-Space</h2>
        </div>
    </div>

    <div class="row-space">
        <div class="large-5 medium-5 small-5 column">large-5 medium-5 small-5</div>
        <div class="large-7 medium-7 small-7 column">large-7 medium-7 small-7</div>
        <!-- LARGE 6 -->
        <div class="large-6 medium-6 small-6 column">large-6 medium-6 small-6</div>
        <div class="large-6 medium-6 small-6 column">large-6 medium-6 small-6</div>
        <!-- LARGE 7 + 5 -->
        <div class="large-7 medium-7 small-7 column">large-7 medium-7 small-7</div>
        <div class="large-5 medium-5 small-5 column">large-5 medium-5 small-5</div>
        <!-- LARGE 8 + 4 -->
        <div class="large-8 medium-8 small-8 column">large-8 medium-8 small-8</div>
        <div class="large-4 medium-4 small-4 column">large-4 medium-4 small-4</div>
        <!-- LARGE 9 + 3 -->
        <div class="large-9 medium-9 small-9 column">large-9 medium-9 small-9</div>
        <div class="large-3 medium-3 small-3 column">large-3 medium-3 small-3</div>
    </div>

    <div class="row">
        <div class="large-12 medium-12 small-12">
            <div class="card">
                <div class="card__header">
                    <h5 class="card__header__title">Cooking</h5>
                </div>
                <div class="card__container">
                    <div id="view-html" class="code">
                        <pre class="brush: xml; toolbar: false; gutter: false;">
                            &lt;!-- If you want a trough between the containers you can do it as follows: -->
                            &lt;div class="row-space">
                                &lt;div class="large-4 medium-4 small-4">large-4 medium-4 small-4&lt;/div>
                                &lt;div class="large-4 medium-4 small-4">large-4 medium-4 small-4&lt;/div>
                                &lt;div class="large-4 medium-4 small-4">large-4 medium-4 small-4&lt;/div>
                            
                                &lt;div class="large-4 medium-6 small-12">large-4 medium-6 small-12&lt;/div>
                                &lt;div class="large-8 medium-6 small-12">large-8 medium-6 small-12&lt;/div>
                     
                                &lt;div class="large-6 medium-6 small-6">6&lt;/div>
                                &lt;div class="large-6 medium-6 small-6">6&lt;/div>
            
                                &lt;div class="large-12 medium-12 small-12">12&lt;/div>
                            &lt;/div>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

