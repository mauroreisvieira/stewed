<div class="css-components">
	<div class="container">
		<div class="row-space">
			<div class="large-12 medium-12 small-12">
				<nav class="navigation">
					<ul class="navigation__horizontal">
						<li>
							<a href="<?= $base_url . $lang . '/' . $page; ?>/accordion" class="<?= $subpage === 'accordion' || $subpage == null ? 'active' : ''; ?>">
								<?= menu_javascript_accordion; ?>
							</a>
						</li>
						<li>
							<a href="<?= $base_url . $lang . '/' . $page; ?>/dialog" class="<?= $subpage === 'dialog' ? 'active' : ''; ?>">
								<?= menu_javascript_dialog; ?>
							</a>
						</li>
							<li>
							<a href="<?= $base_url . $lang . '/' . $page; ?>/dropdown" class="<?= $subpage === 'dropdown' ? 'active' : ''; ?>">
								<?= menu_javascript_dropdown; ?>
							</a>
						</li>
							<li>
							<a href="<?= $base_url . $lang . '/' . $page; ?>/modal" class="<?= $subpage === 'modal' ? 'active' : ''; ?>">
								<?= menu_javascript_modal; ?>
							</a>
						</li>
							<li>
							<a href="<?= $base_url . $lang . '/' . $page; ?>/tabs" class="<?= $subpage === 'tabs' ? 'active' : ''; ?>">
								<?= menu_javascript_tabs; ?>
							</a>
						</li>
							<li>
							<a href="<?= $base_url . $lang . '/' . $page; ?>/tooltips" class="<?= $subpage === 'tooltips' ? 'active' : ''; ?>">
								<?= menu_javascript_tooltips; ?>
							</a>
						</li>
							<li>
							<a href="<?= $base_url . $lang . '/' . $page; ?>/sidenav" class="<?= $subpage === 'sidenav' ? 'active' : ''; ?>">
								<?= menu_javascript_sidenav; ?>
							</a>
						</li>
					</ul> 
				</nav>
			</div>
		</div>
	</div>
</div>

<?php
if (! is_null($subpage) ){ 
	include ("views/$page/$subpage.php"); 
} else {
	include ("views/$page/badges.php"); 
}
?>