// Photon | html5up.net | @ajlkn | CCA 3.0

(function($) {
	var $window = $(window),
		$body = $('body');

	// Breakpoints
	breakpoints({
		xlarge: [ '1141px', '1680px' ],
		large: [ '981px', '1140px' ],
		medium: [ '737px', '980px'  ],
		small: [ '481px', '736px'  ],
		xsmall: [ '321px', '480px'  ],
		xxsmall: [ null, '320px'  ]
	});

	// Load animations
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 1);
	});

	// Scrolly
	$('.scrolly').scrolly();

	// Dynamic mobile styling
	$window.on('resize load', function() {
    if (breakpoints.active('small') || breakpoints.active('xsmall')) { 
			$('.tagline').html(`Full-Stack Software Engineer`);

			if (breakpoints.active('xsmall')) {
				$('h4').each(function() {
					let $h4 = $(this);
					let $nextP = $h4.next('p');

					if ($nextP.length && !$nextP.data('h4-moved')) {
						let h4Text = `<b>${$h4.text()}: </b>`;
						$nextP.prepend(h4Text);
						$nextP.data('h4-moved', true);
						$h4.hide(); 
					}
				});
			}

    } else {
			$('.tagline').html(`
				Full-Stack Software Engineer
				&nbsp;&nbsp;|&nbsp;&nbsp;
				Organization Founder
				&nbsp;&nbsp;|&nbsp;&nbsp;
				Educational Volunteer
			`);

			$('h4').show();
			$('p').each(function() {
				let $p = $(this);

				if ($p.data('h4-moved')) {
					$p.html($p.html().replace(/^<b>.*?:<\/b> /, ''));
					$p.removeData('h4-moved');
				}
			});
    }
	});
})(jQuery);
