var models  = require('../models');




module.exports = {

    getProjectList: function(req, res, next){
        models.Project.findAll().then(function(projects) {
            res.render('project/project-list', {
                title: 'Project List',
                header: 'Complete Listing of Discovery Learning Apprenticeships',
                projects: projects,

                csrfToken: req.csrfToken()
            });
        }).catch(function (error) {
            //error handling
            // console.log(error)
        });
    },

    getProjectRequirements: function(req, res, next){
        var projectId = req.params.id;
        models.Project.findOne({
            where: {id: projectId}
        }).then(function (project) {
            var requirements = [project.requirements1, project.requirements2, project.requirements3, project.requirements4, project.requirements5];
            res.status(200).json({
                message: 'Success',
                requirements: requirements
            });
        });
    },


    getCreateProject: function(req, res, next) {
        var validation_errors = req.flash('errors');
        var success = req.flash('success');
        var form_data = req.flash('form_data');
        res.render('project/form', {
            title: 'Faculty Form',
            errors: validation_errors,
            hasErrors: validation_errors.length > 0,
            success: success,
            hasSuccess: success.length > 0,
            formData: form_data[0],
            csrfToken: req.csrfToken()
        });
    },

    getEditProject: function(req, res, next){
        var projectId = req.params.id;
        models.Project.findOne({
            where: {id: projectId},
            include: [ {model: models.FacultyInfo, as: 'Faculty'} ]
        }).then(function (project){
            // console.log(project)
            if (project.submitted == 'Yes'){
                res.redirect('/project/'+projectId+'/view');
            }
            else{
                res.render('project/form', {
                    title: "Edit Project",
                    project: project,
                    csrfToken: req.csrfToken()
                    // message: req.flash('success')
                });
            }

        });
    },
    
    postCreateProject: function(req, res, next) {
        if (req.body.action == 'Submit'){

            req.checkBody('phone', 'Please enter a valid phone number').notEmpty().isInt();
            req.checkBody('email', 'Please enter a valid email').notEmpty().isEmail();
            req.checkBody('faculty_department', 'Please enter a department').notEmpty();
            req.checkBody('edc', 'Please select if the project has a focus on Engineering for Developing Communities').notEmpty();

            // req.checkBody('secondary_phone', 'Please enter a valid secondary faculty phone number').optional().isInt();
            // req.checkBody('secondary_email', 'Please enter a valid secondary faculty email').optional().isEmail();

            // req.checkBody({
            //     'secondary_email': {
            //         optional: {
            //             options: {checkFalsy: false} // or: [{ checkFalsy: true }]
            //         },
            //         isEmail: {
            //             errorMessage: 'Invalid Email for gods sake'
            //         }
            //     }
            // });

            req.checkBody('longdescription', 'Please enter a description for your project').notEmpty();
            req.checkBody('areas', 'Please select the majors to recruit the students from').notEmpty();
            req.checkBody('supervision_req', 'Please select the amount of supervision required').notEmpty();
            req.checkBody('supervision_provided', 'Please select the amount of supervision provided').notEmpty();
            req.checkBody('nature_of_work', 'Please select the nature of work').notEmpty();
            req.checkBody('prior_work', 'Please select the required prior work').notEmpty();
            req.checkBody('contact', 'Please enter the accounting contact for the project').notEmpty();
            req.checkBody('supervised_past', 'Please indicate if you have supervised a Discovery Learning Apprentice in the past').notEmpty();

        }
        req.checkBody('name', 'You need to enter your name').notEmpty();
        req.checkBody('description', 'You need to enter the project title').notEmpty();
        var errors = req.validationErrors(true);
        if (errors) {
            req.flash('errors', errors);
            req.flash('form_data', req.body);
            // req.flash('success', "HAHA")
            res.redirect('/project/form');
        }
        else{
            if (req.body.areas){
                if( typeof req.body.areas === 'string' ) {
                    areas = req.body.areas;
                }
                else{
                    var areas = req.body.areas[0];
                    for(var i = 1; i < req.body.areas.length; i++){
                        areas +=  ',' + req.body.areas[i];
                    }
                }
            }
            var action;
            if (req.body.action == 'Save'){
                action = 'No';
            }
            else if (req.body.action == 'Submit'){
                action = 'Yes';
            }

            addProjectToDB(req, res, next, areas, action);
        }
        
    },
    
    getProjectDetail: function(req, res, next) {
        var projectId = req.params.id;
        models.Project.findOne({
            where: {id: projectId},
            include: [ {model: models.FacultyInfo, as: 'Faculty'} ]
        }).then(function (project){
            // console.log(project)
            res.render('project/project-single', {
                title: "Project List",
                project: project
            });
        });
    },

    getProjectSuccess: function(req, res, next) {
        var success = req.flash('success');
        res.render('project/success', {
            title: "Success",
            success: success,
            hasSuccess: success.length > 0
        });
    },

    postSearchProject: function(req, res, next) {
        switch(req.body.search_by) {
            case 'title':
                postSearchProjectByTitle(req, res, next);
                break;
            case 'faculty':
                postSearchProjectByFaculty(req, res, next);
                break;
            case 'description':
                postSearchProjectByDescription(req, res, next);
                break;
            case 'department':
                postSearchProjectByDepartment(req, res, next);
                break;
            case 'major':
                postSearchProjectByMajor(req, res, next);
                break;
            default:
                postSearchProjectByTitle(req, res, next);
        }
    }

};


