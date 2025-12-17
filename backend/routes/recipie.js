const express = require("express")
const { getRecipies, getRecipie, addRecipies, editRecipies, deleteRecipies} = require("../controller/recipie")
const router = express.Router()

router.get("/",getRecipies)
router.get("/:id", getRecipie)
router.post("/", addRecipies)
router.put("/:id", editRecipies)
router.delete("/:id", deleteRecipies)

module.exports=router