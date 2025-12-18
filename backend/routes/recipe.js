const express = require("express")
const { getRecipes, getRecipe, addRecipes, editRecipes, deleteRecipes, upload} = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router = express.Router()

router.get("/",getRecipes)
router.get("/:id", getRecipe)
router.post("/", upload.single('file'),verifyToken,addRecipes)
router.put("/:id", upload.single('file'), editRecipes)
router.delete("/:id", deleteRecipes)

module.exports=router