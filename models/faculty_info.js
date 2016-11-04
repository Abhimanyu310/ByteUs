'use strict';
module.exports = function(sequelize, DataTypes) {
    var FacultyInfo = sequelize.define('FacultyInfo', {
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
        post_doc_phone: DataTypes.STRING,
        post_doc_email: DataTypes.STRING,
        supervised_past: DataTypes.STRING,
        specific_students1: DataTypes.STRING,
        specific_students2: DataTypes.STRING,
        specific_students3: DataTypes.STRING,
    }, {
        paranoid: true,
        underscored: true,
        tableName: 'faculty_info',
        classMethods: {
            associate: function(models) {
                //
            }
        }
    });
    return FacultyInfo;
};