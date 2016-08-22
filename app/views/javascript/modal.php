<?php 
/*
 * Todo 
 *
 * Add event to ESC key
 * Add event onTransitionEnd
 * Add touch's events
 * 
 */
?>
<div class="container">
    <h2>Introduction</h2>
    <p>Modal is positioned overlapping within the display window and is protected page content.</p>
    <div class="margin-bottom-20"></div>
    <a class="background-bluegrey color-white button-large openModal" href="#openModal" stewed-modal="openModal">Show Modal Effect</a>
    <hr class="custom-hr margin-top-20">
    <h2>Modal HTML Structure</h2>
    <div class="row-space margin-top-20">
        <div class="large-12 medium-12 small-12">
            <div class="card margin-bottom-40">
                <div class="card__header">
                    <h5 class="card__header__title uppercase">Learn to cook</h5>
                </div>
                <div class="card__container">
                    <div id="view-html" class="code">
                        <pre class="brush: xml; toolbar: false; gutter: false;">
                            &lt;!-- Use a hyperlink 'href=""' -->
                            &lt;a class="button button-white button-large openModal" href="#modal">Show Modal&lt;/a>

                            &lt;!-- Use a button 'stewed-modal=""' -->
                            &lt;button class="button button-white button-large openModal" stewed-modal="modal">Show Modal&lt;/button>

                            &lt;!-- Structure -->
                            &lt;div id="modal" class="container modal">
                            &lt;div class="modal-head">
                            &lt;h2>Modal Header&lt;/h2>
                            &lt;/div>
                            &lt;div class="modal-body">
                            &lt;p>...&lt;/p>
                            &lt;/div>
                            &lt;div class="modal-footer">
                            &lt;!-- Use class 'modal-close' to close modal on click -->
                            &lt;a href="#!" class="modal-close button button-white button-large float-right">Disagree&lt;/a>
                            &lt;a href="#!" class="button button-white button-large float-right">Agree&lt;/a>
                            &lt;/div>
                            &lt;/div>
                        </pre>                    
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row-space">
        <div class="large-12 medium-12 small-12">
            <hr class="custom-hr">
            <h2>jQuery Plugin Options</h2>
            <p>To open a modal using a <code class="markup">href</code> or <code class="markup">data-target</code>.</p>
            <div class="card margin-top-20">
                <div class="card__header ">
                    <h5 class="card__header__title uppercase">Learn to cook</h5>
                </div>
                <div class="card__container">
                    <div id="view-html" class="code">                  
                        <pre class="brush: xml; toolbar: false; gutter: false;">
                            &lt;!-- Default Modal already styles and effects but you can alter some of them -->
                            $('.modal').callModal({
                            backgroundColor : '#000',     
                            opacityOverlay  : 0.6, 
                            transitionStyle : true,
                            keyboard        : true,
                            durationIn      : 0.477,
                            durationOut     : 0.177
                        });
                    </pre>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="openModal" class="modal">
    <div class="modal__dialog">
        <div class="modal__head">
            <h2 class="modal__title">Modal Header</h2>
            <p>Press key <strong>ESC</strong></p>
        </div>
        <div class="modal__content">
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </div>
        <div class="modal__footer">
            <button class="modal-close color-white button-small pull-right">Disagree</button>
            <button class="background-pink color-white button-small pull-right">Agree</button>
        </div>
    </div>
</div>
</div>


