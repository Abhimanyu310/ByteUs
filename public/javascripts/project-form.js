'use strict';

// Deselect event for radio buttons.
// From: <http://stackoverflow.com/questions/11173685/how-to-detect-radio-button-deselect-event>
// See also: <http://jsfiddle.net/s7f9s/2/>

function setupDeselectEvent() {
  var selected = {};
  $('input[id=nature], input[id=amount]').on('click', function() {
    if(this.name in selected && this != selected[this.name])
      $(selected[this.name]).trigger("deselect");
    selected[this.name] = this;
  }).filter(':checked').each(function() {
    selected[this.name] = this;
  });
}

$(document).ready(function () {

  /**
   * Hide or show "other" text input field
   */
  
  // Initially hide text input fields
  $('#nature[name=nature_of_work_other], #amount[name=prior_work_other]')
    .each(function(idx,elem) {
      $(elem).hide();
    }
  );

  // See function above
  setupDeselectEvent(true);

  // show/hide & clear
  $('#nature[value=Other], #amount[value=Other]').each(function(idx,elem) {
    $(elem).on('deselect', function() {
      $(elem).siblings('input[type=text]').hide().val('');
    }).on('change', function() {
      $(elem).siblings('input[type=text]').show();
    });
  });

  /**
   * Checkbox all
   */

  $('input[type=checkbox][name=check][value=All]').on('click', function() {
    var isChecked = $(this).is(':checked');
    $('input[type=checkbox][name=areas]').each(function(idx, elem) {
      $(elem).prop('checked', isChecked);
    });
  });

  /**
   * Checkbox funding speed type
   */

  $('input[type=checkbox][name=not_sure]').on('click', function() {
    if(this.checked) { 
      $('input[id=finances][name=match_of_funding]').attr('disabled', 'disabled').val('');
    } else {
      $('input[id=finances][name=match_of_funding]').removeAttr('disabled');
    }
  });

  /**
   * Phone numbers
   */
  
  // Strip everything but 10 numbers when the field loses focus
  $('#form_primPhone, #form_secPhone, #form_postDocPhone').on('focusout', function() {
    $(this).each(function(idx,elem) {
      $(elem).val($(elem).val().replace(/\D/g,'').substring(0,10));
    });
  });

  /**
   * Word Counts 
   */
  
  // Truncate excess characters and display the count in the sibling span element
  $('#description, #requirements, #longdescription').each(function(idx,elem) {
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
  
  // TODO: Logic to prevent form submission if bad input

});
