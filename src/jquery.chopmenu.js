'use strict';

(function ($) {

	// keeping central set of classnames and selectors

	var WRAPPER = 'chopmenu__wrapper',
	    WRAPPER_CLASS = '.' + WRAPPER,


	// hamburger menu button
	BUTTON = 'chopmenu__hamburger',
	    BUTTON_CLASS = '.' + BUTTON,
	    LINE = 'chopmenu__line',
	    LINE_CLASS = '.' + LINE,


	// menu list
	LIST = 'chopmenu__list',
	    LIST_CLASS = '.' + LIST,
	    ITEM = 'chopmenu__item',
	    ITEM_CLASS = '.' + ITEM,
	    LINK = 'chopmenu__link',
	    LINK_CLASS = '.' + LINK,


	// utilities
	ACTIVE = 'active',
	    ACTIVE_CLASS = '.' + ACTIVE,
	    middlePoint,
	    leftLinePos;

	$.fn.chopmenu = function (options) {

		options = $.extend({
			hamburgerMenuColor: '#ddd',
			links: ['change', 'options', 'as', 'you', 'need'],
			buttonWidth: 40,
			buttonHeight: 40,
			lineWidth: 24,
			lineSize: 4,
			lineColor: '#000',
			buttonBorder: false,
			buttonBorderWidth: 2,
			buttonBorderStyle: 'solid',
			buttonBorderColor: '#000',
			buttonTransitionTime: '.5s',

			navbarWidth: '100%',
			navbarHeight: '',
			navbarColor: '#ddd',

			itemWidth: 'auto',
			itemHeight: 40,
			itemFontSize: 16,
			itemFontWeight: 400,
			itemBackground: '#ddd',
			itemTextColor: '#000',

			// hamburger menu visibility point
			breakpoint: 768
		}, options);

		// initialize menu
		function init(element) {

			createMenu(element);
		}

		// prepare menu
		function createMenu(element) {
			var list = options.links,
			    ul = '<ul class="' + LIST + '"></ul>',
			    hamburger = '<div class="' + BUTTON + '"><span class="' + LINE + ' ' + LINE + '1"></span><span class="' + LINE + ' ' + LINE + '2"></span><span class="' + LINE + ' ' + LINE + '3"></span></div>';

			$(element).addClass(WRAPPER).append(hamburger).append(ul).css({
				position: 'relative',
				zIndex: 999,
				backgroundColor: options.navbarColor,
				width: options.navbarWidth

			});

			var navHeight = function navHeight() {
				if (typeof options.navbarHeight != 'number') {
					options.navbarHeight = options.buttonHeight + 10;
				} else {
					options.navbarHeight = options.navbarHeight;
				}
				return options.navbarHeight;
			};
			$(WRAPPER_CLASS).css('height', navHeight() + 'px');

			for (var i = 0; i < list.length; i++) {
				var li = '<li class="' + ITEM + '"><a class="' + LINK + '" href="#' + list[i] + '">' + list[i] + '</a></li>';

				$(WRAPPER_CLASS).find(LIST_CLASS).append(li);
				addStyle();
			}

			function addStyle() {

				// changing css depends on screen width
				if (matchMedia) {
					var mediaquery = window.matchMedia('(min-width: ' + options.breakpoint + 'px)');
					mediaquery.addListener(WidthChange);
					WidthChange(mediaquery);
				}
				function WidthChange(mediaquery) {

					// wide screen
					if (mediaquery.matches) {
						$(BUTTON_CLASS).css({
							display: 'none'
						});
						$(LIST_CLASS).css({
							display: 'flex',
							flexDirection: 'row',
							position: 'static'
						});
						$(ITEM_CLASS).css({
							width: options.itemWidth,
							minWidth: '100px',
							height: 'auto',
							backgroundColor: 'transparent'
						});
					} else
						// mobile (under breakpoint)
						{
							$(BUTTON_CLASS).css({
								display: 'block'
							});
							$(LIST_CLASS).css({
								display: 'none',
								flexDirection: 'column',
								position: 'absolute',
								top: navHeight() + 'px'
							});
							$(ITEM_CLASS).css({
								width: '100%',
								height: options.itemHeight + 'px',
								backgroundColor: options.itemBackground
							});
						}
				}

				// css settings
				$(BUTTON_CLASS).css({
					width: options.buttonWidth + 'px',
					height: options.buttonHeight + 'px',
					position: 'absolute',
					top: (navHeight() - options.buttonHeight) / 2 + 'px',
					right: '10px',
					boxSizing: 'border-box'
				});

				if (options.buttonBorder === true) {
					$(BUTTON_CLASS).css({
						border: options.buttonBorderWidth + 'px' + ' ' + options.buttonBorderStyle + ' ' + options.buttonBorderColor
					});
				}

				$(LINE_CLASS).css({
					display: 'block',
					width: options.lineWidth + 'px',
					height: options.lineSize + 'px',
					backgroundColor: options.lineColor,
					position: 'absolute',
					left: leftLinePos,
					transition: options.buttonTransitionTime
				});

				if (options.buttonBorder === true) {
					middlePoint = (options.buttonHeight - options.lineSize - options.buttonBorderWidth * 2) / 2;
					leftLinePos = (options.buttonWidth - options.lineWidth - options.buttonBorderWidth * 2) / 2 + 'px';
				} else {
					middlePoint = (options.buttonHeight - options.lineSize) / 2;
					leftLinePos = (options.buttonWidth - options.lineWidth) / 2 + 'px';
				}

				$(LINE_CLASS + '1').css({
					top: middlePoint - 5 - options.lineSize + 'px'
				});

				$(LINE_CLASS + '2').css({
					top: middlePoint + 'px'
				});

				$(LINE_CLASS + '3').css({
					top: middlePoint + 5 + options.lineSize + 'px'
				});

				$(LIST_CLASS).css({
					// display: 'flex',
					justifyContent: 'flex-end',
					width: '100%',
					height: '100%',
					listStyle: 'none'
				});

				$(ITEM_CLASS).css({
					display: 'flex',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center'
				});

				$(LINK_CLASS).css({
					fontSize: options.itemFontSize + 'px',
					fontWeight: options.itemFontWeight + 'px',
					textDecoration: 'none',
					color: options.itemTextColor
				});
			}
		}

		function onButtonClick() {

			if (!$(this).hasClass(ACTIVE)) {
				$(this).addClass(ACTIVE);
				$(LINE_CLASS + '1').animate({
					top: middlePoint + 'px'
				}, options.buttonTransitionTime, function () {
					$(LINE_CLASS + '1').css({
						transform: 'rotate(45deg)'
					});
				});

				$(LINE_CLASS + '2').animate({
					// left: 2 * options.button.buttonWidth + 'px',
					opacity: 0
				}, options.buttonTransitionTime);

				$(LINE_CLASS + '3').animate({
					top: middlePoint + 'px'
				}, options.buttonTransitionTime, function () {
					$(LINE_CLASS + '3').css({
						transform: 'rotate(-45deg)'
					});
				});

				$(LIST_CLASS).slideDown();
			} else {
				$(this).removeClass(ACTIVE);
				$(LINE_CLASS + '1').animate({
					top: middlePoint - 5 - options.lineSize + 'px'
				}, options.buttonTransitionTime).css({
					transform: 'rotate(0)'
				});

				$(LINE_CLASS + '2').animate({
					// left: (options.buttonWidth - options.lineWidth) / 2 + 'px',
					opacity: 1
				}, options.buttonTransitionTime);

				$(LINE_CLASS + '3').animate({
					top: middlePoint + 5 + options.lineSize + 'px'
				}, options.buttonTransitionTime).css({
					transform: 'rotate(0)'
				});

				$(LIST_CLASS).slideUp();
			}
		}

		return this.each(function () {
			init(this);
			$('.chopmenu__hamburger').on('click', onButtonClick);
		});
	}; // end of $.fn.chopmenu
})(jQuery);