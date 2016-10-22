'use strict';
module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define('Project', {
	    name: DataTypes.STRING,
		phone: DataTypes.STRING,
		email: DataTypes.STRING,
		faculty_department: DataTypes.STRING,
		edc: DataTypes.STRING,
		secondary_name: DataTypes.STRING,
		secondary_phone: DataTypes.STRING,
		secondary_email: DataTypes.STRING,
		secondary_faculty_department: DataTypes.STRING,
		post_doc_name: DataTypes.STRING,
		post_doc_phone1: DataTypes.STRING,
		post_doc_phone2: DataTypes.STRING,
		post_doc_phone3: DataTypes.STRING,
		post_doc_email: DataTypes.STRING,
		description: DataTypes.TEXT,
		url: DataTypes.STRING,
		requirements1: DataTypes.TEXT,
		requirements2: DataTypes.TEXT,
		requirements3: DataTypes.TEXT,
		requirements4: DataTypes.TEXT,
		requirements5: DataTypes.TEXT,
		longdescription: DataTypes.TEXT,
		areas: DataTypes.STRING,
		supervision_req: DataTypes.STRING,
		supervision_provided: DataTypes.STRING,
		nature_of_work: DataTypes.STRING,
		nature_of_work_other: DataTypes.STRING,
		prior_work: DataTypes.STRING,
		prior_work_other: DataTypes.STRING,
		match_of_funding: DataTypes.STRING,
		not_sure: DataTypes.STRING,
		contact: DataTypes.STRING,
		supervised_past: DataTypes.STRING,
		specific_students1: DataTypes.STRING,
		specific_students2: DataTypes.STRING,
		specific_students3: DataTypes.STRING,
  }, {
	classMethods: {
	  associate: function(models) {
		// associations can be defined here
	  }
	}
  });
  return Project;
};