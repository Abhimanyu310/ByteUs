'use strict';

$(document).ready(function() {
	var setvalues = function(event) {
		console.log('inside fn');	
    	var value = this.value;
	
		console.log(value);
		$('#Overwrite').prop('checked',true);
		$.ajax({
          method: 'GET',
          url: '/application/' + value + '/view/'
        })
        .done(function(obj) {
        	var application = obj.application;
        	console.log(application);
       	});
    }
    $('#AllottedStudentName').change(setvalues)
});