var ajax_url 		= "./data/"; // ссылка на скрипт. который будет возвращать данные. Данные описаны в readme в папке data

$.ajaxSetup({
	cache: false
});


$(function(){
	initSearchCollapse();
	
	//можно добавить проверку на id страницы, чтобы инициалищировать интерактивную систему базы знаний
	if(page_id=="2")
		initHelpSystem();

	initFancybox();	
	initContensScroll();
	initSupportSelectorSelect();
	initLogout();
	initLeftMenu();
	initResolveButtons();
	initContactButtons();
	customizeForms();
	initArticleHelpful();
	// initContacts();
	initTableSorter();
})


//сортировка таблиц
function initTableSorter(){
	$(".tablesorter").tablesorter(); 
	return;
}

//закладки на странице контактов
// function initContacts(){
// 	$(document).on("click", '.js-contacts', function(){
// 		var data 		= {};
// 		data.action 	= "contacts";
// 		data.id			= $(this).data('id');


// 		$(this).parents('.js-resolve-buttons').remove();
// 		$.ajax({
// 			url: ajax_url + "contacts_"+data.id+".json",
// 			dataType: "json",
// 			data: data,
// 			success: function(result){
// 				$('.js-contacts-result').html(result.contacts);
// 				$.scrollTo('.js-contacts-result', 1000);
// 			}, 
// 			error: function(result){
				
// 			}
// 		});

// 		return false;
// 	})
	
// }


//кастомизация всех форм на странице
function customizeForms(){
	$(document).on("click", '.bootstrap-select ul.dropdown-menu li', function(){
		$(this).parents('.bootstrap-select').next('label.error').remove();
	});

	initDatePicker();
	initCustomSelect();
	initFileChange();
}


//обработчики кликов на кнопки контакта с техподдержкой
function initContactButtons(){
	//написать сообщение
	$(document).on("click", '.js-writemessage', function(){
		openWriteMessageForm();
		return false;
	})
	//заказать обратный звонок
	$(document).on("click", '.js-callback', function(){
		openCallBackForm();
		return false;
	})
}

function openWriteMessageForm(){
	$.fancybox.open("<div id='form-request' class='row bg-white'><div class='col-lg-18 form-max-width'><h2>Заполните форму заявки</h2><form id='RequestForm' class='uniform' method='post' action='./'><input type='hidden' action='process_form'><div class='row'><div class='col-sm-9 '><input type='text' placeholder='Имя' class='form-control' name='Name' required></div><div class='col-sm-9 '><input type='text' placeholder='Фамилия' class='form-control' name='LastName' required></div><div class='col-sm-9 '><input title='Укажите ОИВ' type='text' placeholder='ОИВ' class='form-control' name='OIV' required></div><div class='col-sm-9 '><input title='Укажите должность' type='text' placeholder='Должность' class='form-control' name='Post' required></div><div class='col-sm-18'><textarea title='Укажите текст сообщения' placeholder='Текст сообщения' class='form-control' name='Message' required></textarea></div><div class='col-sm-18'><button class='btn btn-lg btn-primary' type='submit'>Отправить</button></div></div></form></div></div>");
	customizeForms();
	initRequestForm();
	return false;
}

function initWriteMessageForm(){
	var options = { 
	    url:        ajax_url+"writemessageform_success.json", 
	    dataType: 	"json",
	    success:    function(data) {
	        $.fancybox.open("<div class='form-window'><div class='icon text-center'><span class='unicon unicon-check'></span></div><h1>Ваше сообщение отправлено,</h1><h2>в ближайшее время мы с вами свяжемся</h2></div>");
	    } 
	}; 

	$("#WriteMessageForm").validate({
		submitHandler: function(form) {
			$('#WriteMessageForm').ajaxSubmit(options);
			$.fancybox.close();
			return false;
		}
	});
}

function openCallBackForm(){
	$.fancybox.open("<div class='form-window'><h1>Уважаемый пользователь,</h1><h2>Заполните форму и мы свяжемся с вами в ближайшее время</h2><div id='form-callback' class='row'><div class='col-lg-18 window-form'><form id='CallBackForm' class='uniform' method='post' action='./'><input type='hidden' action='process_writemessageform'><div class='row'><div class='col-sm-18'><input type='text' placeholder='Ваше имя' class='form-control' name='Name' required></div><div class='col-sm-18'><input type='text' placeholder='Номер телефона' class='form-control numeric' name='Phone'  ></div><div class='col-sm-18'><select name='System' class='js-select js-select' required  title='Выберите систему'><option value=''>Система</option><option>Параметр 1</option><option>Параметр 2</option><option>Параметр 3</option><option>Параметр 4</option></select></div><div class='col-sm-18'><select name='Theme' class='js-select js-select' required title='Выберите тему вопроса'><option value=''>Тема вопроса</option><option>Параметр 1</option><option>Параметр 2</option><option>Параметр 3</option><option>Параметр 4</option></select></div><div class='col-sm-18'><button class='btn btn-lg btn-primary btn-wide' type='submit'>Отправить</button></div></div></form></div></div></div>");

	customizeForms();
	initCallBackForm();
	return false;
}

