import express, { Application, json } from 'express'
import cors from 'cors'
import userRoutes from '../routes/user';
import mysqlDB from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '3001'

        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    async dbConnection() {
        try {
            await mysqlDB.authenticate()
            console.log('ONLINE')
        } catch (error) {
            throw new Error('Hubo un error')
        }
    }

    middlewares() {
        this.app.use(cors())

        this.app.use(express.json())

        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`)
        })
    }
}

export default Server