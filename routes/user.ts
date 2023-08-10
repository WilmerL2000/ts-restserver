import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controller/userController";

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)

router.post('/', createUser)
router.route('/:id').put(updateUser).delete(deleteUser)


export default router