function initCallBackForm(){
	var options = { 
	    url:        ajax_url+"callbackform_success.json", 
	    dataType: 	"json",
	    success:    function(data) {
	        $.fancybox.open("<div class='form-window'><div class='icon text-center'><span class='unicon unicon-check'></span></div><h1>Ваше сообщение отправлено,</h1><h2>в ближайшее время мы вам перезвоним</h2></div>");
	    } 
	}; 

	

	$("#CallBackForm").validate({
		onkeyup: function(element){
			$(element).valid();
		},
		submitHandler: function(form) {
			$('#CallBackForm').ajaxSubmit(options);
			$.fancybox.close();
			return false;
		},
		errorPlacement: function (error, element) {
		    if ($(element).is('select')) {
		        element.parent().after(error);
		    } else {
		        error.insertAfter(element);
		    }
		},
		rules: {
			"Name": {
			    required: true,
			    lettersonly_prevent: true
			},
			"Phone": {
			    required: true,
			    digitssonly_prevent: true
			},
		}
	});
}

//инициализация отправки формы при клике на Ваш вопрос решен / нет
function initResolveButtons(){
	$(document).on("click", '.js-resolve', function(){
		var data 		= {};
		data.action 	= "vote";
		data.value 		= $(this).data("value");
		data.system_id	= $(this).data('system');


		$(this).parents('.js-resolve-buttons').remove();
		$.ajax({
			url: ajax_url + "resolve_"+data.value+".json",
			dataType: "json",
			data: data,
			success: function(result){
				if(data.value == "1"){
			    	$.fancybox.open("<div class='form-window'><div class='icon text-center'><span class='unicon unicon-check'></span></div><h1>Рады помочь</h1></div>");
				} else {
					if(is_registered){
						$('.js-with_resolve_form').html(result.resolve_form);
						$.scrollTo('.js-with_resolve_form', 1000);
						initResolveForm();
					}
					else {
						openAuthWindow();
					}
				}
			}, 
			error: function(result){
				
			}
		})
		return false; 
	})
}

//инициализация левого раскрывающегося меню
function initLeftMenu(){
	$(document).on("click", '.js-menu-collapse', function(){
		$(this).toggleClass("menu-collapse-minus");
		$(this).parent().find('ul').eq(0).toggleClass('opened');
		return false; 
	})
}

// для инициализации плагина с календарем
function initDatePicker(){
	$('.js-datepicker').datetimepicker({
		// inline: true,
		format: "DD.MM.YYYY"
	});
}

// для стилизации инпут файл
function initFileChange(){
	$(document).on("change", '.js-file input[type=file]', function(){
		$(this).parents('.js-file').find('.js-file-caption').text($(this).val());
		return false;
	})

	$(document).on("change", '.js-file-multi input[type=file]', function(){
		$(this).parents('.js-file-multi').find('.js-file-multi-remove').remove(); 
		$(this).parents('.js-file-multi').find('.js-file-caption').text($(this).val());
		$(this).parents('.js-file-multi').append("<span class='js-file-multi-remove file-remove glyphicon glyphicon-remove text-red'></span>");
		

		if($(this).val()=="")
			$(this).parents('.js-file-multi').find('.js-file-multi-remove').remove(); 
		else if($(this).parents('.js-file-multi').parent().find('input:file').filter(function() { return $(this).val() == ""; }).length==0){
			addFileInput($(this).parents('.js-file-multi').parent());
		}



		return false;
	})

	$(document).on("click", '.js-file-multi-remove', function(){
		$(this).parents('.js-file-multi').remove();
		return false;
	})
}

function addFileInput(parent){
	var fileInput = "<label class='file-custom2 file-custom2-lg js-file-multi'><input type='file' name='file[]'><span class='file-custom2-button'>+</span><span class='file-custom2-caption js-file-caption'>Путь к файлу</span></label>";
	parent.append(fileInput);

	return;
}

function removeFileInput(what){

}

