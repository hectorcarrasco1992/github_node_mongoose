const express = require('express')
const router = express.Router()
const user = require('../models/Users')
const controllerFunc = require('../Controller/controller')

router.post('/register',controllerFunc.register)
router.post('/login',controllerFunc.login)
router.put('/update/:id',controllerFunc.updateProfile)
router.delete('/delete/:id',controllerFunc.deleteProfile)

router.get('/',(req,res)=>{
        user.find({}).then(user=>{
            res.json(user)
        })
    })













module.exports=router
