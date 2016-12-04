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



  // get project requirements
  var requirement_check = function(event) {
    // event.preventDefault();
    var selected = this.value;
    var selectElement = event.target;
    var selectRow = selectElement.parentNode.parentNode;
    var requirement1Row = selectRow.nextSibling;
    var requirement2Row = requirement1Row.nextSibling;
    var requirement3Row = requirement2Row.nextSibling;
    var requirement4Row = requirement3Row.nextSibling;
    var requirement5Row = requirement4Row.nextSibling;

    var requirement1Element = requirement1Row.children[0].children[2];
    var requirement2Element = requirement2Row.children[0].children[1];
    var requirement3Element = requirement3Row.children[0].children[1];
    var requirement4Element = requirement4Row.children[0].children[1];
    var requirement5Element = requirement5Row.children[0].children[1];

    var clearElement = selectElement.nextSibling;
    var viewElement = selectElement.nextSibling.nextSibling.nextSibling;

    $.ajax({
          method: 'GET',
          url: '/project/' + selected + '/requirements/'
        })
        .done(function(obj) {
          var requirements = obj.requirements;

          requirement1Row.style.display = '';
          requirement2Row.style.display = '';
          requirement3Row.style.display = '';
          requirement4Row.style.display = '';
          requirement5Row.style.display = '';

          if (requirements[0] == ''){
            requirement1Row.style.display = 'none';
          }
          if (requirements[1] == ''){
            requirement2Row.style.display = 'none';
          }
          if (requirements[2] == ''){
            requirement3Row.style.display = 'none';
          }
          if (requirements[3] == ''){
            requirement4Row.style.display = 'none';
          }
          if (requirements[4] == ''){
            requirement5Row.style.display = 'none';
          }

          requirement1Element.previousSibling.disabled = false;
          requirement2Element.previousSibling.disabled = false;
          requirement3Element.previousSibling.disabled = false;
          requirement4Element.previousSibling.disabled = false;
          requirement5Element.previousSibling.disabled = false;

          requirement1Element.previousSibling.checked = false;
          requirement2Element.previousSibling.checked = false;
          requirement3Element.previousSibling.checked = false;
          requirement4Element.previousSibling.checked = false;
          requirement5Element.previousSibling.checked = false;

          requirement1Element.innerHTML = requirements[0];
          requirement2Element.innerHTML = requirements[1];
          requirement3Element.innerHTML = requirements[2];
          requirement4Element.innerHTML = requirements[3];
          requirement5Element.innerHTML = requirements[4];

          clearElement.innerHTML = 'Clear Selection';
          viewElement.href = '/project/' + selected + '/view';
          viewElement.target = '_blank';
          viewElement.innerHTML = 'View Project';

        });
  };

  // load requirements on page load
  var requirement_check_load = function(selected, selectElement) {
    // event.preventDefault();
    // var selected = this.value;
    // var selectElement = event.target;
    var selectRow = selectElement.parentNode.parentNode;
    var requirement1Row = selectRow.nextSibling;
    var requirement2Row = requirement1Row.nextSibling;
    var requirement3Row = requirement2Row.nextSibling;
    var requirement4Row = requirement3Row.nextSibling;
    var requirement5Row = requirement4Row.nextSibling;

    var requirement1Element = requirement1Row.children[0].children[2];
    var requirement2Element = requirement2Row.children[0].children[1];
    var requirement3Element = requirement3Row.children[0].children[1];
    var requirement4Element = requirement4Row.children[0].children[1];
    var requirement5Element = requirement5Row.children[0].children[1];

    var clearElement = selectElement.nextSibling;
    var viewElement = selectElement.nextSibling.nextSibling.nextSibling;

    $.ajax({
          method: 'GET',
          url: '/project/' + selected + '/requirements/'
        })
        .done(function(obj) {
          var requirements = obj.requirements;
          console.log(requirements);

          requirement1Row.style.display = '';
          requirement2Row.style.display = '';
          requirement3Row.style.display = '';
          requirement4Row.style.display = '';
          requirement5Row.style.display = '';


          if (requirements[0] == ''){
            requirement1Row.style.display = 'none';
          }
          if (requirements[1] == ''){
            requirement2Row.style.display = 'none';
          }
          if (requirements[2] == ''){
            requirement3Row.style.display = 'none';
          }
          if (requirements[3] == ''){
            requirement4Row.style.display = 'none';
          }
          if (requirements[4] == ''){
            requirement5Row.style.display = 'none';
          }

          requirement1Element.previousSibling.disabled = false;
          requirement2Element.previousSibling.disabled = false;
          requirement3Element.previousSibling.disabled = false;
          requirement4Element.previousSibling.disabled = false;
          requirement5Element.previousSibling.disabled = false;
          requirement1Element.innerHTML = requirements[0];
          requirement2Element.innerHTML = requirements[1];
          requirement3Element.innerHTML = requirements[2];
          requirement4Element.innerHTML = requirements[3];
          requirement5Element.innerHTML = requirements[4];

          clearElement.innerHTML = 'Clear Selection';
          viewElement.href = '/project/' + selected + '/view';
          viewElement.target = '_blank';
          viewElement.innerHTML = 'View Project';


        });
  };

  // clear selection
  var clear_selection = function(event) {
    event.preventDefault();
    var selectElement = event.target.previousSibling;

    selectElement.value = '';

    var selectRow = selectElement.parentNode.parentNode;
    var requirement1Row = selectRow.nextSibling;
    var requirement2Row = requirement1Row.nextSibling;
    var requirement3Row = requirement2Row.nextSibling;
    var requirement4Row = requirement3Row.nextSibling;
    var requirement5Row = requirement4Row.nextSibling;

    var requirement1Element = requirement1Row.children[0].children[2];
    var requirement2Element = requirement2Row.children[0].children[1];
    var requirement3Element = requirement3Row.children[0].children[1];
    var requirement4Element = requirement4Row.children[0].children[1];
    var requirement5Element = requirement5Row.children[0].children[1];

    var clearElement = selectElement.nextSibling;
    var viewElement = selectElement.nextSibling.nextSibling.nextSibling;

    requirement1Row.style.display = 'none';
    requirement2Row.style.display = 'none';
    requirement3Row.style.display = 'none';
    requirement4Row.style.display = 'none';
    requirement5Row.style.display = 'none';

    requirement1Element.previousSibling.disabled = true;
    requirement2Element.previousSibling.disabled = true;
    requirement3Element.previousSibling.disabled = true;
    requirement4Element.previousSibling.disabled = true;
    requirement5Element.previousSibling.disabled = true;

    requirement1Element.previousSibling.checked = false;
    requirement2Element.previousSibling.checked = false;
    requirement3Element.previousSibling.checked = false;
    requirement4Element.previousSibling.checked = false;
    requirement5Element.previousSibling.checked = false;

    requirement1Element.innerHTML = '';
    requirement2Element.innerHTML = '';
    requirement3Element.innerHTML = '';
    requirement4Element.innerHTML = '';
    requirement5Element.innerHTML = '';

    clearElement.innerHTML = '';
    viewElement.href = '';
    viewElement.innerHTML = '';
  };


  // hide the requirements checkboxes
  $('.reqCheck').hide();

  //check if selected
  var most_interest = $('#most_interest')[0];
  if (most_interest.value != ''){
    requirement_check_load(most_interest.value, most_interest);
  }

  var high_interest = $('#high_interest')[0];
  if (high_interest.value != ''){
    requirement_check_load(high_interest.value, high_interest);
  }

  var moderate_interest = $('#moderate_interest')[0];
  if (moderate_interest.value != ''){
    requirement_check_load(moderate_interest.value, moderate_interest);
  }

  var low_interest = $('#low_interest')[0];
  if (low_interest.value != ''){
    requirement_check_load(low_interest.value, low_interest);
  }

  var least_interest = $('#least_interest')[0];
  if (least_interest.value != ''){
    requirement_check_load(least_interest.value, least_interest);
  }
  

  // Get requirements for selection
  $('#most_interest, #high_interest, #moderate_interest, #low_interest, #least_interest').on('change', requirement_check);

  // Clear selection
  $('.clear_select').on('click', clear_selection);


});