<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?php
use Bitrix\Main\Page\Asset;
use Bitrix\Main\Applications;
?>
<!DOCTYPE html>
<html lang="ru">

<head>
	<script>
		var page_id = 2, //сюда можно подставлять ID страницы 
			is_registered =
			1; //это тестовый флаг - по его наличию проверяется авторизованный пользователь или нет, чтобы показывать те или иные формы
	</script>
	<title><?php $APPLICATION->ShowTitle(); ?></title>

	<?php
		$APPLICATION->ShowHead();
		Asset::getInstance()->addCss(DEFAULT_TEMPLATE_PATH . "/assets/libs/bootstrap/css/bootstrap.css");
		Asset::getInstance()->addCss(DEFAULT_TEMPLATE_PATH . "/assets/libs/fancybox/jquery.fancybox.css");
		Asset::getInstance()->addCss(DEFAULT_TEMPLATE_PATH . "/assets/libs/fancybox/jquery.easing-1.3.pack.js");
		Asset::getInstance()->addCss(DEFAULT_TEMPLATE_PATH . "/assets/libs/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.css");
		Asset::getInstance()->addCss(DEFAULT_TEMPLATE_PATH . "/assets/css/theme.css");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/jquery-1.11.3.min.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/additionaljs.js");
		Asset::getInstance()->addString('<meta name=viewport content="width=device-width,initial-scale=1">');
		Asset::getInstance()->addString('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');

		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/jquery-migrate.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/libs/fancybox/jquery.fancybox.pack.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/libs/fancybox/jquery.mousewheel-3.0.4.pack.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/libs/bootstrap/js/bootstrap.min.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/jquery.scrollTo-min.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/jquery.form.min.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/jquery.validate.min.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/libs/bootstrap-select-master/js/bootstrap-select.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/moment.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/libs/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/additional-methods.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/jquery.metadata.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/libs/tablesorter-master/jquery.tablesorter.min.js");
		Asset::getInstance()->addJs(DEFAULT_TEMPLATE_PATH . "/assets/js/theme.js");

  ?>
</head>

<body>
	<div id="panel">
		<?$APPLICATION->ShowPanel();?>
	</div>
	<header>
		<div class="menu_container">
			<div class="container">
				<nav class="navbar navbar-default">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span class="sr-only">Свернуть меню</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand logo" href="/">
							<img src="<?=DEFAULT_TEMPLATE_PATH?>/assets/images/logo.png" alt=''>
							Портал поддержки
						</a>
					</div>
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<?$APPLICATION->IncludeComponent(
						"bitrix:menu",
						"menu",
						Array(
							"ALLOW_MULTI_SELECT" => "N",
							"CHILD_MENU_TYPE" => "left",
							"DELAY" => "N",
							"MAX_LEVEL" => "1",
							"MENU_CACHE_GET_VARS" => array(""),
							"MENU_CACHE_TIME" => "3600",
							"MENU_CACHE_TYPE" => "N",
							"MENU_CACHE_USE_GROUPS" => "Y",
							"ROOT_MENU_TYPE" => "main",
							"USE_EXT" => "N"
						)
						);?>

						<?$APPLICATION->IncludeComponent("bitrix:search.form","search",Array(
							"USE_SUGGEST" => "N",
							"PAGE" => "/"
    						)
							);?> 
				      <a class='menu-search js-showsearch navbar-right' href='#'>
				      	<span class='unicon unicon-search'></span>
							</a>
							<ul class="nav navbar-nav navbar-right nomargin-left">
				      		<li class="dropdown login-form">
					          <a href="#" class="auth loggedin" data-toggle="dropdown">
					          	<span>
						          	<div class='avatar'>
						          		<img class='img-circle' src='<?=DEFAULT_TEMPLATE_PATH?>/assets/images/avatar.jpg'>
						          	</div>
						          	<div class='nickname'>
						          		<i class=" hidden-sm hidden-md">Константинов Константин</i>
						          	</div>
					          	</span>
					          	<span class="caret"></span>
					          </a>
					          <ul class="dropdown-menu loggedin-menu">
					            <li><a href="/moi-obrashcheniya/">Мои обращения</a></li>
					            <li><a class='js-logout' href="#">Выйти</a></li>
					          </ul>
				        	</li>
				      </ul>
					</div>
				</nav>
			</div>
		</div>
		</header>
<div class="container">
<main>
<ol class="breadcrumb js-breadcrumbs"></ol>
			<div class="separator separator-gray"></div>
			<div class='row'>
			<div class='col-lg-14'>
				<div id='js-help-result'></div>

	