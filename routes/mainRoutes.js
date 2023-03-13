const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { home } = require("../controllers/mainControllers");
const { addPost } = require("../controllers/postControllers/addPost");
const { getPost } = require("../controllers/postControllers/getPost");
const { getPosts } = require("../controllers/postControllers/getPosts");
const { getUserPosts } = require("../controllers/postControllers/getUserPosts");
const { addRemoveFollower } = require("../controllers/userControllers/addRemoveFollower");
const { createUser } = require("../controllers/userControllers/createUser");
const { getUser } = require("../controllers/userControllers/getUser");
const { loginUser } = require("../controllers/userControllers/loginUser");

router.get("/api/", home);
router.get("/api/getposts/:followersArray", getPosts);
router.get("/api/getuserposts/:username", getUserPosts);
router.post("/api/addpost", upload.single("image"), addPost);
router.get("/api/getpost/:postId", getPost);
router.put('/api/addremovefollower/:username/:foreignUsername', addRemoveFollower)

router.post('/api/createuser', createUser)
router.post('/api/loginuser', loginUser)
router.get('/api/getuser/:username', getUser)

module.exports = router;
