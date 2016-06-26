
$(document).ready(function() {

	function setPercents(total, current) {
		var percent = Math.ceil(current/total*100);
		if(percent >= 100) 
			$('.main').css('display', 'block');
			$('.container').css('display', 'block');
			$('.footer-welcome').css('display', 'block');
		$('.counter').text(percent + '%')
	}

	var $this 		= $(this),
		aside		= $('.sidebar'),
		login		= $('.autorize__text'),
		welcome		= login.closest('.autorize-wrap').next(),
		menu		= $('.main-menu__close'),
		folder		= $('.green-folder__link'),
		sidebar 	= $('#content-table'),
		arrow		= $('#main-header').find('.arrow__link'),
		check 		= $('.autorize-block__check'),
		checkAgain	= $('.autorize-block__check-again'),
		preload		= $('.page-preloader'),
		spinner		= preload.find('.spinner'),
		imgs		= [];

	$('*').each(function() {
		var img 	= $(this).is('img'),
			bgImg	= $(this).css('background-image');

		if (img) {
			var path = $(this).attr('src');
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

	$(window).on('load', function () { 

		var	preload	= $('.page-preloader'),
			spinner	= preload.find('.spinner');

		spinner.fadeOut();
		preload.delay(350).fadeOut('slow');
	});
	
	

	//фиксация бокового меню в блоге при скроллинге
	$(window).on('scroll', function() {

		if (aside.length) {
			if (($(this).scrollTop() >= aside.next().offset().top) && (document.body.clientWidth > 1200)) {
				aside.addClass('sidebar_fixed');
			}
			else {
				aside.removeClass('sidebar_fixed');
			}
		}
			
		
	})
	aside.find('.sidebar__item').first().addClass('sidebar__item_active')


	//появление блока авторизации
	login.on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('autorize__text_active');
		welcome.find('.welcome-block-wrap').toggleClass('welcome-block-wrap_hide');
		welcome.find('.autorize-block-wrap').toggleClass('autorize-block-wrap_active');
	})


	//меню из гамбургера
	menu.on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('main-menu__close_change');
		$(this).next().toggleClass('hidden')
	})


	//открывающееся меню в блоге при нажатии на зеленую папку
	folder.on('click', function(e){
		e.preventDefault();

		$(this).parent().toggleClass('green-folder_open');
		sidebar.fadeToggle(0);
	})


	//плавное перемещение по странице
	arrow.on('click', function(e) {
		e.preventDefault();

		var transformDown = $(arrow.attr('href'))

		$(document.body).stop().animate({
			scrollTop: transformDown.offset().top
		}, 500)
	})

	//работа с формой
	check.on('click', function() {
		if($(this).find('input[type="checkbox"]').is(':checked'))
			$(this).addClass('check-show');
		else
			$(this).removeClass('check-show');
	})
	checkAgain.on('click', function() {
		if($this.find('input[value="no"]').is(':checked')) {
			$('.autorize-block__choice2').addClass('show');
			$('.autorize-block__choice1').removeClass('show');
		} else if($this.find('input[value="yes"]').is(':checked')){
			$('.autorize-block__choice2').removeClass('show');
			$('.autorize-block__choice1').addClass('show');
		}
	})
	
	

})




