const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { home } = require("../controllers/mainControllers");
const { addPost } = require("../controllers/postControllers/addPost");
const { deletePost } = require("../controllers/postControllers/deletePost");
const { getPost } = require("../controllers/postControllers/getPost");
const { getPosts } = require("../controllers/postControllers/getPosts");
const { getUserPosts } = require("../controllers/postControllers/getUserPosts");
const { addRemoveFollower } = require("../controllers/userControllers/addRemoveFollower");
const { createUser } = require("../controllers/userControllers/createUser");
const { getUser } = require("../controllers/userControllers/getUser");
const { loginUser } = require("../controllers/userControllers/loginUser");

const auth = require('../middleware/auth');
const { likePost } = require("../controllers/postControllers/likePost");
const { addComment } = require("../controllers/postControllers/addComment");
const { deleteComment } = require("../controllers/postControllers/deleteComment");
const { searchUser } = require("../controllers/userControllers/searchUser");

router.get("/api/", auth, home);
router.get("/api/getposts/:followersArray", auth, getPosts);
router.get("/api/getuserposts/:username", auth, getUserPosts);
router.post("/api/addpost", upload.single("image"), auth, addPost);
router.delete('/api/deletepost/:postId/:imageName', auth, deletePost)
router.get("/api/getpost/:postId", auth, getPost);
router.put('/api/addremovefollower/:username/:foreignUsername', auth, addRemoveFollower)
router.get('/api/getuser/:username', auth, getUser)
router.put('/api/likepost/:username/:postId', auth, likePost)
router.post('/api/addcomment/:username/:postId', auth, addComment)
router.delete('/api/deletecomment/:commentId/:postId', auth, deleteComment)
router.get('/api/searchuser/:searchTerm', searchUser)

router.post('/api/createuser', createUser)
router.post('/api/loginuser', loginUser)

module.exports = router;
