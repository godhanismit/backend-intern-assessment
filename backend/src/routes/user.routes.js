import { Router } from "express"
import auth from "../middlewares/auth.middleware.js"
import role from "../middlewares/role.middleware.js"
import { getUsers, updateStatus, updateProfile, changePassword } from "../controllers/user.controller.js"

const router = Router()

router.get("/", auth, role("admin"), getUsers)
router.patch("/:id/status", auth, role("admin"), updateStatus)
router.put("/me", auth, updateProfile)
router.put("/me/password", auth, changePassword)


export default router
