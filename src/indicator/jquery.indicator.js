/*globals jQuery */

/**
 * Ejemplo de uso
   Muestra un indicador al hacer click en #showme
   
   Mostrando el indicador en dos fases,
   llamando a init() y a show()  
  
   var $wrapped = $("#container");
   $("#showme").click(function () {
      $wrapped.indicator("init", {
               text    : "Actualizando datos...",
               image    : "indicator.gif",
               animate :  50
           });
           $wrapped.indicator("show");
           return false;
   });
   $("#hideme").click(function () {
           $wrapped.indicator("hide");
   });
   
   Se puede mostrar el indicador en una fase
   suprimiendo "init", y sin llamar a show()
    
   $("#showme").click(function () {
           $wrapped.indicator({
               text    : "Actualizando datos...",
               image    : "indicator.gif",
               animate :  50
           });
           $wrapped.indicator("show");
           return false;
   });
   
 */

(function ($) {
    var settings,
    container = null,
    methods = {
        init : function (options) {
            settings = $.extend({
                default_class: "indicator",
                text         :    "Updating...",
                image         :    null,
                animate         :     false,
                type         :  'append'
            }, options || {});
            return this;
        },
        show : function () {
            if (settings.image === null) {
                container = $("<div class=\"" + settings.default_class + "\" id=\"ind\">" + settings.text + "</div>");
            } else {
                container = $("<div class=\"" + settings.default_class + "\" id=\"ind\"><img src=\"" + settings.image + "\" />" + settings.text + "</div>");
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
                            return this.find("#ind").fadeOut('fast');
                        } else {
                            return this.find("#ind").fadeOut(settings.animate);
                        }
                    } else {
                        return this.find("#ind").remove();
                    }
                }
            },
        update : function (content) {
            if (settings.image === null) {
                return this.find(".indicator").html(content);
            } else {
                return this.find(".indicator").html("<img src=\"" + settings.image + "\" />" + content);
            }
        }
    };

    $.fn.indicator = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            // Assumes init as the default, and returns show
            methods.init.apply(this, arguments);
            return methods.show.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.indicator');
        }
        return this;
    };
}(jQuery));