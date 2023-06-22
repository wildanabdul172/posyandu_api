const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Queue = sequelize.define('tbl_queue', {
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
    tableName: 'tbl_queue',
    timestamps: false,
  });

  // Definisikan relasi antara Queue dengan Children, Users, dan Posyandu
  Queue.associate = (models) => {
    Queue.belongsTo(models.tbl_children, {
      foreignKey: 'child_id',
      as: 'child',
    });

    Queue.belongsTo(models.tbl_users, {
      foreignKey: 'user_id',
      as: 'user',
    });

    Queue.belongsTo(models.tbl_posyandu, {
      foreignKey: 'posyandu_id',
      as: 'posyandu',
    });
  };

  return Queue;
};
