'use strict';

$(document).ready(function() {
 // var showvalues = function(event) {
    //$('#test').text('HEllo');
    //console.log($('#test').text());
    //console.log($('#projectname').val());
    //console.log('inside fn');	
    	//var value = $('#projectname').text();
		//var value = 36;
		//console.log(value);
    var student;
		$.ajax({
          method: 'GET',
          url: '/project/viewlist/'
        })
        .done(function(projectobj) {
           console.log(projectobj);
           var projects = projectobj.projects;
           console.log(projects);
           for(var i=0;i<projects.length;i++)
           {
            //console.log(projects[i].id);
            var projectid = projects[i].id;
            console.log(projectid);
            $('#projectname'+projects[i].id).text(projects[i].description);
            $.ajax({
              method: 'GET',
              url: '/admin/' + projects[i].id + '/view/'
            })
            .done(function(matchobj) {
            //console.log(obj);
        	   var matched_id = matchobj.matched_id;
             //console.log(projects[i].id);
        	   console.log(matched_id);
             if(matched_id!=0){
               // console.log('True');
                $.ajax({
                  method: 'GET',
                  url: '/application/' + matched_id + '/view/'
                })
                .done(function(studentobj) {
                  //console.log(studentobj);
                  student = studentobj.application;
                  //console.log(student.name);
                });
             }
            });
            console.log(i);
            //console.log(student);
            if(student){
              $('#AllottedStudentname'+i).text(student.name);
              console.log(student.name);
            }
          }
       	});
  //    }
  //$('.match').on('click', showvalues);
});