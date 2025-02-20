// Photon | html5up.net | @ajlkn | CCA 3.0

(function($) {
	var $window = $(window),
		$body = $('body');

	// Breakpoints
	breakpoints({
		xlarge:   [ '1141px',  '1680px' ],
		large:    [ '981px',   '1140px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '321px',   '480px'  ],
		xxsmall:  [ null,      '320px'  ]
	});

	// Load animations
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Scrolly
	$('.scrolly').scrolly();
})(jQuery);
