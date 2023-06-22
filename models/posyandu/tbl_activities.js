const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const TblActivities = sequelize.define('tbl_activities', {
    activity_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    activity_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    activity_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    activity_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    activity_location: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_posyandu',
        key: 'posyandu_id'
      }
    }
  }, {
    tableName: 'tbl_activities',
    timestamps: false,
  });

  TblActivities.associate = function(models) {
    TblActivities.belongsTo(models.tbl_posyandu, {
      foreignKey: 'activity_location',
      as: 'posyandu',
    });
  };

  return TblActivities;
};