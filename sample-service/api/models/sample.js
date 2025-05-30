"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableName = "Sample";
function sequelizeImport(sequelize, DataTypes) {
    const Sample = sequelize.define(exports.TableName, {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        idNumber: {
            type: DataTypes.INTEGER,
            defaultValue: -1
        },
        animalId: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        tag: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        comment: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        sampleDate: DataTypes.DATE,
        activeRegistrationTransformId: {
            type: DataTypes.TEXT,
            defaultValue: '',
        },
    }, {
        classMethods: {
            associate: function (models) {
                Sample.hasMany(models.RegistrationTransform, { foreignKey: 'sampleId', as: 'registrationTransforms' });
                Sample.belongsTo(models.MouseStrain, { foreignKey: 'mouseStrainId', as: 'mouseStrain' });
            }
        },
        timestamps: true,
        paranoid: true
    });
    return Sample;
}
exports.sequelizeImport = sequelizeImport;
;
//# sourceMappingURL=sample.js.map