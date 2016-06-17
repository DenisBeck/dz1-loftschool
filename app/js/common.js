
$(document).ready(function() {
	var container 	= $('.vision-part__container'),
		prev		= $('.navigation-part__prev .navigation-part__wrap'),
		next		= $('.navigation-part__next .navigation-part__wrap'),
		pics 		= $('.descr-part__img'),
		aside		= $('.sidebar');

		container.append(pics[1]);
		container.find('.descr-part__img').first().removeClass('hidden');
		next.append(pics[2]);
		next.find('.descr-part__img').first().removeClass('hidden');
		prev.append(pics[0]);
		prev.find('.descr-part__img').first().removeClass('hidden');

		$(window).on('scroll', function() {
			
			if (($(this).scrollTop() < aside.next().offset().top) && (document.body.clientWidth >= 1200)) {
				aside.css('top', aside.next().offset().top - $(this).scrollTop());
			}
			else {
				aside.css('top', 0);
			}
			
		})

		aside.find('.sidebar__item').first().addClass('sidebar__item_active')
		
});