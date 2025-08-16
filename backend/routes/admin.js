const express = require("express");
const { loginAdmin, registerAdmin, getClients, getClientById, registerclient, deleteclient, getClientToken } = require("../controllers/admin");
const { authMiddleware } = require("../middlewares/authmiddlewares");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({message: "Hello admin"});
});
router.post("/login",loginAdmin);

router.post("/register",registerAdmin);

router.get("/getclients", getClients);

router.get("/getclientbyid/:id", getClientById);

router.post('/registerclient', registerclient);

router.delete('/deleteclient/:id', deleteclient);

router.get('/get-client-token/:clientId', authMiddleware, getClientToken);

module.exports=router;
