
$(document).ready(function() {
	var container 	= $('.vision-part__container'),
		prev		= $('.navigation-part__prev .navigation-part__wrap'),
		next		= $('.navigation-part__next .navigation-part__wrap')
		pics 		= $('.descr-part__img');

		container.append(pics[1]);
		container.find('.descr-part__img').first().removeClass('hidden');
		next.append(pics[2]);
		next.find('.descr-part__img').first().removeClass('hidden');
		prev.append(pics[0]);
		prev.find('.descr-part__img').first().removeClass('hidden');
});