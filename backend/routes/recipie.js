const express = require("express")
const { getRecipies, getRecipie, addRecipies, editRecipies, deleteRecipies, upload} = require("../controller/recipie")
const router = express.Router()

router.get("/",getRecipies)
router.get("/:id", getRecipie)
router.post("/", upload.single('file'),addRecipies)
router.put("/:id", editRecipies)
router.delete("/:id", deleteRecipies)

module.exports=router