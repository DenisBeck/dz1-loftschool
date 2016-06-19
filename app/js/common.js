
$(document).ready(function() {

	var aside	= $('.sidebar'),
		login	= $('.autorize__text'),
		welcome	= login.closest('.autorize-wrap').next(),
		menu	= $('.main-menu__close'),
		folder	= $('.green-folder__link'),
		sidebar = $('#content-table');
	
	$(window).on('scroll', function() {
		
		if (($(this).scrollTop() >= aside.next().offset().top) && (document.body.clientWidth > 1200)) {
			aside.addClass('sidebar_fixed');
		}
		else {
			aside.removeClass('sidebar_fixed');
		}
		
	})

	aside.find('.sidebar__item').first().addClass('sidebar__item_active')

	login.on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('autorize__text_active');
		welcome.find('.welcome-block-wrap').toggleClass('welcome-block-wrap_hide');
		welcome.find('.autorize-block-wrap').toggleClass('autorize-block-wrap_active');
	})

	menu.on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('main-menu__close_change');
		$(this).next().toggleClass('hidden')
	})

	folder.on('click', function(e){
		e.preventDefault();

		$(this).parent().toggleClass('green-folder_open');
		sidebar.fadeToggle(0);

});
