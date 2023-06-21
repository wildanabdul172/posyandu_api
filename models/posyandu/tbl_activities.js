const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_activities', {
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
    sequelize,
    tableName: 'tbl_activities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "activity_id" },
        ]
      },
      {
        name: "activity_location",
        using: "BTREE",
        fields: [
          { name: "activity_location" },
        ]
      },
    ]
  });
};
