/*globals jQuery */

/**
 * Ejemplo de uso
   Sustituye al clásico alert() mostrando un mensaje
   contextualizado
   
   Mostrando el indicador en dos fases,
   llamando a init() y a show()  
  
   var $wrapped = $("#container");
   $("#showme").click(function () {
      $wrapped.message("init", {
               text    : "Este es el texto del mensaje",
               animate :  50
           });
           $wrapped.message("show");
           return false;
   });
   $("#hideme").click(function () {
           $wrapped.message("hide");
   });
   
   Se puede mostrar el indicador en una fase
   suprimiendo "init", y sin llamar a show()
    
   $("#showme").click(function () {
           $wrapped.message({
               text    : "Texto del mensaje",
               animate :  50
           });
           $wrapped.message("show");
           return false;
   });
 */
 
(function ($) {
    var settings,
    container = null,
    $closebtn = null,
    methods = {
        init : function (options) {
            settings = $.extend({
                default_class:  "msg",
                text         :  "Default text",
                closeimg     :  null,
                closeclass   :  "closebtn",
                animate      :  false,
                type         :  'append',
                autoclose    :  true
            }, options || {});
            return this;
        },
        show : function () {
            container = $("<div class=\"" + settings.default_class + "\" id=\"msg\">" + settings.text + "</div>");
            if (settings.closeimg !== null) {
                $closebtn = $("<img src=\"" + settings.closeimg + "\" class=\"" + settings.closeclass + "\" />");
                $closebtn.click(function () {
                    methods.hide.apply(this, arguments);
                    return false;
                });
                container.append($closebtn);
            }
            if (settings.animate) {
                container.css("display", "none");
                this.append(container);
                if (typeof settings.animate === 'boolean') {
                    container.fadeIn('fast');
                } else {
                    container.fadeIn(settings.animate);
                }
                return this;
            } else {
                if (settings.type === 'append') {
                    return this.append(container);
                } else {
                    // creates a layer over the wrapper
                    var pos = this.position(),
                    xpos = pos.top,
                    ypos = pos.left;
                    container.css("position", "absolute");
                    container.css("width", this.width() + "px");
                    container.css("height", this.height() + "px");
                    container.css("top", xpos + "px");
                    container.css("left", ypos + "px");

                    return this.append(container);
                }
            }
        },
        hide : function () {
            if (container !== null) {
                if (settings.animate) {
                    if (typeof settings.animate === 'boolean') {
                        return container.fadeOut('fast');
                    } else {
                        return container.fadeOut(settings.animate);
                    }
                } else {
                    return container.remove();
                }
            }
        }
    };

    $.fn.message = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            // Assumes init as the default, and returns show
            methods.init.apply(this, arguments);
            return methods.show.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.message');
        }
        return this;
    };
}(jQuery));