//при логине показывает форму спасибо, все дела
function initLogout(){
	$(document).on("click", '.js-logout', function(){
		$.fancybox.open("<div class='form-window'><div class='icon text-center'><span class='unicon unicon-check'></span></div><h1>Благодарим за использование ресурса.</h1><h2>Хорошего дня!</h2></div>");

		//таймер перезагрузки
		var tmo = setTimeout(function(){
			document.location.reload();
		}, 3000);

		return false;
	})
}

//обработка изменения селектора "Обратиться в техподдержку"
function initSupportSelectorSelect(){
	$(document).on("change", '#select_support', function(){
		$value = $(this).val();
		$('.tab-support .tab-pane').removeClass('active');
		$($value).addClass('active');
		return false;
	})
}

//кастомизация селектов
function initCustomSelect(){
	$('.js-select').selectpicker({
		dropupAuto: false,
		size: 4
	});

}

//обработка кликов на элементы и плавная прокрутка к указанному элементу
function initContensScroll(){
	$(document).on("click", '.js-contents a', function(){ //содержание статьи
		$.scrollTo($(this).attr("href"), 1000);
		return false;
	})
}

//отображение или скрытие поля для поиска в шапке
function initSearchCollapse(){
	$search = $('#search');
	$(document).on("click", '.js-showsearch', function(){
		// $search.fadeIn(100);
		$search.addClass('css-show');
		return false;
	})

	$(document).on("click", '.js-hidesearch', function(){
		// $search.fadeOut(100);
		// $search.
		$search.removeClass('css-show');
		return false;
	})
}


function getContactForms(data){
	data.action = "getContactForms";
	$.ajax({
		url: ajax_url + "form.json", // потом заменить
		dataType: "json",
		data: data,
		success: function(result){
			$('#js-help-result').html(result.request_form);
			$.scrollTo('#js-help-result', 1000);
			initRequestForm();
			customizeForms();
			// initCustomSelect();
			// initSupportSelectorSelect();
		}
	})
}

function initArticleHelpful(){
	$(document).on("click", '.js-helpful', function(){
		var data 		= {};
		data.action 	= "vote";
		data.value 		= $(this).data("value");
		data.article_id	= $(this).data('id');


		$(this).parents('.js-with_rating').find(".js-article-result, .js-article-buttons").html('');
		$.ajax({
			url: ajax_url + "article_helpful_"+data.value+".json",
			dataType: "json",
			data: data,
			success: function(result){
				if(data.value == "1"){
			    	$.fancybox.open("<div class='form-window'><div class='icon text-center'><span class='unicon unicon-check'></span></div><h1>Спасибо за оставленный отзыв,</h1><h2>Ваше мнение очень важно для нас</h2></div>");
				} else {
					if(is_registered){
						$('.js-with_request_form').html(result.request_form);
						$.scrollTo('.js-with_request_form', 1000);
						initRequestForm();
					}
					else {
						openAuthWindow();
					}
				}
			}, 
			error: function(result){
				
			}
		})
		return false; 
	})
}

//инициализация обработчиков клика на ИС или уточняющие вопросы
function initHelpSystem(){


	// initArticleHelpful();

	$(document).on("click", '.js-infosystem', function(){
		var data 		= {};
		data.system_id 	= $(this).data("id");
		data.parent_id 	= 0;
		data.level 		= 0;
		getHelpSystemAnswer(data);

		return false;
	})

	$(document).on("click", '.js-specify_button', function(){
		var data 		= {};
		data.system_id 	= $(this).data("system_id");
		data.parent_id 	= $(this).data("id");
		data.level 		= $(this).parents('.js-step').data("step");
		if(data.parent_id=="other"){
			if(is_registered)
				getContactForms(data);
			else
				openAuthWindow();
		}
		else
			getHelpSystemAnswer(data);
		return false;
	})

	

	//breadcrumbs
	$(document).on("click", '.js-breadcrumb', function(){
		var data 		= {};
		data.system_id 	= $(this).data("systemid");
		data.parent_id 	= $(this).data("parentid");
		data.level 		= $(this).data("level");
		getHelpSystemAnswer(data);
		return false;
	})
	
}


function openAuthWindow(){
	$.fancybox.open("<div class='form-window'><div class='text-center'><h1>Уважаемый пользователь,</h1><h3>Для направления обращения в СТП необходимо авторизоваться</h3><div class='buttons'><a href='https://login.mos.ru' class='btn btn-lg btn-primary'>Я житель Москвы</a><span class='text-separator'>или</span><a href='https://login.mos.ru' class='btn btn-lg btn-primary btn-primary-dark'>Я госслужащий</a></div></div>");
}


