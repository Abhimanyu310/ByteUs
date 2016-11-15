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

  //Select box value during editing form
  // var state = $("#select_state").val();
  // $("#state").val(state);

  var summer_state = $("#select_summer_state").val();
  $("#summer_state").val(summer_state);

  var primary_major = $("#select_primary_major").val();
  $("#primary_major").val(primary_major);

  var secondary_major = $("#select_secondary_major").val();
  $("#secondary_major").val(secondary_major);

  var next_fall_level = $("#select_next_fall_level").val();
  $("#next_fall_level").val(next_fall_level);

  var grad_month = $("#select_grad_month").val();
  $("#grad_month").val(grad_month);

  var grad_year = $("#select_grad_year").val();
  $("#grad_year").val(grad_year);

  var most_interest = $("#select_most_interest").val();
  $("#most_interest").val(most_interest);

  var high_interest = $("#select_high_interest").val();
  $("#high_interest").val(high_interest);

  var moderate_interest = $("#select_moderate_interest").val();
  $("#moderate_interest").val(moderate_interest);

  var low_interest = $("#select_low_interest").val();
  $("#low_interest").val(low_interest);

  var least_interest = $("#select_least_interest").val();
  $("#least_interest").val(least_interest);







});