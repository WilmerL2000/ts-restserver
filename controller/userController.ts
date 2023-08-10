import { Request, Response } from "express";
import User from "../models/user";

/**
 * The getUsers function retrieves all users and sends them as a JSON response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It is an instance of the `Response` class, which is provided by the Express
 * framework.
 */
const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.findAll()

        res.json({ users })
    } catch (error) {
        res.status(500).json({ msg: "There was an error" })

    }
}

/**
 * The function `getUser` retrieves a user by their ID and returns it as a JSON response, or returns a
 * 404 error if the user is not found.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with the user object if the user is found. If the user is not found, it
 * returns a JSON response with a "User not found" message and a status code of 404.
 */
const getUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        res.json({ user })
    } catch (error) {
        res.status(500).json({ msg: "There was an error" })
    }


}

/**
 * The function creates a new user if the user does not already exist and returns the created user.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns If the user already exists, a response with status code 400 and a JSON object containing
 * the message "User already exists" will be returned. If the user does not exist and is successfully
 * created, a response with the created user object will be returned. If there is an error, a response
 * with status code 500 and a JSON object containing the message "There was an error" will be returned
 */
const createUser = async (req: Request, res: Response) => {
    const { body } = req

    try {

        const userExists = await User.findOne({
            where: {
                email: body.email
            }
        })

        if (userExists) {
            return res.status(400).json({ msg: "User already exists" })
        }

        const user = new User(body)
        await user.save()

        res.json(user)

    } catch (error) {
        res.status(500).json({ msg: "There was an error" })

    }


}

/**
 * The updateUser function updates a user's information in the database based on the provided request
 * parameters and body.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and request parameters.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, sending JSON data, or redirecting the client to another URL.
 */
const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req

    try {

        const user = await User.findByPk(id)

        if (!user) {
            res.status(404).json({ msg: "User not found" })
        }

        await user.update(body)

        res.json(user)

    } catch (error) {
        res.status(500).json({ msg: "There was an error" })

    }

}

/**
 * The deleteUser function is an asynchronous function that takes in a request and response object,
 * finds a user by their ID, and updates their state to false.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, request headers, request body, request
 * parameters, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, sending JSON data, or redirecting the client to another URL.
 */
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {

        const user = await User.findByPk(id)

        if (!user) {
            res.status(404).json({ msg: "User not found" })
        }

        await user.update({
            state: false,
        })

    } catch (error) {
        res.status(500).json({ msg: "There was an error" })

    }

}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}