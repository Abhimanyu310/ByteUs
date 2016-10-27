var models  = require('../models');
// var express = require('express');
// var router = express.Router();
// var csrf = require('csurf');
// var csrfProtection = csrf();
// router.use(csrfProtection);



module.exports = {

    getProjectList: function(req, res, next){
        console.log(req.flash('message'));
        models.Project.findAll().then(function(projects) {
            res.render('project_list', {
                title: 'List of Projects',
                projects: projects,
                message: req.flash('success')
            });
        });
    },
    
    getCreateProject: function(req, res, next) {
        var messages = req.flash('error');
        console.log(messages);
        res.render('Faculty_Form', { messages: messages, csrfToken: req.csrfToken() });
    },
    
    postCreateProject: function(req, res, next) {
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('name', 'Invalid name').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach(function (error) {
                messages.push(error.msg);
            });
            req.flash('error', messages);
            res.redirect('/submit-project');
        }

        if (req.body.areas){
            var areas = req.body.areas[0];
            for(i = 1; i < req.body.areas.length; i++){
                areas +=  ', ' + req.body.areas[i];
            }
        }

        var project = models.Project.create({
            description: req.body.description,
            url: req.body.url,
            requirements1: req.body.requirements1,
            requirements2: req.body.requirements2,
            requirements3: req.body.requirements3,
            requirements4: req.body.requirements4,
            requirements5: req.body.requirements5,
            longdescription: req.body.longdescription,
            areas: areas,
            supervision_req: req.body.supervision_req,
            supervision_provided: req.body.supervision_provided,
            nature_of_work: req.body.nature_of_work,
            nature_of_work_other: req.body.nature_of_work_other,
            prior_work: req.body.prior_work,
            prior_work_other: req.body.prior_work_other,
            match_of_funding: req.body.match_of_funding,
            not_sure: req.body.not_sure,
            contact: req.body.contact,
            Faculty: {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                faculty_department: req.body.faculty_department,
                edc: req.body.edc,
                secondary_name: req.body.secondary_name,
                secondary_phone: req.body.secondary_phone,
                secondary_email: req.body.secondary_email,
                secondary_faculty_department: req.body.secondary_faculty_department,
                post_doc_name: req.body.post_doc_name,
                post_doc_phone1: req.body.post_doc_phone1,
                post_doc_phone2: req.body.post_doc_phone2,
                post_doc_phone3: req.body.post_doc_phone3,
                post_doc_email: req.body.post_doc_email,
                supervised_past: req.body.supervised_past,
                specific_students1: req.body.specific_students1,
                specific_students2: req.body.specific_students2,
                specific_students3: req.body.specific_students3
            }
        }, {
            include: [ {model: models.FacultyInfo, as: 'Faculty'} ]
        }).then(function (task) {
            // task.setFaculty([faculty]).then(function () {
            //         //done
            //     });
            console.log(task)
            // res.render('Faculty_Form', { title: task.name });
        }).catch(function (error) {
            //error handling
            console.log(error)
        });
    },
    
    getProjectDetail: function(req, res, next) {
        var projectId = req.params.id;
        models.Project.findOne({
            where: {id: projectId},
            include: [ {model: models.FacultyInfo, as: 'Faculty'} ]
        }).then(function (project){
            console.log(project)
            res.render('project_single', {
                project: project
                // message: req.flash('success')
            });
        });
        // res.render('Logout', { title: "Logout" });
    }
};
