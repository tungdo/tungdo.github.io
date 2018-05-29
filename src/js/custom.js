jQuery( document ).ready(function( $ ) {
	
	$( 'body' ).removeClass( 'no-js' ).addClass( 'js' );
	
	// Enable AOS.js
	if( typeof( AOS ) !== 'undefined' ){
		AOS.init({});
	}
	
	// TAB key navigation support for dropdown menus.
	$( '.menu-item-has-children * ' ).on( 'focus blur',
		function() {
			if($(this).parents( '.menu-item-has-children' ).has(document.activeElement)) {
				$(this).parents( '.menu-item-has-children' ).toggleClass('focus');
			}
		}
	);
	
	// Mobile nav
	jQuery( '.mobile-nav__toggle' ).click(
		function() {
			jQuery( this ).parent( '.mobile-nav' ).toggleClass( 'visible' );	
		}
	);
	
	// Add special class to current menu item by matching page URL and link address.
	$( 'li.menu-item > a[href]' ).filter(function() {return this.href === window.location.href;} ).parent().addClass( 'current-menu-item' );
	
	/*
	*	Videos
	*	##############################
	*/

	// Pause video listener
	$('.video-has-poster').each( function(){
		$(this)[0].addEventListener( 'pause', function(){
			$(this).siblings( '.video-poster' ).delay(100).fadeIn(300);
		});
	});
	
	// Play video listener
	$('.video-has-poster').each( function(){
		$(this)[0].addEventListener( 'play', function(){
			$(this).siblings('.video-poster').fadeOut(300,function(){});
		});
	});
	
	$( '.video-poster' ).click(function() {
		$(this).siblings('.video-has-poster')[0].play();
	}); 
	
	// Start FormBucket.com integration.
	$( '.contact-form' ).each(
		function(index){

			index++; // Increase index by 1

			// Compose name for each form
			var formID = 'contact-form' + '-' + index;

			// Add name as id attribute
			$( this ).attr( 'id', formID );
			
			$( this ).prepend(
				'<input type="hidden" name="Submitted From" value="' + location.href + '">\n' +
				'<input type="hidden" name="Form ID" value="' + formID + '">'
			);

			// Now target each form by it's id attribute.
			$( '#' + formID ).submit(function(event) {
	
				event.preventDefault();

				var contactForm = $(this);
				var contactButton = $( '[type=submit]', contactForm);

				$.ajax({
					url: contactForm.prop('action'),
					type: 'POST',
					crossDomain: true,
					headers : {
					'accept' : 'application/javascript',
				},
				data: $( '#' + formID ).serialize(),
					beforeSend: function() {
					contactButton.prop( 'disabled', 'disabled' );
				}
				})
				.done(function(response) {
					// You will do something WAY BETTER than alert
					// because you are an awesome designer.
					$( location ).attr('href', location.protocol + '//' + location.hostname + ( location.port ? ':' + location.port : '') + '/thank-you/')
					contactButton.prop('disabled', false);
				})
				.fail(function(response) {
					alert('Dang, something went wrong!');
					contactButton.prop('disabled', false);
				})
			});
			
		}
	); // End FormBucket.com integration.
	
});
