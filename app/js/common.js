
$(document).ready(function() {

	function setPercents(total, current) {
		var percent = Math.ceil(current/total*100);
		$('.counter').text(percent + '%')
		if(percent >= 100) 
			$('.main').css('display', 'block');
			$('.container').css('display', 'block');
			$('.footer-welcome').css('display', 'block');

			spinner.fadeOut();
			preload.delay(350).fadeOut('slow');

	}

	var $this 		= $(this),
		aside		= $('.sidebar'),
		login		= $('.autorize__text'),
		welcome		= login.closest('.autorize-wrap').next(),
		back		= welcome.find('.welcome-page'),
		menu		= $('.main-menu__close'),
		folder		= $('.green-folder__link'),
		sidebar 	= $('#content-table'),
		arrow		= $('#main-header').find('.arrow__link'),
		check 		= $('.autorize-block__check'),
		checkAgain	= $('.autorize-block__check-again'),
		preload		= $('.page-preloader'),
		spinner		= preload.find('.spinner'),
		imgs		= [],
		next		= $('.navigation-part__next').find('.navigation-part__arrow'),
		prev 		= $('.navigation-part__prev').find('.navigation-part__arrow');

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
	//Прелоадер
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

	/*$(window).on('load', function () { 

		var	preload	= $('.page-preloader'),
			spinner	= preload.find('.spinner');

		spinner.fadeOut();
		preload.delay(350).fadeOut('slow');
	});*/
	
	

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

		$(this).closest('.autorize').addClass('flipped');
		welcome.find('.welcome-block')
				.removeClass('flip-show')
				.addClass('flip-hide')
				.parent().css('z-index', 0);
		
		welcome.find('.autorize-block')
				.addClass('flip-show')
				.parent().css('z-index', 1);
		
	})

	back.on('click', function(e) {
		e.preventDefault()

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
	
	var counter = 0;

	next.on('click', function() {
		
		var $this 				= $(this),
			block 				= $this.closest('.myWorks'),
			descrItems 			= block.find('.description-part__item'),
			activeDescrItem 	= block.find('.description-part__item_active'),
			visionItems			= block.find('.vision-part__item'),
			activeVisionItem	= block.find('.vision-part__item_active'),
			navNextItems		= block.find('.navigation-part__next').find('.navigation-part__item'),
			activeNavNextItem	= block.find('.navigation-part__next').find('.navigation-part__item_active'),
			navPrevItems		= block.find('.navigation-part__prev').find('.navigation-part__item'),
			activeNavPrevItem	= block.find('.navigation-part__prev').find('.navigation-part__item_active'),
			activeDescrHead 	= activeDescrItem.find('.description-part__head'),
			activeDescrText		= activeDescrItem.find('.description-part-tech__item');

		counter++;
		if(counter >= descrItems.length) {
			counter = 0;
		}
		var	nextDescrItem 	= descrItems.eq(counter),
			nextVisionItem	= visionItems.eq(counter),
			nextNavNextItem	= navNextItems.eq(counter + 1),
			nextNavPrevItem	= navPrevItems.eq(counter - 1);
			/*nextDescrHead	= nextDescrItem.find('.description-part__head'),
			nextDescrText	= nextDescrItem.find('.description-part-tech__item');*/
		if(counter >= descrItems.length - 1) {
			nextNavNextItem	= navNextItems.eq(0)
		}
		/*activeDescrHead.animate({
			'opacity': '0'
		}, 300);
		activeDescrText.animate({
			'opacity': '0'
		}, 300);
		nextDescrHead.animate({
			'opacity': '1',
			'z-index': '1'
		}, 300, function(){
			activeDescrHead.closest('.description-part__item').removeClass('.description-part__item_actve');
			$(this).closest('.description-part__item').addClass('.description-part__item_actve');
		});
		nextDescrText.animate({
			'opacity': '1'
		}, 300, function(){
			activeDescrText
		});*/

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
			activeNavPrevItem	= block.find('.navigation-part__prev').find('.navigation-part__item_active'),
			activeDescrHead 	= activeDescrItem.find('.description-part__head'),
			activeDescrText		= activeDescrItem.find('.description-part-tech__item');

		counter--;
		if(counter < 0) {
			counter = descrItems.length - 1;
		}
		var	prevDescrItem 	= descrItems.eq(counter),
			prevVisionItem	= visionItems.eq(counter),
			prevNavNextItem	= navNextItems.eq(counter + 1),
			prevNavPrevItem	= navPrevItems.eq(counter - 1);
			/*prevDescrHead	= nextDescrItem.find('.description-part__head'),
			prevDescrText	= nextDescrItem.find('.description-part-tech__item');*/
		/*if(counter < 1) {
			prevNavPrevItem	= navPrevItems.eq(descrItems.length - 1)
		*/
		if(counter >= descrItems.length - 1) {
			prevNavNextItem	= navNextItems.eq(0);
		}
		/*activeDescrHead.animate({
			'opacity': '0'
		}, 300);
		activeDescrText.animate({
			'opacity': '0'
		}, 300);
		prevDescrHead.animate({
			'opacity': '1',
			'z-index': '1'
		}, 300, function(){
			activeDescrHead.closest('.description-part__item').removeClass('.description-part__item_actve');
			$(this).closest('.description-part__item').addClass('.description-part__item_actve');
		});
		prevDescrText.animate({
			'opacity': '1'
		}, 300, function(){
			activeDescrText
		});*/

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
		})

	})

})




