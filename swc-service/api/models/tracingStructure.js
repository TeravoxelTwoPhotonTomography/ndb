const TableName = "TracingStructure";

module.exports = function(sequelize, DataTypes) {
    const TracingStructure = sequelize.define(TableName, {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: DataTypes.TEXT
    }, {
        classMethods: {
            associate: models => {
                TracingStructure.hasMany(models.Tracing, {foreignKey: "tracingStructureId", as: "Tracings"});
            }
        },
        timestamps: true,
        paranoid: true
    });

    return TracingStructure;
};
