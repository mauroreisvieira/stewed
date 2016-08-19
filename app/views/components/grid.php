<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stewed Framework Kit</title>
    <!-- Disable tap highlight on IE -->
    <meta name="msapplication-tap-highlight" content="no">
    <!-- Web Application Manifest -->
    <link rel="manifest" href="manifest.json">
    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="Web Starter Kit">
    <link rel="icon" sizes="192x192" href="images/touch/chrome-touch-icon-192x192.png">
    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Web Starter Kit">
    <link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png">
    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
    <meta name="msapplication-TileColor" content="#2F3BA2">
    <!-- Stewed Kit -->
    <link rel="stylesheet" href="styles/stewed.css">
    <!-- My Styles -->
    <link rel="stylesheet" href="styles/elegant.css">
    <link rel="stylesheet" href="styles/syntaxhighlighter.css">
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>

    <header class="header">
        <div class="container">
            <div class="row-space">
                <div class="large-3 medium-3 small-12">
                    <div class="logo">
                        <img src="images/logo/stewed_white.png" alt="Stewed" title="Stewed">
                    </div>
                </div>
                <div class="large-9 medium-9 small-12">
                    <nav class="navigation pull-right margin-top-20">
                        <ul class="navigation__horizontal">
                            <li><a href="index.html">Get Started</a></li> 
                            <li><a href="helpers.html">CSS Helpers</a></li>
                            <li><a href="components.html" class="active">CSS Components</a></li>
                            <li><a href="modal.html">JavaScript</a></li>
                        </ul> 
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <section id="main">
        <div class="content">
            <div class="header-description margin-bottom-40">
                <div class="container">
                    <div class="master-header">
                        <h1>Column Grid Row</h1>
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
                    <div class="large-9 medium-7 small-4 column">large-7 medium-7 small-4</div>
                    <div class="large-3 medium-3 small-6 column">large-5 medium-3 small-4</div>
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
                                        &lt;div class="large-4 medium-4 small-4">4&lt;/div>
                                        &lt;div class="large-4 medium-4 small-4">4&lt;/div>
                                        &lt;div class="large-4 medium-4 small-4">4&lt;/div>
                                        &lt;/div>

                                        &lt;div class="row">
                                        &lt;div class="large-4 medium-4 small-4">4&lt;/div>
                                        &lt;div class="large-8 medium-8 small-8">8&lt;/div>
                                        &lt;/div>

                                        &lt;div class="row">
                                        &lt;div class="large-6 medium-6 small-6">6&lt;/div>
                                        &lt;div class="large-6 medium-6 small-6">6&lt;/div>
                                        &lt;/div>

                                        &lt;div class="row">
                                        &lt;div class="large-12 medium-12 small-12">12&lt;/div>
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
                    <div class="large-5 medium-5 small-5 column">5</div>
                    <div class="large-7 medium-7 small-7 column">7</div>
                    <!-- LARGE 6 -->
                    <div class="large-6 medium-6 small-6 column">6</div>
                    <div class="large-6 medium-6 small-6 column">6</div>
                    <!-- LARGE 7 + 5 -->
                    <div class="large-7 medium-7 small-7 column">7</div>
                    <div class="large-5 medium-5 small-5 column">5</div>
                    <!-- LARGE 8 + 4 -->
                    <div class="large-8 medium-8 small-8 column">8</div>
                    <div class="large-4 medium-4 small-4 column">4</div>
                    <!-- LARGE 9 + 3 -->
                    <div class="large-9 medium-9 small-9 column">9</div>
                    <div class="large-3 medium-3 small-3 column">3</div>
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
                                        &lt;div class="large-4 medium-4 small-4">4&lt;/div>
                                        &lt;div class="large-4 medium-4 small-4">4&lt;/div>
                                        &lt;div class="large-4 medium-4 small-4">4&lt;/div>
                                        &lt;/div>

                                        &lt;div class="row-space">
                                        &lt;div class="large-4 column">4&lt;/div>
                                        &lt;div class="large-8 column">8&lt;/div>
                                        &lt;/div>

                                        &lt;div class="row-space">
                                        &lt;div class="large-6 column">6&lt;/div>
                                        &lt;div class="large-6 column">6&lt;/div>
                                        &lt;/div>

                                        &lt;div class="row-space">
                                        &lt;div class="large-12 column">12&lt;/div>
                                        &lt;/div>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="footer">
        <div class="container">
            <div class="row-space">
                <div class="large-12 medium-12 small-12">
                    <nav class="navigation pull-center">
                        <ul class="navigation__horizontal">
                            <li><a href="https://github.com/maurovieirareis/stewed" target="_bank">View Source on Github</a></li>
                            <li><a href="">Support</a></li>
                            <li><a href="">Changelog</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script type="text/javascript" src="js/jquery-2.0.2.min.js "></script>
    <!-- Syntax Highlighter -->
    <script type="text/javascript">
        $(function(){
            SyntaxHighlighter.all();
        });
    </script>
    <script type="text/javascript" src="js/shCore.js"></script>
    <script type="text/javascript" src="js/shBrushXml.js"></script>
    <script type="text/javascript" src="js/shBrushJScript.js"></script>

</body>
</html>
