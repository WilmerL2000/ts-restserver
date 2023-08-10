import { Sequelize } from "sequelize";

const mysqlDB = new Sequelize('ts-node', 'root', 'W1lm3r2000', {
    host: 'localhost',
    dialect: 'mysql',
})

export default mysqlDB