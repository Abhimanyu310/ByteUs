'use strict';

// test
$(function(){
    var $primPhone = $('#form_primPhone');
    $primPhone.on('click', function() {
        $(this).css('background-color', '#ee9');
    });
});

// TODO: Logic to prevent form submission if bad input

// phone number regex notes

// simple
// \d{3}[-.]?\d{3}[-.]?\d{4}\b

// works ok, forgiving:
// [(]?\d{3}[)-.]?[ ]?\d{3}[-. ]?\d{4}\b

// these match more:
// (\(\d{3}\)|\d{3}[-]?)[ ]?\d{3}[ -]?\d{4}
// (?:\(\d{3}\)|\d{3}[-]?)[ ]?\d{3}[ -]?\d{4}

// might not work:
// ^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$
// ^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$
