<header class="header">
    <div class="container">
        <div class="row-space">
            <div class="large-3 medium-3 small-12">
                <div class="logo">
                    <img src="../images/logo/stewed_white.png" alt="Stewed" title="Stewed">
                </div>
            </div>
            <div class="large-9 medium-9 small-12">
                <nav class="navigation pull-right margin-top-20">
                    <ul class="navigation__horizontal">
                        <li>
                            <a href="/<?= $lang; ?>/home" class="<?= $page === 'home' ? 'active' : ''; ?>">
                                <?= header_navigation_started; ?>
                            </a> 
                        </li> 
                        <li>
                            <a href="/<?= $lang; ?>/helpers" class="<?= $page === 'helpers' ? 'active' : ''; ?>">
                                <?= header_navigation_helpers; ?>
                            </a>
                        </li>
                        <li>
                            <a href="/<?= $lang; ?>/components" class="<?= $page === 'components' ? 'active' : ''; ?>">
                                <?= header_navigation_components; ?>
                            </a>
                        </li>
                        <li>
                            <a href="/<?= $lang; ?>/javascript" class="<?= $page === 'javascript' ? 'active' : ''; ?>">
                                <?= header_navigation_javascript; ?>
                            </a>
                        </li>
                    </ul> 
                </nav>
            </div>
        </div>
    </div>
</header>