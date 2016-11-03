'use strict';

$(document).ready(function () {

  /* Phone Numbers */
  
  // Strip everything but 10 numbers when the field loses focus
  $('#form_primPhone, #form_secPhone, #form_postDocPhone').on('focusout', function() {
    var $phones = $(this);
    $phones.each(function(idx,elem) {
      var $elem = $(elem); 
      $elem.val(function(){
        return $elem.val().replace(/\D/g,'').substring(0,10);
      });
    });
  });

  /* Word Counts */
  
  // Truncate excess characters and display the cound in the sibling span element
  $('#description, #requirements, #longdescription').each(function(idx,elem) {
    var max_chars = $(elem).attr('maxlength');
    $(elem).siblings('#char_count').html(max_chars);  
    $(elem).on('keyup', function() {
      var chars = elem.value.length;
      if (chars > max_chars) {
        var trunc = $(this).val().substring(0, max_chars);
        $(elem).val(trunc);
      }
      else {
        $(elem).siblings('#char_count').html(max_chars - chars);
      }
    });
  });
  
  // TODO: Logic to prevent form submission if bad input

});