// data.parent_id 	// id уточняющего вопроса
// data.level 		// уровень вложенности уточняющего вопроса
// data.system_id 	// id информационной системы, к которой относится вопрос
function getHelpSystemAnswer(data){
	data.action = "getHelpSystemAnswer";
	//потом выставить нужный путь. пока будет тестовый
	var path = "system"+data.system_id+"_parent"+data.parent_id+".json"; // это путь тестовый. здесь должна быть ссылка на скрипт, который будет возвращать данные в формате JSON с результатом.
	
	$.ajax({
		url: ajax_url+path,
		dataType: "json",
		data: data,
		success: function(result){
			$('#infosystem-1').remove(); //hide()
			if(data.system_id==0 && data.parent_id==0){
				$html_result = "<div id='infosystem-1' class='row'><div class='col-sm-18'><h2><span class='unicon unicon-system'></span> Выберите информационную систему</h2></div><div class='col-sm-18'><div class='bg-white'>"+result.specify_questions+"<div class='separator separator-green'></div></div></div></div>";
				
				$('#js-help-result').html($html_result);
			} else if(result.specify_questions!=""){ //это уточняющие вопросы
				$html_result = "<div class='.infosystem-1' id='infosystem-1' class='row bg-white'><div class='col-sm-18'><h3>Уточните ваш вопрос</h3></div><div class='col-sm-18 steps'><div data-step='"+(result.level)+"' class='step js-step'>"+result.specify_questions+"</div></div><div class='separator separator-green'></div></div>";
				
				$('#js-help-result').html($html_result);
			} else if(result.article!=""){
				$html_result = "<div id='infosystem-3' class='row bg-white'><div class='col-sm-18'><h3>Это может вам помочь</h3><div>"+result.article+"</div></div></div>";
				
				$html_result += "<div class='js-with_request_form' id='with_request_form'></div>";

				if(result.popular_articles!="")
					$html_result += result.popular_articles;

				if(result.popular_forum!="")
					$html_result += result.popular_forum;

				if(result.support_block!="" && is_registered == "1")
					$html_result += result.support_block;
				

				
				
				$('#js-help-result').html($html_result);

				if(result.support_block!=""){
					initCustomSelect();
					initSupportSelectorSelect();
				}

			}
			$('.js-breadcrumbs').html(result.breadcrumbs)
			// $.scrollTo('#js-help-result', 1000); 
		}
	});
}

// инициализация fancybox 
function initFancybox(){
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		 helpers : {
			title: {
				tpl:'wrap',
				type: 'float',
				position: 'top'
			}
		}
	});
}

// инициализация формы связи с поддержкой
function initRequestForm(){
	var options = { 
	    // target:     '#divToUpdate', 
	    url:        ajax_url+"form_success.json", 
	    dataType: 	"json",
	    success:    function(data) {
	        $.fancybox.close();
	        $.fancybox.open("<div class='form-window'><div class='icon text-center'><span class='unicon unicon-check'></span></div><h1>Уважаемый пользователь,</h1><h2>Ваше обращение зарегистрировано под №"+data.request_id+"</h2><p>Информация о статусе работ по обращению Вам поступит на электронный адрес, указанный при регистрации на портале УниФорма.</p></div>");
	        $('#form-request').remove();
	    } 
	}; 

	$("#RequestForm").validate({
		onkeyup: function(element){
			$(element).valid();
		},
		submitHandler: function(form) {
			$('#RequestForm').ajaxSubmit(options);
			return false;
		},
		errorPlacement: function (error, element) {
		    if ($(element).is('select')) {
		        element.parent().after(error);
		    } else {
		        error.insertAfter(element);
		    }
		},
		rules: {
			"Name": {
			    required: true,
			    lettersonly_prevent: true, //
			},
			"LastName": {
			    required: true,
			    lettersonly_prevent: true
			}
		}
	});
}


// инициализация аякс отправки формы "Ваш вопрос решен?" и валидация
function initResolveForm(){
	var options = { 
	    // target:     '#divToUpdate', 
	    url:        ajax_url+"form_resolve_success.json", 
	    dataType: 	"json",
	    success:    function(data) {
	        $.fancybox.open("<div class='form-window'><div class='icon text-center'><span class='unicon unicon-check'></span></div><h1>Спасибо за отзыв,</h1><h2>мы обязательно учтем ваши пожелания</h2></div>");
	        $('#form-resolve').remove();
	    } 
	}; 

	$("#ResolveForm").validate({
		submitHandler: function(form) {
			$('#ResolveForm').ajaxSubmit(options);
			return false;
		}
	});
}

