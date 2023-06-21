var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require("./config");

const Model_posyandu = path.join(__dirname, "../models/posyandu");
const Config_posyandu = new Sequelize(
    config.posyandu_db.name,
    config.posyandu_db.username,
    null, {
        dialect: config.posyandu_db.dialect,
        port: config.posyandu_db.port,
        host: config.posyandu_db.host,
        define: {
            timestamps: false,
            timezone: "+07:00"  
        },
        timezone: "+07:00",
        operatorsAliases: 0
    }
);

const db = {};
let model;

// Posyandu
fs.readdirSync(Model_posyandu)
    .filter(file => {
        return file.indexOf(".") !== 0 && file.indexOf(".map") === -1;
    })
    .forEach(file => {
        model = require(path.join(Model_posyandu, file))(Config_posyandu, Sequelize.DataTypes);
        db[model.name] = model;
    });
Object.keys(db).forEach(name => {
    if ("associate" in db[name]) {
        db[name].associate(db);
    }
});

module.exports = db