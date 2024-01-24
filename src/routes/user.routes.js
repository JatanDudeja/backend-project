import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrectUser, updateAccount, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar", // same field name as in frontend also to accept the image
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);


router.route("/login").post(loginUser)

// secured routes

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refreshtoken").post(refreshAccessToken)
router.route("/changePassword").post(verifyJWT, changeCurrentPassword)
router.route("/getCurrentUser").post(verifyJWT, getCurrectUser)
router.route("/updateUserDetails").post(verifyJWT, updateAccount)
router.route("/updateUserAvatar").post(upload.single('avatar'), verifyJWT, updateUserAvatar)
router.route("/updateUserCoverImage").post(upload.single('coverImage'), verifyJWT, updateUserCoverImage)

export default router;
