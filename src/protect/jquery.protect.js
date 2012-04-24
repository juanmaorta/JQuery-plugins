(function($) {
var settings;
	
	var methods = {
		init : function (options) {
			settings = $.extend({
				msg: "",
				mask: false,
				block_right_click: true,
				mask_classname: 'bgtransparent',
				mask_id: 'protectPhoto',
				keep_click: true
			}, options ||{});
			return this;	
		},
		show : function () {
			var $wrapped = this;
			if (settings.block_right_click && !settings.mask) {
				this.bind("contextmenu", function () {
					if (settings.msg != '') {
						alert(settings.msg);
					}
					return false;
				});
			}
			if (settings.mask) {
				// Create a mask over the image
				var $protect = $('<div>').attr({
				   	className: settings.mask_classname,
				    id: settings.mask_id
				});
				$('body').append($protect);
				$protect.css("width", this.width());
				$protect.css("height", this.height());
				$protect.css("position", "absolute");
				var foto_pos = this.position();
				$protect.css("left", foto_pos.left);
				$protect.css("top", parseInt(foto_pos.top) + 20);
				
				if (settings.block_right_click) {
					$protect.bind("contextmenu", function () {
						if (settings.msg != '') {
							alert(settings.msg);
						}
						return false;
					});
				}
				if (settings.keep_click) {
					// Transfers the HREF of a parent A > IMG
					// to the click event of the mask
					var link = $wrapped.parent();
					var href = link.attr("href");
					if (href != '') {
						link.click(function () {return false})
							.css("cursor","default");
						$protect.click(function () {
							window.location = href;
						});
					}
				}
			}
		}
	}
	
	$.fn.protect = function (method) {
		// Method calling logic
	    if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      // Assumes init as the default, and returns show
	      methods.init.apply( this, arguments );
	      return methods.show.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.protect' );
	    }
		return this;
	}
})(jQuery);