'use strict';
module.exports = function(sequelize, DataTypes) {
    var StudentApprenticeship = sequelize.define('StudentApprenticeship', {
        prev_application: DataTypes.STRING,
        fall_employment_plans: DataTypes.TEXT,
        most_interest: DataTypes.STRING,
        most_interest_req1: DataTypes.STRING,
        most_interest_req2: DataTypes.STRING,
        most_interest_req3: DataTypes.STRING,
        most_interest_req4: DataTypes.STRING,
        most_interest_req5: DataTypes.STRING,
        high_interest: DataTypes.STRING,
        high_interest_req1: DataTypes.STRING,
        high_interest_req2: DataTypes.STRING,
        high_interest_req3: DataTypes.STRING,
        high_interest_req4: DataTypes.STRING,
        high_interest_req5: DataTypes.STRING,
        moderate_interest: DataTypes.STRING,
        moderate_interest_req1: DataTypes.STRING,
        moderate_interest_req2: DataTypes.STRING,
        moderate_interest_req3: DataTypes.STRING,
        moderate_interest_req4: DataTypes.STRING,
        moderate_interest_req5: DataTypes.STRING,
        low_interest: DataTypes.STRING,
        low_interest_req1: DataTypes.STRING,
        low_interest_req2: DataTypes.STRING,
        low_interest_req3: DataTypes.STRING,
        low_interest_req4: DataTypes.STRING,
        low_interest_req5: DataTypes.STRING,
        least_interest: DataTypes.STRING,
        least_interest_req1: DataTypes.STRING,
        least_interest_req2: DataTypes.STRING,
        least_interest_req3: DataTypes.STRING,
        least_interest_req4: DataTypes.STRING,
        least_interest_req5: DataTypes.STRING,
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