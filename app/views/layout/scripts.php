<!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-XXXXX-X', 'auto');
    ga('send', 'pageview');
</script>

<!-- Scripts -->
<script type="text/javascript" src="<?= $base_url; ?>/src/js/jquery-2.0.2.min.js"></script>
<script type="text/javascript" src="<?= $base_url; ?>/src/js/shCore.js"></script>
<script type="text/javascript" src="<?= $base_url; ?>/src/js/shBrushXml.js"></script>
<script type="text/javascript" src="<?= $base_url; ?>/src/js/shBrushJScript.js"></script>

<!-- Syntax Highlighter -->
<script type="text/javascript">
    $(function(){
        SyntaxHighlighter.all();
    });
</script>

<?php if ($page === 'javascript') : ?>
<script src="<?= $base_url; ?>/src/js/stewed.js"></script>
<?php endif; ?>