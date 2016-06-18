
$(document).ready(function() {
	var aside		= $('.sidebar');

		
		$(window).on('scroll', function() {
			
			if (($(this).scrollTop() < aside.next().offset().top) && (document.body.clientWidth >= 1200)) {
				aside.css('top', aside.next().offset().top - $(this).scrollTop());
			}
			else {
				aside.css('top', 0);
			}
			
		})

		aside.find('.sidebar__item').first().addClass('sidebar__item_active')

		$('.overlay').click(function() {
			$(this).remove();
		});
		
});