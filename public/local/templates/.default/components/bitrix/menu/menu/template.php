<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die(); ?>

<?php if (empty($arResult['ALL_ITEMS'])) return; ?>

<ul class="nav navbar-nav">
	<?php foreach ($arResult['ALL_ITEMS'] as $arItem): ?>
		<?php if ($arItem['SELECTED']): ?>
		<li class="active"><a href="<?=$arItem['LINK'];?>"><?=$arItem['TEXT']; ?></a></li>
			<?php else: ?>
		<li><a href="<?=$arItem['LINK'];?>"><?=$arItem['TEXT']; ?></a></li>
		<?php endif; ?>
	<?php endforeach; ?>
</ul>