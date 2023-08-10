"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.get('/', userController_1.getUsers);
router.get('/:id', userController_1.getUser);
router.post('/', userController_1.createUser);
router.route('/:id').put(userController_1.updateUser).delete(userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map