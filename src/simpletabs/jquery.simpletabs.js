/*globals jQuery */
/*global window */
/*jslint browser: true*/
/*jslint regexp: false*/


/**
 * Ejemplo de uso
   Crea un sistema de navegación por tabs
       
       <ul class="tabs">
        <li><a href="#tab1">Tab 1</a></li>
        <li><a href="#tab2">Tab 2</a></li>
    </ul>

    <div class="tab_container">
        <div id="tab1" class="tab_content">
            Contenido 1
        </div>
        <div id="tab2" class="tab_content">
            Contenido 2
        </div>
   </div>
   
   $tabs = $("#tab_container").simpletabs(); 
   
 */

(function ($) {
    var defaults;
    
    $.simpletabs = function () {};
    $.extend($.simpletabs, {
        defaults: {
            content_class:     ".tab_content",
            tab_list:        "ul.tabs",
            active_class:    "active",
            default_active: 0,
            fade: false,
            route_url: true
        },
        showtab: function (tabind) {
            var re = new RegExp(/(.*)#(.*)/);
            $($.simpletabs.defaults.tab_list + " li").removeClass($.simpletabs.defaults.active_class);
            $($.simpletabs.defaults.content_class).hide();
            // activa el li
            $($.simpletabs.defaults.tab_list).find("a").each(function (index, element) {
                if (index === tabind) {
                    $(element).parent().addClass("active").show();
                    if ($.simpletabs.defaults.route_url) {
                        if (re.test(this.href)) {
                            window.location.hash = RegExp.$2;
                        }
                    }
                }
            });
            // activa el contenido
            $($.simpletabs.defaults.content_class).each(function (index, element) {
                if (index === tabind) {
                    if ($.simpletabs.defaults.fade) {
                        $(element).show('fast');
                    } else {
                        $(element).show();
                    }
                }
            });
            return false;
        }
    });
    
    $.fn.simpletabs = function (options) {
        options = $.extend($.simpletabs.defaults, options);
        $($.simpletabs.defaults.content_class).hide();
        
        // tab por defecto
        $.simpletabs.showtab($.simpletabs.defaults.default_active);
        
        // clicks
        $($.simpletabs.defaults.tab_list + " li").click(function () {
            var tab_ind = ($(this).parent().find("li").index(this));
            $.simpletabs.showtab(tab_ind);
            return false;
        });

        return this;
    };
}(jQuery));