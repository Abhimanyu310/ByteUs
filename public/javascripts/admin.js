'use strict';

$(document).ready(function() {
	var setvalues = function(event) {
		console.log('inside fn');	
    	//var value = $('#projectname').text();
		var value = 36;
		console.log(value);
		$.ajax({
          method: 'GET',
          url: '/project/list/'
        })
        .done(function(projectobj) {
           var projects = projectobj.projects;
           console.log(projectobj);
          $.ajax({
            method: 'GET',
            url: '/admin/' + value + '/view/'
          })
          .done(function(matchobj) {
            //console.log(obj);
        	 var matched_id = matchobj.matched_id;
        	 console.log(matched_id);

          });
       	});
    }
    $('#AllottedStudentName').change(setvalues)
});