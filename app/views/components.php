<div class="css-components">
	<div class="container">
		<div class="row-space">
			<div class="large-12 medium-12 small-12">
				<nav class="navigation">
					<ul class="navigation__horizontal">
						<li>
							<a href="<?= $base_url . '/' . $lang . '/' . $page; ?>/badges" class="<?= $subpage === 'badges' || $subpage == null ? 'active' : ''; ?>">
								<?= menu_components_badges; ?>
							</a>
						</li>
						<li>
							<a href="<?= $base_url . '/' . $lang . '/' . $page; ?>/buttons" class="<?= $subpage === 'buttons' ? 'active' : ''; ?>">
								<?= menu_components_buttons; ?>
							</a>
						</li>
						<li>
							<a href="<?= $base_url . '/' . $lang . '/' . $page; ?>/breadcrumbs" class="<?= $subpage === 'breadcrumbs' ? 'active' : ''; ?>">
								<?= menu_components_breadcrumbs; ?>
							</a>
						</li>
						<li>
							<a href="<?= $base_url . '/' . $lang . '/' . $page; ?>/cards" class="<?= $subpage === 'cards' ? 'active' : ''; ?>">
								<?= menu_components_cards; ?>
							</a>
						</li>
						<li>
							<a href="<?= $base_url . '/' . $lang . '/' . $page; ?>/forms" class="<?= $subpage === 'forms' ? 'active' : ''; ?>">
								<?= menu_components_forms; ?>
							</a>
						</li>
						<li>
							<a href="<?= $base_url . '/' . $lang . '/' . $page; ?>/grid" class="<?= $subpage === 'grid' ? 'active' : ''; ?>">
								<?= menu_components_grid; ?>
							</a>
						</li>
						<li>
							<a href="<?= $base_url . '/' . $lang . '/' . $page; ?>/navigation" class="<?= $subpage === 'navigation' ? 'active' : ''; ?>">
								<?= menu_components_navigation; ?>
							</a>
						</li>
						<li>
							<a href="<?= $base_url . '/' . $lang . '/' . $page; ?>/pagination" class="<?= $subpage === 'pagination' ? 'active' : ''; ?>">
							<?= menu_components_pagination; ?>
							</a>
						</li>
						<li>
							<a href="<?= $base_url . '/' . $lang . '/' . $page; ?>/tables" class="<?= $subpage === 'tables' ? 'active' : ''; ?>">
								<?= menu_components_tables; ?>
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