// submit or save the project
function addProjectToDB(req, res, next, areas, action){

    if (req.session.CU){
        var user_id = req.session.cu_user.id;
    }
    else{
        user_id = req.user.id;
    }
    
    
    //define the project
    var Project = {
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
        submitted : action
    };

    var Faculty = {
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
        post_doc_phone: req.body.post_doc_phone,
        post_doc_email: req.body.post_doc_email,
        supervised_past: req.body.supervised_past,
        specific_students1: req.body.specific_students1,
        specific_students2: req.body.specific_students2,
        specific_students3: req.body.specific_students3
    };

    models.Project.findOne({
        where: {
            id: req.body.id
        },
        include: [
            {model: models.FacultyInfo, as: 'Faculty'}
        ]
    }).then(function (project) {
        if(project){
            project.updateAttributes(Project)
                .then(function (project) {
                    project.Faculty.updateAttributes(Faculty)
                        .then(function (faculty) {
                            req.flash('success', 'Project Successfully Saved!');
                            res.redirect('success');
                        });
                }).catch(function (error) {
                //error handling
                console.log(error)
            });
        }
        else{
            var new_project = models.Project.create({
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
                submitted : action,
                user_id: user_id,
                Faculty: Faculty
            }, {
                include: [ {model: models.FacultyInfo, as: 'Faculty'} ]
            }).then(function (task) {
                // task.setFaculty([faculty]).then(function () {
                //         //done
                //     });
                // console.log(task)
                if (action == 'Yes'){
                    req.flash('success', 'Project Submission Successful!');
                    res.redirect('success');
                }
                else{
                    req.flash('success', 'Project Successfully Saved!');
                    res.redirect('/user/faculty-home');
                }


            }).catch(function (error) {
                //error handling
                console.log(error)
            });
        }
    });

}

function postSearchProjectByTitle(req, res, next) {
    var order_by = req.body.sort || 'asc';
    models.Project.findAll({
        where: {
            description: {
                $like: '%' + req.body.search_query + '%'
            }

        },
        order: [
            ['updated_at', order_by],
            ],
        include: [ {model: models.FacultyInfo, as: 'Faculty'} ]
    }).then(function (projects){
        res.render('project/project-list', {
            title: "Search Results",
            header: "Search Results",
            projects: projects,
            csrfToken: req.csrfToken(),
            prev_value: req.body.search_query,
            title_search: true,
            recent : order_desc(order_by)
        });
    });
}

function postSearchProjectByDescription(req, res, next) {
    var order_by = req.body.sort || 'asc';
    models.Project.findAll({
        where: {
            longdescription: {
                $like: '%' + req.body.search_query + '%'
            }
        },
        order: [
            ['updated_at', order_by],
        ],
        include: [ {model: models.FacultyInfo, as: 'Faculty'} ]
    }).then(function (projects){
        res.render('project/project-list', {
            title: "Search Results",
            header: "Search Results",
            projects: projects,
            csrfToken: req.csrfToken(),
            prev_value: req.body.search_query,
            description_search: true,
            recent : order_desc(order_by)
        });
    });
}

function postSearchProjectByFaculty(req, res, next) {
    var order_by = req.body.sort || 'asc';
    models.Project.findAll({
        order: [
            ['updated_at', order_by],
        ],
        include: [{
            model: models.FacultyInfo, 
            as: 'Faculty',
            where: {
                name: {
                    $like: '%' + req.body.search_query + '%'
                }
            }
        }]
    }).then(function (projects){
        res.render('project/project-list', {
            title: "Search Results",
            header: "Search Results",
            projects: projects,
            csrfToken: req.csrfToken(),
            prev_value: req.body.search_query,
            faculty_search: true,
            recent : order_desc(order_by)
        });
    });
}

function postSearchProjectByDepartment(req, res, next) {
    var order_by = req.body.sort || 'asc';
    models.Project.findAll({
        order: [
            ['updated_at', order_by],
        ],
        include: [{
            model: models.FacultyInfo, 
            as: 'Faculty',
            where: {
                faculty_department: {
                    $like: '%' + req.body.search_query + '%'
                }
            }
        }]
    }).then(function (projects){
        res.render('project/project-list', {
            title: "Search Results",
            header: "Search Results",
            projects: projects,
            csrfToken: req.csrfToken(),
            prev_value: req.body.search_query,
            department_search: true,
            recent : order_desc(order_by)
        });
    });
}

function postSearchProjectByMajor(req, res, next) {
    var order_by = req.body.sort || 'asc';
    models.Project.findAll({
        where: {
            areas: {
                $like: '%' + req.body.search_query + '%'
            }

        },
        order: [
            ['updated_at', order_by],
        ],
        include: [ {model: models.FacultyInfo, as: 'Faculty'} ]
    }).then(function (projects){
        res.render('project/project-list', {
            title: "Search Results",
            header: "Search Results",
            projects: projects,
            csrfToken: req.csrfToken(),
            prev_value: req.body.search_query,
            major_search: true,
            recent : order_desc(order_by)
        });
    });
}

function order_desc(order_by){
    return order_by == 'desc';
}
