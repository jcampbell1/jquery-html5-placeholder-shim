(function($) {
  // @todo Document this.
  $.extend($,{ placeholder: {
      browser_supported: function() {
        return this._supported !== undefined ?
          this._supported :
          ( this._supported = !!('placeholder' in $('<input type="text">')[0]) );
      },
      defaults: {
        color: '#888',
        cls: 'placeholder',
        selector: 'input[placeholder], textarea[placeholder]'
      },
      shim: function(opts) {
        opts = $.extend({},this.defaults,opts);
        !this.browser_supported() && $(opts.selector)._placeholder_shim(opts);
      }
  }});

  $.extend($.fn,{
    _placeholder_shim: function(config) {
      function calcPositionCss(target)
      {
        var op = $(target).offsetParent().offset();
        var ot = $(target).offset();

        return {
          top: ot.top - op.top,
          left: ot.left - op.left,
          width: $(target).width()
        };
      }
      return this.each(function() {
        var $this = $(this);
        
        if( $this.data('placeholder') ) {
          var $ol = $this.data('placeholder');
          $ol.css(calcPositionCss($this));
          return true;
        }

        var possible_line_height = {};
        if( !$this.is('textarea') && $this.css('height') != 'auto') {
          possible_line_height = { lineHeight: $this.css('height'), whiteSpace: 'nowrap' };
        }

        var ol = $('<label />')
          .text($this.attr('placeholder'))
          .addClass(config.cls)
          .css($.extend({
            position:'absolute',
            display: 'inline',
            'float':'none',
            overflow:'hidden',
            textAlign: 'left',
            color: config.color,
            cursor: 'text',
            paddingTop: $this.css('padding-top'),
            paddingRight: $this.css('padding-right'),
            paddingBottom: $this.css('padding-bottom'),
            paddingLeft: $this.css('padding-left'),
            fontSize: $this.css('font-size'),
            fontFamily: $this.css('font-family'),
            fontStyle: $this.css('font-style'),
            fontWeight: $this.css('font-weight'),
            textTransform: $this.css('text-transform'),
            backgroundColor: 'transparent',
            zIndex: 99
          }, possible_line_height))
          .css(calcPositionCss(this))
          .attr('for', this.id)
          .data('target',$this)
          .click(function(){
            $(this).data('target').focus()
          })
          .insertBefore(this);
        $this
          .data('placeholder',ol)
          .focus(function(){
            ol.hide();
          }).blur(function() {
            ol[$this.val().length ? 'hide' : 'show']();
          }).triggerHandler('blur');
        $(window)
          .resize(function() {
            var $target = ol.data('target')
            ol.css(calcPositionCss($target))
          });
      });
    }
  });
})(jQuery);

jQuery(document).add(window).bind('ready load', function() {
  if (jQuery.placeholder) {
    jQuery.placeholder.shim();
  }
});