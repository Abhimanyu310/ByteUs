'use strict';

$(document).ready(function() {

  /**
   * Phone Numbers
   */

  $('#form_primPhone, #form_secPhone').on('focusout', function() {
    $(this).each(function(idx,elem) {
      $(elem).val($(elem).val().replace(/\D/g,'').substring(0,10));
    });
  });

  /**
   * Character Count
   */

  $('textarea').each(function(idx,elem) {
    var max_chars = $(elem).attr('maxlength');
    $(elem).siblings('#char_count').html(max_chars);
    $(elem).on('keyup', function() {
      var chars = elem.value.length;
      if(chars > max_chars) {
        var trunc = $(this).val().substring(0, max_chars);
        $(elem).val(trunc);
      }
      else {
        $(elem).siblings('#char_count').html(max_chars - chars);
      }
    });
  });

});