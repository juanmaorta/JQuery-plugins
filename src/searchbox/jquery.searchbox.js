/**
 * Ejemplo de uso
   Gestiona una caja de búsqueda y lleva a cabo
   la validación del término de búsqueda
   y una "marca de agua"
   	
   <form action="/galerias/search/" method="get" id="searchGalerias" name="searchGalerias">
		<input id="tsearch" name="txt" type="text" value="{$smarty.get.txt}" />
		<img src="{#image_dir#}f_bsearch.png" class="lupabtn" />
   </form>
   
   $("#tsearch").searchbox({hint:"Buscar imágenes...",msg:"Por favor, indica un término de búsqueda"}) 
 */
 
(function($) {
	var settings;
	
	var methods = {
		init : function (options) {
			settings = $.extend({
				hint: "search",
				hintedClass: "hinted",
				button:	"",
				form: null,
				msg: "Please, type a search term"
			}, options ||{});
			return this;	
		},
		show : function () {
			var $wrapped = this;
			// el hint puede ser el valor del field
			if ($wrapped.val() != '') {
				settings.hint = $wrapped.val();
				// $wrapped.val("");
			}
			$wrapped.val(settings.hint);
			$wrapped.addClass(settings.hintedClass);
			
			$wrapped.focus(function () {
				$wrapped.css("background-color", "transparent");
				if ($wrapped.val() == settings.hint) {
					$wrapped.val("");
					$wrapped.removeClass(settings.hintedClass); 
				}
			});
			$wrapped.blur(function () {
				if ($wrapped.val() == '') {
					$wrapped.val(settings.hint);
					$wrapped.addClass(settings.hintedClass);
				}
			});
			
			// submit
			if (settings.form == null) {
				settings.form = $wrapped.parent();
			}
			
			settings.form.submit(function () {
				if ($wrapped.val() != '' && $wrapped.val() != settings.hint) {
					this.submit()
				} else {
					alert(settings.msg);
				}
				return false;
			});
			/*
			if ($tsearch.val() != '' && $tsearch.val() != hint) {
				this.submit()
			} else {
				alert("Por favor, indica un término de búsqueda");
			}
			return false;
			*/
		}
	}
	
	$.fn.searchbox = function (method) {
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
