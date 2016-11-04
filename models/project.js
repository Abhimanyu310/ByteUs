'use strict';
module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define('Project', {
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
		submitted: {type: DataTypes.STRING, defaultValue: 'No'}

  }, {
	paranoid: true,
    underscored: true,
    tableName: 'projects',
	classMethods: {
	  associate: function(models) {
          Project.belongsTo(models.FacultyInfo, {
              as : 'Faculty',
              onDelete: "CASCADE"
          });
	  }
	}
  });
  return Project;
};