'use strict';
module.exports = function(sequelize, DataTypes) {
    var StudentApprenticeship = sequelize.define('StudentApprenticeship', {
        prev_application: DataTypes.STRING,
        fall_employment_plans: DataTypes.TEXT,
        most_interest: DataTypes.STRING,
        high_interest: DataTypes.STRING,
        moderate_interest: DataTypes.STRING,
        low_interest: DataTypes.STRING,
        least_interest: DataTypes.STRING,
        background_check: DataTypes.STRING,
        awareness_training: DataTypes.STRING,
        ssn: DataTypes.STRING

    }, {
        paranoid: true,
        underscored: true,
        tableName: 'student_apprenticeship',
        classMethods: {
            associate: function(models) {
                //
            }

        }
    });
    return StudentApprenticeship;
};