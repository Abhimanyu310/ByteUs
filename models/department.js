'use strict';
module.exports = function(sequelize, DataTypes) {
	var Department = sequelize.define('Department', {
		shortname: DataTypes.STRING,
		fullname: DataTypes.STRING,

  }, {
	paranoid: true,
    underscored: true,
    tableName: 'departments',
	classMethods: {
	  associate: function(models) {
          //
          });
	  }
	}
  });
  return Department;
};