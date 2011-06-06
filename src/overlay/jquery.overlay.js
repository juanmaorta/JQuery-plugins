/*globals jQuery */
/*global window: false */
/*global document: false */

/**
* Ejemplo de uso
  Muestra un overlay al hacer click en #showme
  Mostrando el indicador en dos fases,

    var $container = $("#mod_tools");
    $("#mod_btn").click(function () {
        $container.overlay("init", {
            animate: true,
            bg_opacity: 0.6,
            delay: 150,
            callback_show: function () {console.log("show");},
            callback_hide: function () {console.log("hide");}
        });

    $container.overlay("show");
    return false;
    });
	
    // en una sola fase (sin settings)
    $("#mod_btn").click(function () {
        $container.overlay();
    })
    $("#mod_tools .close").click(function () {
        $container.overlay("close");
    });
  
*/
 
 /**
  * TODO
  * 
  * - capture inside the plugin the onclick event of the close button
  * - capture the Esc key to close the overlay
  */
 
(function ($) {
    var settings, 
    show = false,
    wrapped = null,
    uid = Math.random().toString().slice(10),
	
	methods = {
        init : function (options) {
		    settings = $.extend({
                animate: true,
				callback_show: null,
				callback_hide: null,
				bg_opacity: 0.6,
				bg_class: "bgtransparent",
				id: "bgtransparent",
				delay: 150,
				closeOnEsc: true
			}, options || {});
			return this;
        },
        show : function () {
            if (!show) {
				wrapped = this;
				show = true;
				
				// create new DIV for background color
				var $bgdiv = $('<div>').attr({
                        className: settings.bg_class,
	                    id: settings.id
	                }),
	            wscr = $(window).width(),
                hscr = $(window).height(),
                x_pos = 0,
                y_pos = 0;
	                
	            // adding new DIV
	            $('body').append($bgdiv);
                
	            //establecemos las dimensiones del fondo
	            $bgdiv.css("width", wscr);
	            $bgdiv.css("height", hscr);
	            if (settings.animate) {
					$bgdiv.animate({opacity: settings.bg_opacity}, settings.delay);
	            } else {
                    $bgdiv.css("opacity", settings.bg_opacity);
	            }
				
				// centra en contenedor
				x_pos = parseInt(wscr, 10) / 2 - parseInt(this.width(), 10) / 2;
				y_pos = parseInt(hscr, 10) / 2 - parseInt(this.height(), 10) / 2 + parseInt($(window).scrollTop(), 10);
				
				this.css('left', x_pos + "px");
				this.css('top', y_pos + "px");
				this.css('opacity', 0);
				this.css('visibility', 'visible');
				this.css('display', 'block');
				
				if (settings.animate) {
					this.animate({opacity: 1}, settings.delay, function () {
						if (settings.callback_show !== null) {
							settings.callback_show.apply();
						}
					});
				} else {
					this.css("opacity", 1);
					if (settings.callback_show !== null) {
						settings.callback_show.apply();
					}
				}
				
				// bind keypress Esc
				if (settings.closeOnEsc) {
					$(document).bind("keydown." + uid, function (e) {
						if (e.keyCode === 27) {
							wrapped.overlay("close");
						}
					});
				}
				
			} else {
				methods.close.apply();
			}
        },
        close : function () {
            if (show) {
				this.hide();
				if (settings.animate) {
					$("#" + settings.id).animate({opacity: 0}, settings.delay, function () {
						$(this).remove();
						if (settings.callback_hide !== null) {
							settings.callback_hide.apply();
						}
					});
				} else {
					$("#" + settings.id).remove();
					if (settings.callback_hide !== null) {
						settings.callback_hide.apply();
					}
				}
                show = false;
                // unbind keyboard events
                if (settings.closeOnEsc) {
                    $(document).unbind("keydown." + uid);
                }
            } else {
                methods.show.apply();
            }
        }
    };
	
	$.fn.overlay = function (method) {
		// Method calling logic
	    if (methods[method]) {
	        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    } else if (typeof method === 'object' || ! method) {
	        // Assumes init as the default, and returns show
	        methods.init.apply(this, arguments);
	        return methods.show.apply(this, arguments);
	    } else {
	        $.error('Method ' + method + ' does not exist on jQuery.overlay');
	    }
		return this;
	};
}(jQuery));