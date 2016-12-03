'use strict';
module.exports = function(sequelize, DataTypes) {
    var StudentApprenticeship = sequelize.define('StudentApprenticeship', {
        prev_application: DataTypes.STRING,
        fall_employment_plans: DataTypes.TEXT,
        most_interest: DataTypes.STRING,
        most_interest_req1: {type: DataTypes.STRING, defaultValue: 'No'},
        most_interest_req2: {type: DataTypes.STRING, defaultValue: 'No'},
        most_interest_req3: {type: DataTypes.STRING, defaultValue: 'No'},
        most_interest_req4: {type: DataTypes.STRING, defaultValue: 'No'},
        most_interest_req5: {type: DataTypes.STRING, defaultValue: 'No'},
        high_interest: DataTypes.STRING,
        high_interest_req1: {type: DataTypes.STRING, defaultValue: 'No'},
        high_interest_req2: {type: DataTypes.STRING, defaultValue: 'No'},
        high_interest_req3: {type: DataTypes.STRING, defaultValue: 'No'},
        high_interest_req4: {type: DataTypes.STRING, defaultValue: 'No'},
        high_interest_req5: {type: DataTypes.STRING, defaultValue: 'No'},
        moderate_interest: DataTypes.STRING,
        moderate_interest_req1: {type: DataTypes.STRING, defaultValue: 'No'},
        moderate_interest_req2: {type: DataTypes.STRING, defaultValue: 'No'},
        moderate_interest_req3: {type: DataTypes.STRING, defaultValue: 'No'},
        moderate_interest_req4: {type: DataTypes.STRING, defaultValue: 'No'},
        moderate_interest_req5: {type: DataTypes.STRING, defaultValue: 'No'},
        low_interest: DataTypes.STRING,
        low_interest_req1: {type: DataTypes.STRING, defaultValue: 'No'},
        low_interest_req2: {type: DataTypes.STRING, defaultValue: 'No'},
        low_interest_req3: {type: DataTypes.STRING, defaultValue: 'No'},
        low_interest_req4: {type: DataTypes.STRING, defaultValue: 'No'},
        low_interest_req5: {type: DataTypes.STRING, defaultValue: 'No'},
        least_interest: DataTypes.STRING,
        least_interest_req1: {type: DataTypes.STRING, defaultValue: 'No'},
        least_interest_req2: {type: DataTypes.STRING, defaultValue: 'No'},
        least_interest_req3: {type: DataTypes.STRING, defaultValue: 'No'},
        least_interest_req4: {type: DataTypes.STRING, defaultValue: 'No'},
        least_interest_req5: {type: DataTypes.STRING, defaultValue: 'No'},
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