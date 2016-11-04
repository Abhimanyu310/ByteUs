'use strict';
module.exports = function(sequelize, DataTypes) {
    var StudentContact = sequelize.define('StudentContact', {
        street_address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        summer_street_address: DataTypes.STRING,
        summer_city: DataTypes.STRING,
        summer_state: DataTypes.STRING,
        summer_zip: DataTypes.STRING,
        summer_phone: DataTypes.STRING,
        summer_email: DataTypes.STRING


    }, {
        paranoid: true,
        underscored: true,
        tableName: 'student_contact',
        classMethods: {
            associate: function(models) {
            //
            }

        }
    });
    return StudentContact;
};