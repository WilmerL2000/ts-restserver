import { DataTypes } from "sequelize"
import mysqlDB from "../db/connection"

const User = mysqlDB.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
    }
})

export default User