const { auth } = require('../middlewares/auth');
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../database/cloudinary');

const PublicationContoller = require("../controllers/publication");
const check = require("../middlewares/auth");

// Configuración de subida — ahora sube directo a Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'publications',
        allowed_formats: ['png', 'jpg', 'jpeg', 'gif'],
    },
});

const uploads = multer({ storage });

// Definir rutas
router.get("/prueba-publication", PublicationContoller.pruebaPublication);
router.post("/save", check.auth, PublicationContoller.save);
router.get("/detail/:id", check.auth, PublicationContoller.detail);
router.get("/search/:query/:page?", check.auth, PublicationContoller.search);
router.delete("/remove/:id", check.auth, PublicationContoller.remove);
router.get("/user/:id/:page?", check.auth, PublicationContoller.user);
router.post("/upload/:id", [check.auth, uploads.single("file0")], PublicationContoller.upload);
router.get("/feed/:page?", check.auth, PublicationContoller.feed);
// Likes
router.post("/:id/like", check.auth, PublicationContoller.toggleLike);
router.post("/:id/bookmark", check.auth, PublicationContoller.toggleBookmark);

// Comentarios
router.post("/:id/comment", check.auth, PublicationContoller.addComment);
router.delete('/publication/:id/comment/:commentId', check.auth, PublicationContoller.removeComment);
router.get("/:id/comments", check.auth, PublicationContoller.listComments);

module.exports = router;