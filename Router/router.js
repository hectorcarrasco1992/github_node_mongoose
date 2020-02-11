const express = require('express')
const router = express.Router()
const user = require('../models/Users')
const controllerFunc = require('../Controller/controller')

router.post('/register',controllerFunc.register)
router.post('/login',controllerFunc.login)
router.put('/updateProfile/:id',controllerFunc.updateProfile)
router.delete('/deleteProfile/:id',controllerFunc.deleteProfile)

router.get('/',(req,res)=>{
        user.find({}).then(user=>{
            res.json(user)
        })
    })













module.exports=router
