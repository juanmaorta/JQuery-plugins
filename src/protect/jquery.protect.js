(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    protect: function(options) {
      var opts, self;
      self = $.fn.protect;
      opts = $.extend({}, self.default_options, options);
      return $(this).each(function(i, el) {
        return self.init(el, opts);
      });
    }
  });

  $.extend($.fn.protect, {
    default_options: {
      msg: "",
      mask: true,
      block_right_click: true,
      mask_classname: 'bgtransparent',
      mask_id: 'protectPhoto',
      keep_click: true,
      debug: false
    },
    init: function(el, opts) {
      this.show(el, opts);
    },
    show: function(el, opts) {
      var $protect, click_target, href, target;
      target = $(el);
      if (opts.mask) {
        $protect = $('<div>').attr({
          className: opts.mask_classname,
          id: opts.mask_id
        });
        $('body').append($protect);
        $protect.css("width", target.width()).css("height", target.height()).css("position", "absolute").css("left", target.position().left).css("top", parseInt(target.position().top, 10));
        if (opts.debug) $protect.css("border", "solid 1px #000");
      }
      if (opts.block_right_click) {
        if (opts.mask) {
          click_target = $protect;
        } else {
          click_target = target;
        }
        click_target.bind("contextmenu", function(e) {
          e.preventDefault();
          if (opts.msg !== "") alert(opts.msg);
          return false;
        });
      }
      if (opts.keep_click && opts.mask) {
        if (opts.debug) console.log("keeps click!");
        href = target.parent().attr("href");
        if (href !== "undefined" && href !== null && href !== "") {
          target.parent().bind("click", function(e) {
            e.preventDefault();
            return false;
          }).css("cursor", "default");
          $protect.bind("click", function(e) {
            return window.location = href;
          }).css("cursor", "pointer");
        }
      }
    }
  });

}).call(this);
