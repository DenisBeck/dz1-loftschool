
$(document).ready(function() {

	function setPercents(total, current) {
		var percent = Math.ceil(current/total*100);
		$('.counter').text(percent + '%')
		if(percent >= 100) 
			$('.main').add('.container').add('.footer-welcome').css('display', 'block');
			
			spinner.fadeOut();
			preload.delay(350).fadeOut('slow');

	}

	//Прелоадер
	var preload	= $('.page-preloader'),
		spinner	= preload.find('.spinner'),
		imgs	= [];
		

	
	$('*').each(function() {

		var $this	= $(this),
			img 	= $this.is('img'),
			bgImg	= $this.css('background-image');

		if (img) {
			var path = $this.attr('src');
			if(path)
				imgs.push(path);
		}
		if(bgImg != 'none') {
			var path = bgImg.slice(5, -2);
			imgs.push(path);
		}
	})
	
	var percents = 1;
	for(var i = 0; i < imgs.length; i++) {
		var image = $('<img>', {
			attr: {
				src: imgs[i]
			}
		})
		image.on('load', function() {
			setPercents(imgs.length, percents);
			percents++;
		})
	}

	
	

	//фиксация бокового меню в блоге при скроллинге
	$(window).on('scroll', function() {
		var $this = $(this),
			aside = $('.sidebar');

		if (aside.length) {
			if (($this.scrollTop() >= aside.next().offset().top) && (document.body.clientWidth > 1184)) {
				aside.addClass('sidebar_fixed');
			}
			else {
				aside.removeClass('sidebar_fixed');
			}
		}	
		
	})


	//появление блока авторизации
	var	login		= $('.autorize__text'),
		welcome		= login.closest('.autorize-wrap').next(),
		back		= welcome.find('.welcome-page');

	login.on('click', function(e) {
		e.preventDefault();

		var $this = $(this)

		$this.closest('.autorize').addClass('flipped');
		welcome.find('.welcome-block')
				.removeClass('flip-show')
				.addClass('flip-hide')
				.parent().css('z-index', 0);
		
		welcome.find('.autorize-block')
				.addClass('flip-show')
				.parent().css('z-index', 1);
		
	})

	back.on('click', function(e) {
		e.preventDefault();

		var $this = $(this)

		login.closest('.autorize').removeClass('flipped')
		welcome.find('.autorize-block')
				.removeClass('flip-show')
				.addClass('flip-hide')
				.parent().css('z-index', 0);
		
		welcome.find('.welcome-block')
				.removeClass('flip-hide')
				.addClass('flip-show')
				.parent().css('z-index', 1);

	})

	//меню из гамбургера
	$('.main-menu__close').on('click', function(e) {
		e.preventDefault();

		var $this = $(this);

		$this.toggleClass('main-menu__close_change');
		
		if($this.next().hasClass('hidden')) {
			$this.next().removeClass('hidden');
			$this.next().find('.main-menu__open-left').stop().animate({
				'right': '50%'
			}, 500);
			$this.next().find('.main-menu__open-right').stop().animate({
				'left': '50%'
			}, 500, function() {
				$(this).siblings('.main-menu__text').stop().animate({
					'opacity': '1'
				}, 200)
			});
		} else {
			$this.next().find('.main-menu__text').stop().animate({
				'opacity': '0'
			}, 200, function() {
				$(this).siblings('.main-menu__open-left').stop().animate({
					'right': '100%'
				}, 500);
				$(this).siblings('.main-menu__open-right').stop().animate({
					'left': '100%'
				}, 500, function() {
					$this.next().addClass('hidden');
				});
			})
		}
	})




	//Навигация по блогам
	$('.sidebar').find('.sidebar__link').on('click', function(e) {
		e.preventDefault();

		var $this = $(this),
			article = $this.closest('.blogs').find('.article').filter($this.attr('href'));

		
		
		$(document.body).animate({
			scrollTop: article.offset().top
		});

	})


	$(window).on('scroll', function() {

		var $this = $(this)
			articles = [];

		$('.content').find('.article').each(function() {
			articles.push($(this));
		});

		for(var i = 0; i < articles.length; i++) {
			if(($this.scrollTop() >= articles[i].offset().top)) {
				articles[i].closest('.blogs').find('.sidebar__item_active').removeClass('sidebar__item_active');
				articles[i].closest('.blogs').find('.sidebar__link[href="#' + articles[i].attr('id') + '"]').closest('.sidebar__item').addClass('sidebar__item_active');
			}
		}
		if($(document.body).find('#blog').length) {
			if(document.body.scrollHeight === document.body.scrollTop + document.body.offsetHeight) {
				articles[articles.length - 1].closest('.blogs').find('.sidebar__item_active').removeClass('sidebar__item_active');
				articles[articles.length - 1].closest('.blogs').find('.sidebar__link[href="#' + articles[articles.length - 1].attr('id') + '"]').closest('.sidebar__item').addClass('sidebar__item_active');
			}
		}	
	})



	//открывающееся меню в блоге при нажатии на зеленую папку
	$('.green-folder__link').on('click', function(e){
		e.preventDefault();

		var $this = $(this),
			folder= $this.parent(),
			sidebar = folder.siblings('.blogs').find('.sidebar');

		
		if(sidebar.css('left') === '-280px') {
			folder.animate({
				marginLeft: '280px'
			})
			sidebar.animate({
				left: '0'
			});
		}
		else {
			folder.animate({
				marginLeft: '0'
			})
			sidebar.animate({
				left: '-280px'
			}, function () {
				$(this).removeAttr('style')
			});
		}	
			
	})


	//плавное перемещение по странице
	var arrow		= $('#main-header').find('.arrow__link'),
		arrowUp		= $('.arrow__block_up').find('.arrow__link_up');

	arrow.on('click', function(e) {
		e.preventDefault();

		var transformDown = $(arrow.attr('href'));

		$(document.body).stop().animate({
			scrollTop: transformDown.offset().top
		}, 500)
	})
	arrowUp.on('click', function(e) {
		e.preventDefault();

		var transformUp = $($(this).attr('href'));

		$(document.body).stop().animate({
			scrollTop: transformUp.offset().top
		}, 500)
	})

	//работа с формой
	var check 		= $('.autorize-block__check'),
		checkAgain	= $('.autorize-block__check-again');

	check.on('click', function() {
		var $this = $(this)

		if($this.find('input[type="checkbox"]').is(':checked')){
			$this.addClass('check-show');
		}
		else{
			$this.removeClass('check-show');
		}
	})
	checkAgain.on('click', function() {
		var $this = $(this)

		if($this.find('input[value="no"]').is(':checked')) {
			$('.autorize-block__choice2').addClass('show');
			$('.autorize-block__choice1').removeClass('show');
		} else if($this.find('input[value="yes"]').is(':checked')){
			$('.autorize-block__choice2').removeClass('show');
			$('.autorize-block__choice1').addClass('show');
		}
	})
	

	//слайдер
	var next	= $('.navigation-part__next').find('.navigation-part__arrow'),
		prev 	= $('.navigation-part__prev').find('.navigation-part__arrow'),
		counter	= 0;
		

	next.on('click', function() {


		
		var $this = $(this),
			block 				= $this.closest('.myWorks'),
			descrItems 			= block.find('.description-part__item'),
			activeDescrItem 	= block.find('.description-part__item_active'),
			visionItems			= block.find('.vision-part__item'),
			activeVisionItem	= block.find('.vision-part__item_active'),
			navNextItems		= block.find('.navigation-part__next').find('.navigation-part__item'),
			activeNavNextItem	= block.find('.navigation-part__next').find('.navigation-part__item_active'),
			navPrevItems		= block.find('.navigation-part__prev').find('.navigation-part__item'),
			activeNavPrevItem	= block.find('.navigation-part__prev').find('.navigation-part__item_active');

		if($this.is('.going')) {
			return false;
		};

		counter++;
		if(counter >= descrItems.length) {
			counter = 0;
		}

		var	nextDescrItem 	= descrItems.eq(counter),
			nextVisionItem	= visionItems.eq(counter),
			nextNavNextItem	= navNextItems.eq(counter + 1),
			nextNavPrevItem	= navPrevItems.eq(counter - 1);

		if(counter >= descrItems.length - 1) {
			nextNavNextItem	= navNextItems.eq(0)
		}		

		$this.addClass('going')

		activeNavNextItem.animate({
			'top': '-50%'
		}, 300);
		nextNavNextItem.animate({
			'top': '50%'
		}, 300, function() {
			activeNavNextItem.removeClass('navigation-part__item_active')
							.css('top', '150%');
			$(this).addClass('navigation-part__item_active');
		})

		activeNavPrevItem.animate({
			'top': '150%'
		}, 300);
		nextNavPrevItem.animate({
			'top': '50%'
		}, 300, function() {
			activeNavPrevItem.removeClass('navigation-part__item_active')
							.css('top', '-50%');
			$(this).addClass('navigation-part__item_active');
		})

		activeVisionItem.animate({
			'opacity': '0'
		}, 300);
		nextVisionItem.animate({
			'opacity': '1'
		}, 300, function() {
			activeVisionItem.removeClass('vision-part__item_active');
			$(this).addClass('vision-part__item_active');
		})

		activeDescrItem.animate({
			'left': '-50%'
		}, 300);
		nextDescrItem.animate({
			'left': '50%'
		}, 300, function() {
			activeDescrItem.removeClass('description-part__item_active')
							.css('left', '150%');
			$(this).addClass('description-part__item_active');
			$this.removeClass('going');
		})


	})

	prev.on('click', function() {
		
		var $this 				= $(this),
			block 				= $this.closest('.myWorks'),
			descrItems 			= block.find('.description-part__item'),
			activeDescrItem 	= block.find('.description-part__item_active'),
			visionItems			= block.find('.vision-part__item'),
			activeVisionItem	= block.find('.vision-part__item_active'),
			navNextItems		= block.find('.navigation-part__next').find('.navigation-part__item'),
			activeNavNextItem	= block.find('.navigation-part__next').find('.navigation-part__item_active'),
			navPrevItems		= block.find('.navigation-part__prev').find('.navigation-part__item'),
			activeNavPrevItem	= block.find('.navigation-part__prev').find('.navigation-part__item_active');
			
		if($this.is('.going')) {
			return false;
		};

		counter--;
		if(counter < 0) {
			counter = descrItems.length - 1;
		}

		var	prevDescrItem 	= descrItems.eq(counter),
			prevVisionItem	= visionItems.eq(counter),
			prevNavNextItem	= navNextItems.eq(counter + 1),
			prevNavPrevItem	= navPrevItems.eq(counter - 1);

		if(counter >= descrItems.length - 1) {
			prevNavNextItem	= navNextItems.eq(0);
		}

		$this.addClass('going')

		activeNavNextItem.animate({
			'top': '-50%'
		}, 300);
		prevNavNextItem.animate({
			'top': '50%'
		}, 300, function() {
			activeNavNextItem.removeClass('navigation-part__item_active')
							.css('top', '150%');
			$(this).addClass('navigation-part__item_active');
		})

		activeNavPrevItem.animate({
			'top': '150%'
		}, 300);
		prevNavPrevItem.animate({
			'top': '50%'
		}, 300, function() {
			activeNavPrevItem.removeClass('navigation-part__item_active')
							.css('top', '-50%');
			$(this).addClass('navigation-part__item_active');
		})

		activeVisionItem.animate({
			'opacity': '0'
		}, 300);
		prevVisionItem.animate({
			'opacity': '1'
		}, 300, function() {
			activeVisionItem.removeClass('vision-part__item_active');
			$(this).addClass('vision-part__item_active');
		})

		activeDescrItem.animate({
			'left': '-50%'
		}, 300);
		prevDescrItem.animate({
			'left': '50%'
		}, 300, function() {
			activeDescrItem.removeClass('description-part__item_active')
							.css('left', '150%');
			$(this).addClass('description-part__item_active');
			$this.removeClass('going');
		})

	})

	//Переключение вкладок на панели администрирования
	$('.main-tabs__link').on('click', function(e) {
		e.preventDefault();

		var $this = $(this),
			tabItem = $($this.attr('href'));

		$this.addClass('main-tabs__link_active').parent().siblings().find('.main-tabs__link').removeClass('main-tabs__link_active')
		if(!tabItem.is('.tab-content__item_active')) {
			tabItem.addClass('tab-content__item_active').siblings().removeClass('tab-content__item_active');
		}

	})

	
	//авторизация
	$('.autorize-block__form').find('input[name="in"]').on('click', function(e) {
		e.preventDefault();

		var $this 		= $(this),
			container	= $this.closest('.main-welcome'),
			authBlock 	= $this.closest('.autorize-block'),
			authButton	= authBlock.closest('.welcome-content').siblings('.autorize-wrap').find('.autorize'),
			login 		= authBlock.find('[name="login"]'),
			password 	= authBlock.find('[name="password"]'),
			isHuman 	= authBlock.find('[name="checking"]'),
			human 		= authBlock.find('[name="robot"]:checked'),

			popup 		= $('.admin-popup'),
			resText 	= popup.find('.admin-popup__text'),
			resButton 	= popup.find('.admin-popup__button');

		var data = {
			login: login.val(),
			password: password.val(),
			isHuman: isHuman.is(':checked'),
			human: human.val()
		}

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/auth');
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8')
		xhr.send(JSON.stringify(data));

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;

			if(xhr.status != 200) {
				container.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.status + ': ' + xhr.statusText);
			} else {
				container.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.responseText);
			}

		}

		resButton.on('click', function() {
			$(location).attr('href',"index.html")
		})
	})

	//деавторизация
	$('.autorize-block').find('input[name="out"]').on('click', function(e) {
		e.preventDefault();

		var $this 		= $(this),
			container	= $this.closest('.main-welcome'),
			
			popup 		= $('.admin-popup'),
			resText 	= popup.find('.admin-popup__text'),
			resButton 	= popup.find('.admin-popup__button');

		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/logout');
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8')
		xhr.send();

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;

			if(xhr.status != 200) {
				container.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.status + ': ' + xhr.statusText);
			} else {
				container.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.responseText);
			}

		}

		resButton.on('click', function() {
			$(location).attr('href',"index.html")
		})

	})

	//Добавление записей в блог
	$('.form-blog').find('.tab-content-form__button').on('click', function(e) {

		var $this 		= $(this),
			form 		= $this.closest('.form-blog')
			titlePost	= form.find('[name="title"]'),
			datePost	= form.find('[name="date"]'),
			notePost	= form.find('[name="note"]'),
			tabContent 	= form.closest('.tab-content'),
			tabMenu 	= tabContent.siblings('.main-tabs'),

			popup 		= $('.admin-popup'),
			resText 	= popup.find('.admin-popup__text'),
			resButton 	= popup.find('.admin-popup__button');

		e.preventDefault();

		var data = {
			title: titlePost.val(),
			date: datePost.val(),
			note: notePost.val()
		}
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/savePost');
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8')
		xhr.send(JSON.stringify(data));

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;

			if(xhr.status != 200) {
				tabContent.fadeOut(300);
				tabMenu.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.status + ': ' + xhr.statusText);
			} else {
				tabContent.fadeOut(300);
				tabMenu.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.responseText);
			}

		}
		
		resButton.on('click', function() {
			tabContent.fadeIn(300);
			tabMenu.fadeIn(300);
			popup.fadeOut(300);
			titlePost.val('');
			datePost.val('');
			notePost.val('');
		})
	})

	var fileSrc = "";
	//Отображение имени загружаемого файла
	$('.form-works').find('[type="file"]').on('change', function() {
		var $this = $(this);
		if($this.val()) {
			fileSrc = '/img/' + $this.val().slice($this.val().lastIndexOf('\\') + 1);
			$this.siblings('span').text(fileSrc);
		}
	})
	,
	//Добавление работы на сайт
	$('.form-works').find('.tab-content-form__button').on('click', function(e) {

		var $this 		= $(this),
			form 		= $this.closest('.form-works'),
			projectWork	= form.find('[name="project"]'),
			techWork	= form.find('[name="tech"]'),
			fileWork	= form.find('[name="file"]'),
			urlWork		= form.find('[name="url"]'),
			tabContent 	= form.closest('.tab-content'),
			tabMenu 	= tabContent.siblings('.main-tabs'),

			popup 		= $('.admin-popup'),
			resText 	= popup.find('.admin-popup__text'),
			resButton 	= popup.find('.admin-popup__button');

		e.preventDefault();
		
		
		var data = {
			project: projectWork.val(),
			tech: techWork.val().split(','),
			url: urlWork.val(),
			file: fileSrc
		}

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/saveWork');
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
		xhr.send(JSON.stringify(data));

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;

			if(xhr.status != 200) {
				tabContent.fadeOut(300);
				tabMenu.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.status + ': ' + xhr.statusText);
			} else {
				tabContent.fadeOut(300);
				tabMenu.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.responseText);
			}

		}
		
		resButton.on('click', function() {
			tabContent.fadeIn(300);
			tabMenu.fadeIn(300);
			popup.fadeOut(300);
			projectWork.val('');
			techWork.val('');
			urlWork.val('');
			fileWork.siblings('span').text('загрузить картинку');
		})
	})

	//Изменение информации о навыках
	$('.form-about').find('.tab-content-form__button').on('click', function(e) {

		var $this 		= $(this),
			form 		= $this.closest('.form-about'),
			htmlSkill	= parseInt(form.find('[name="html"]').val()),
			cssSkill	= parseInt(form.find('[name="css"]').val()),
			jsSkill		= parseInt(form.find('[name="js"]').val()),
			phpSkill	= parseInt(form.find('[name="php"]').val()),
			mysqlSkill	= parseInt(form.find('[name="mysql"]').val()),
			nodeSkill	= parseInt(form.find('[name="node"]').val()),
			mongoSkill	= parseInt(form.find('[name="mongo"]').val()),
			gitSkill	= parseInt(form.find('[name="git"]').val()),
			gulpSkill	= parseInt(form.find('[name="gulp"]').val()),
			bowerSkill	= parseInt(form.find('[name="bower"]').val()),
			tabContent 	= form.closest('.tab-content'),
			tabMenu 	= tabContent.siblings('.main-tabs'),

			popup 		= $('.admin-popup'),
			resText 	= popup.find('.admin-popup__text'),
			resButton 	= popup.find('.admin-popup__button');

		e.preventDefault();

		var data = { 
			Frontend: [
				{ 
					id: "html",
					tech: "HTML5", 
					sector: 282 - (htmlSkill * 2.82),
					value: htmlSkill
				}, 
				{ 
					id: "css",
					tech: "CSS3", 
					sector: 282 - (cssSkill * 2.82),
					value: 	cssSkill
				}, 
				{ 
					id: "js",
					tech: "JavaScript & jQuery", 
					sector: 282 - (jsSkill * 2.82),
					value: jsSkill
				}
			],
			Backend: [
				{ 
					id: "php",
					tech: "PHP", 
					sector: 282 - (phpSkill * 2.82),
					value: phpSkill
				}, 
				{ 
					id: "mysql",
					tech: "MySQL", 
					sector: 282 - (mysqlSkill * 2.82),
					value: mysqlSkill
				}, 
				{ 
					id: "node",
					tech: "Node.js & npm", 
					sector: 282 - (nodeSkill * 2.82),
					value: nodeSkill
				}, 
				{ 
					id: "mongo",
					tech: "Mongo.db", 
					sector: 282 - (mongoSkill * 2.82),
					value: mongoSkill
				}
			], 
			Workflow: [
				{ 
					id: "git",
					tech: "Git", 
					sector: 282 - (gitSkill * 2.82),
					value: gitSkill
				}, 
				{ 
					id: "gulp",
					tech: "Gulp", 
					sector: 282 - (gulpSkill * 2.82),
					value: gulpSkill
				}, 
				{ 	
					id: "bower",
					tech: "Bower", 
					sector: 282 - (bowerSkill * 2.82),
					value: bowerSkill
				}
			] 
		}
			
			
		
		

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/saveSkill');
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8')
		xhr.send(JSON.stringify(data));

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;

			if(xhr.status != 200) {
				tabContent.fadeOut(300);
				tabMenu.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.status + ': ' + xhr.statusText);
			} else {
				tabContent.fadeOut(300);
				tabMenu.fadeOut(300);
				popup.fadeIn(300);
				resText.text(xhr.responseText);
			}

		}
		
		resButton.on('click', function() {
			tabContent.fadeIn(300);
			tabMenu.fadeIn(300);
			popup.fadeOut(300)
		})
	})

})


 






