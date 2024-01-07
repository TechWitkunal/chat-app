const {
  login,
  register,
  setOnline,
  updateInfo,
  getAllUsers,
  setAvatar,
  getdataEmail,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/setOnline/:id/:isOnline", setOnline);
router.get("/getAllUsers/:id", getAllUsers);
router.put("/updateinfo/:id", updateInfo);
router.get("/allusers/:id", getAllUsers);
router.get("/getdataEmail/:name/:password/:email", getdataEmail);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;