'use strict';
module.exports = function(sequelize, DataTypes) {
    var Match = sequelize.define('Match', {
        override: {type: DataTypes.STRING, defaultValue: 'No'},
        tbd1: DataTypes.STRING,
        tbd2: DataTypes.STRING,
        tdb3: DataTypes.STRING

    }, {
        paranoid: true,
        underscored: true,
        tableName: 'match',
        classMethods: {
            associate: function(models) {
                Match.belongsTo(models.Project, {
                    as : 'Project',
                    onDelete: "CASCADE"
                });
                Match.belongsTo(models.Student, {
                    as : 'Student',
                    onDelete: "CASCADE"
                });
            }
        }
    });
    return Match;
};