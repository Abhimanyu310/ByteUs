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
            $('#projectname'+projectid).text(projects[i].description);
            findmatching(projectid,projects[i].description);
          }
       	});
      function findmatching(projectid,text)
      {
        $.ajax({
              method: 'GET',
              url: '/admin/' + projectid + '/view/'
            })
            .done(function(matchobj) {
              //console.log(obj);
             var matched_id = matchobj.matched_id;
             //console.log(projects[i].id);
             console.log(matched_id);
             if(matched_id!=0){
                console.log('True');
                $.ajax({
                  method: 'GET',
                  url: '/application/' + matched_id + '/view/'
                })
                .done(function(studentobj) {
                  console.log(studentobj);
                  console.log(text);
                  student = studentobj.application;
                  $('#AllottedStudentname'+projectid).text(student.name);
                  $('#sid'+projectid).text(student.sid);
                  $('#primajor'+projectid).text(student.Academics.primary_major);
                  $('#secmajor'+projectid).text(student.Academics.secondary_major);
                  $('#levelinschool'+projectid).text(student.Academics.next_fall_level);
                  $('#graddate'+projectid).text(student.Academics.grad_month+'/'+student.Academics.grad_year);
                  $('#gpa'+projectid).text(student.Academics.gpa);
                  $('#gender'+projectid).text(student.gender);
                  $('#ethnicity'+projectid).text(student.race);
                  $('#previousexperience'+projectid).text(student.prev_research_exp);
                  $('#otheremployment'+projectid).text(student.Apprenticeship.prev_application);
                  if(student.Apprenticeship.most_interest)
                  {  
                    $('#mostint'+projectid).attr("href",'/project/'+student.Apprenticeship.most_interest+'/view');
                    $('#mostint'+projectid).text("Most Int");
                  }
                  else
                  {
                    $('#mostint'+projectid).hide();

                  }
                  if(student.Apprenticeship.high_interest)
                  {  
                    $('#highint'+projectid).attr("href",'/project/'+student.Apprenticeship.high_interest+'/view');
                    $('#highint'+projectid).text("High Int");
                  }
                  else
                  {
                    $('#highint'+projectid).hide();

                  }
                  if(student.Apprenticeship.moderate_interest)
                  {  
                    $('#modint'+projectid).attr("href",'/project/'+student.Apprenticeship.moderate_interest+'/view');
                    $('#modint'+projectid).text("Mode Int");
                  }
                  else
                  {
                    $('#modint'+projectid).hide();

                  }
                  if(student.Apprenticeship.low_interest)
                  {  
                    $('#lowint'+projectid).attr("href",'/project/'+student.Apprenticeship.low_interest+'/view');
                    $('#lowint'+projectid).text("low Int");
                  }
                  else
                  {
                    $('#lowint'+projectid).hide();

                  }
                  if(student.Apprenticeship.least_interest)
                  {  
                    $('#leastint'+projectid).attr("href",'/project/'+student.Apprenticeship.least_interest+'/view');
                    $('#leastint'+projectid).text("least Int");
                  }
                  else
                  {
                    $('#leastint'+projectid).hide();

                  }
                });
             }
             else
             {
              $('#mostint'+projectid).hide();
              $('#highint'+projectid).hide();
              $('#modint'+projectid).hide();
              $('#lowint'+projectid).hide();
              $('#leastint'+projectid).hide();
             }
            });
      }
  //    }
  //$('.match').on('click', showvalues);
});