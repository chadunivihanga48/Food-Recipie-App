const Recipies = require("../models/recipie")
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getRecipies = async(req, res) => {
    const recipies = await Recipies.find()
    return res.json(recipies)
}
const getRecipie = async(req, res) => {
    const recipie = await Recipies.findById(req.params.id)
    res.json(recipie)
    }
const addRecipies = async(req, res) => {
    console.log(req.user)
    const {title, ingredients, instructions, time} = req.body

    if(!title || !ingredients || !instructions){
            res.json({message: "Required fields can't be empty"})
    }
    const newRecipie = await Recipies.create({
        title, ingredients, instructions, time, coverImage:req.file.filename
    })
    return res.json(newRecipie)
}
const editRecipies = async(req, res) => {
    const {title, ingredients, instructions, time} = req.body
    let recipie = await Recipies.findById(req.params.id)
    try{
        if(recipie){
        await Recipies.findByidAndUpdate(req.params.id, req.body, {new:true})
        res.json({title, ingredients, instructions, time})
    }
    }catch(err){
        return res.status(400).json({message: "error"})
    }
}
const deleteRecipies = (req, res) => {
    res.json({message: "hello"})
}

module.exports= {getRecipies, getRecipie, addRecipies, editRecipies, deleteRecipies, upload}