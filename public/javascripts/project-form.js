'use strict';

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

$('#word_count_desc')

// TODO: Logic to prevent form submission if bad input
