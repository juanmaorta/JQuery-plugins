# Reference jQuery
$ = jQuery

# Adds plugin object to jQuery
$.fn.extend
  protect: (options) ->
    self = $.fn.protect
    opts = $.extend {}, self.default_options, options
    $(this).each (i, el) ->
      self.init el, opts
      # self.log el if opts.log

$.extend $.fn.protect,
  default_options:
    msg: ""
    mask: true
    block_right_click: true
    mask_classname: 'bgtransparent'
    mask_id: 'protectPhoto'
    keep_click: true
    debug: false


  # methods
  init: (el, opts) ->
    this.show el, opts
    return
  
  show: (el, opts) ->
    target = $(el)

    if opts.mask
      # creates a mask over the image
      $protect = $('<div>').attr
        className: opts.mask_classname
        id: opts.mask_id
      $('body').append($protect)

      $protect.css("width", target.width())
        .css("height", target.height())
        .css("position", "absolute")
        .css("left", target.position().left)
        .css("top", parseInt(target.position().top, 10))
      if opts.debug
        $protect.css("border", "solid 1px #000")

    if opts.block_right_click
      if opts.mask
        click_target = $protect
      else
        click_target = target

      click_target.bind "contextmenu", (e) ->
        e.preventDefault()
        if opts.msg isnt ""
          alert opts.msg
        return false

    if opts.keep_click and opts.mask
      if opts.debug
        console.log "keeps click!"

      href = target.parent().attr("href")
      if href isnt "undefined" and href isnt null and href isnt ""
        target.parent().bind "click", (e) ->
          e.preventDefault()
          return false
        .css("cursor", "default")

        $protect.bind "click", (e) ->
          window.location = href
        .css("cursor", "pointer")
        return



  
