'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: {
            type     : DataTypes.STRING,
            allowNull: false,
            set      : function(val) {
                this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync(5), null));
            }
        },
        type: DataTypes.STRING


    }, {
        paranoid: true,
        underscored: true,
        tableName: 'users',
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Project, {
                    as : 'Project',
                    onDelete: "CASCADE"
                });

                User.hasMany(models.Student, {
                    as : 'Student',
                    onDelete: "CASCADE"
                });
            }
        },
        instanceMethods: {
            validPassword: function (password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });



    return User;
};