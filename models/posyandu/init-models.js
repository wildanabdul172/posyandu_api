var DataTypes = require("sequelize").DataTypes;
var _tbl_activities = require("./tbl_activities");
var _tbl_articles = require("./tbl_articles");
var _tbl_children = require("./tbl_children");
var _tbl_healthrecords = require("./tbl_healthrecords");
var _tbl_posyandu = require("./tbl_posyandu");
var _tbl_queue = require("./tbl_queue");
var _tbl_role = require("./tbl_role");
var _tbl_users = require("./tbl_users");

function initModels(sequelize) {
  var tbl_activities = _tbl_activities(sequelize, DataTypes);
  var tbl_articles = _tbl_articles(sequelize, DataTypes);
  var tbl_children = _tbl_children(sequelize, DataTypes);
  var tbl_healthrecords = _tbl_healthrecords(sequelize, DataTypes);
  var tbl_posyandu = _tbl_posyandu(sequelize, DataTypes);
  var tbl_queue = _tbl_queue(sequelize, DataTypes);
  var tbl_role = _tbl_role(sequelize, DataTypes);
  var tbl_users = _tbl_users(sequelize, DataTypes);

  tbl_healthrecords.belongsTo(tbl_children, { as: "child", foreignKey: "child_id"});
  tbl_children.hasMany(tbl_healthrecords, { as: "tbl_healthrecords", foreignKey: "child_id"});
  tbl_queue.belongsTo(tbl_children, { as: "child", foreignKey: "child_id"});
  tbl_children.hasMany(tbl_queue, { as: "tbl_queues", foreignKey: "child_id"});
  tbl_activities.belongsTo(tbl_posyandu, { as: "activity_location_tbl_posyandu", foreignKey: "activity_location"});
  tbl_posyandu.hasMany(tbl_activities, { as: "tbl_activities", foreignKey: "activity_location"});
  tbl_queue.belongsTo(tbl_posyandu, { as: "posyandu", foreignKey: "posyandu_id"});
  tbl_posyandu.hasMany(tbl_queue, { as: "tbl_queues", foreignKey: "posyandu_id"});
  tbl_users.belongsTo(tbl_role, { as: "role_tbl_role", foreignKey: "role"});
  tbl_role.hasMany(tbl_users, { as: "tbl_users", foreignKey: "role"});
  tbl_children.belongsTo(tbl_users, { as: "user", foreignKey: "user_id"});
  tbl_users.hasMany(tbl_children, { as: "tbl_children", foreignKey: "user_id"});
  tbl_queue.belongsTo(tbl_users, { as: "user", foreignKey: "user_id"});
  tbl_users.hasMany(tbl_queue, { as: "tbl_queues", foreignKey: "user_id"});

  return {
    tbl_activities,
    tbl_articles,
    tbl_children,
    tbl_healthrecords,
    tbl_posyandu,
    tbl_queue,
    tbl_role,
    tbl_users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
