const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_healthrecords', {
    record_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    child_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_children',
        key: 'child_id'
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date_of_record: {
      type: DataTypes.DATE,
      allowNull: true
    },
    head_circumference: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    arm_circumference: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    immunization: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbl_healthrecords',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "record_id" },
        ]
      },
      {
        name: "child_id",
        using: "BTREE",
        fields: [
          { name: "child_id" },
        ]
      },
    ]
  });
};
