'use strict';
module.exports = function(sequelize, DataTypes) {
    var StudentAcademics = sequelize.define('StudentAcademics', {
        primary_major: DataTypes.STRING,
        secondary_major: DataTypes.STRING,
        gpa: DataTypes.STRING,
        next_fall_level: DataTypes.STRING,
        grad_month: DataTypes.STRING,
        grad_year: DataTypes.STRING,
        prev_research_exp: DataTypes.STRING,
        goldshirt: DataTypes.STRING,
        skill1: DataTypes.STRING,
        skill2: DataTypes.STRING,
        skill3: DataTypes.STRING

    }, {
        paranoid: true,
        underscored: true,
        tableName: 'student_academics',
        classMethods: {
            associate: function(models) {
                //
            }

        }
    });
    return StudentAcademics;
};