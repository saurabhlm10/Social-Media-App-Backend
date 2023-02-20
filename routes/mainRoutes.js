const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { home } = require("../controllers/mainControllers");
const { addPost } = require("../controllers/postControllers/addPost");
const { getPost } = require("../controllers/postControllers/getPost");
const { getPosts } = require("../controllers/postControllers/getPosts");
const { createUser } = require("../controllers/userControllers/createUser");
const { loginUser } = require("../controllers/userControllers/loginUser");

router.get("/api/", home);
router.get("/api/getposts", getPosts);
router.post("/api/addpost", upload.single("image"), addPost);
router.get("/api/getpost/:postId", getPost);

router.post('/api/createuser', createUser)
router.post('/api/loginuser', loginUser)

module.exports = router;
