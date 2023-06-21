const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_queue', {
    queue_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    child_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_children',
        key: 'child_id'
      }
    },
    queue_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date_of_queue: {
      type: DataTypes.DATE,
      allowNull: true
    },
    time_of_queue: {
      type: DataTypes.TIME,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Pending','Canceled','Completed'),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_users',
        key: 'user_id'
      }
    },
    posyandu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_posyandu',
        key: 'posyandu_id'
      }
    }
  }, {
    sequelize,
    tableName: 'tbl_queue',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "queue_id" },
        ]
      },
      {
        name: "child_id",
        using: "BTREE",
        fields: [
          { name: "child_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "posyandu_id",
        using: "BTREE",
        fields: [
          { name: "posyandu_id" },
        ]
      },
    ]
  });
};
