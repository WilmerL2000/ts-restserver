"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysqlDB = new sequelize_1.Sequelize('ts-node', 'root', 'W1lm3r2000', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = mysqlDB;
//# sourceMappingURL=connection.js.map