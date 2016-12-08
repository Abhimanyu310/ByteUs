'use strict';

$(document).ready(function() {
  var getprojectdetails = function(projectid,pid,prefno)
  {
    var text;
    $.ajax({
          method: 'GET',
          url: '/project/viewlist/'
        })
        .done(function(projectobj) 
        {
           var projects = projectobj.projects;
           for(var i=0;i<projects.length;i++)
           {
              if(projects[i].id==projectid)
              {
                text = projects[i].description;
              }
           }
           //console.log(projectid);
           //console.log(pid);
           //console.log(text);
           switch(prefno){
            case 1:
              $('#mostint'+pid).text(text);
              break; 
            case 2:
              $('#highint'+pid).text(text);
              break; 
            case 3:
              $('#modint'+pid).text(text);
              break; 
            case 4:
              $('#lowint'+pid).text(text);
              break; 
            case 5:
              $('#leastint'+pid).text(text);
              break; 
           }
           
        });
  }
  function findstudentdetail(projectid,student)
  {
             // $('#AllottedStudentname'+projectid).val(student.id);
             //console.log(student);
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
                getprojectdetails(student.Apprenticeship.most_interest,projectid,1);
                $('#mostint'+projectid).attr("href",'/project/'+student.Apprenticeship.most_interest+'/view');
              }
              else
              {
                $('#mostint'+projectid).hide();
              }
              if(student.Apprenticeship.high_interest)
              {  
                getprojectdetails(student.Apprenticeship.high_interest,projectid,2);
                $('#highint'+projectid).attr("href",'/project/'+student.Apprenticeship.high_interest+'/view');
              }
              else
              {
                $('#highint'+projectid).hide();
              }
              if(student.Apprenticeship.moderate_interest)
              {  
                getprojectdetails(student.Apprenticeship.moderate_interest,projectid,3);
                $('#modint'+projectid).attr("href",'/project/'+student.Apprenticeship.moderate_interest+'/view');
              }
              else
              {
                $('#modint'+projectid).hide();
              }
              if(student.Apprenticeship.low_interest)
              {  
                getprojectdetails(student.Apprenticeship.low_interest,projectid,4);
                $('#lowint'+projectid).attr("href",'/project/'+student.Apprenticeship.low_interest+'/view');
              }
              else
              {
                $('#lowint'+projectid).hide();
              }
              if(student.Apprenticeship.least_interest)
              {  
                getprojectdetails(student.Apprenticeship.least_interest,projectid,5);
                $('#leastint'+projectid).attr("href",'/project/'+student.Apprenticeship.least_interest+'/view');
              }
              else
              {
                $('#leastint'+projectid).hide();
              }
  }
  function clearfields(projectid)
  {
    $('#sid'+projectid).text('');
    $('#primajor'+projectid).text('');
    $('#secmajor'+projectid).text('');
    $('#levelinschool'+projectid).text('');
    $('#graddate'+projectid).text('');
    $('#gpa'+projectid).text('');
    $('#gender'+projectid).text('');
    $('#ethnicity'+projectid).text('');
    $('#previousexperience'+projectid).text('');
    $('#otheremployment'+projectid).text('');
    $('#mostint'+projectid).attr("href",'');
    $('#mostint'+projectid).text('');
    $('#highint'+projectid).attr("href",'');
    $('#highint'+projectid).text('');
    $('#modint'+projectid).attr("href",'');
    $('#modint'+projectid).text('');
    $('#lowint'+projectid).attr("href",'');
    $('#lowint'+projectid).text('');
    $('#leastint'+projectid).attr("href",'');
    $('#leastint'+projectid).text('');

  }
  function findmatching(projectid,text)
  {
    $.ajax({
        method: 'GET',
        url: '/admin/' + projectid + '/view/'
      })
      .done(function(matchobj) {
        var matched_id = matchobj.matched_id;
          if(matched_id!=0){
            $.ajax({
              method: 'GET',
              url: '/application/' + matched_id + '/view/'
            })
            .done(function(studentobj) {
              var student = studentobj.application;
              $('#AllottedStudentname'+projectid).val(student.id);
              findstudentdetail(projectid,student);
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
    $.ajax({
          method: 'GET',
          url: '/project/viewlist/'
        })
        .done(function(projectobj) 
        {
           var projects = projectobj.projects;
           for(var i=0;i<projects.length;i++)
           {
              var projectid = projects[i].id;
              var student;
              $('#projectname'+projectid).text(projects[i].description);
              findmatching(projectid,projects[i].description);
              $('#AllottedStudentname'+projectid).on("change",function()
                {
                  //console.log(this.value);
                  //findstudentdetail(projectid,this.value);
                  var id = this.value;
                  var name = this.id;
                  var pid = name.replace(/\D/g,'');
                  $.ajax({
                    method: 'GET',
                    url: '/application/' + id + '/view/'
                  })
                  .done(function(studentobj) {
                      student = studentobj.application;
                      $('#Overwrite'+pid).attr('checked',true);
                      //console.log(pid);
                      
                      //console.log(student);
                     //s clearfields(projectid);
                      findstudentdetail(pid,student);
                    });
                });
              //console.log(selectedid);
            }
        });
});