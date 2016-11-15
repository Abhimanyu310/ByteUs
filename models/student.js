'use strict';
module.exports = function(sequelize, DataTypes) {
    var Student = sequelize.define('Student', {
        name: DataTypes.STRING,
        sid: DataTypes.STRING,
        gender: DataTypes.STRING,
        hispanic_latino: DataTypes.STRING,
        race: DataTypes.STRING,
        submitted: {type: DataTypes.STRING, defaultValue: 'No'}

    }, {
        paranoid: true,
        underscored: true,
        tableName: 'students',
        classMethods: {
            associate: function(models) {
                Student.belongsTo(models.StudentContact, {
                    as : 'Contact',
                    onDelete: "CASCADE"
                });
                Student.belongsTo(models.StudentAcademics, {
                    as : 'Academics',
                    onDelete: "CASCADE"
                });
                Student.belongsTo(models.StudentApprenticeship, {
                    as : 'Apprenticeship',
                    onDelete: "CASCADE"
                });
            }
        }
    });
    return Student;
};