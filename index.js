const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')
const User = require('./models/Users')
const bcrypt = require('bcryptjs')
const router = require('./Router/router')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('Mongodb Connected')
}).catch(err=> console.log(`mongo error:${error}`))
const port = process.env.Port || 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users',router)


//register
// app.post('/register',(req,res)=>{
//     return new Promise((resolve,reject)=>{
//         const {name,email,password} = req.body

//         // validate input
//         if(name.length === 0 || email.length === 0|| password.length === 0){
//             return res.json({message:'All fields must be completed'})
//         }


//  //check if user exists
//         User.findOne({email})
//         .then(user=>{
//             if(user){
//                 return res.status(403).json({message:'user already exists'})
//             }

//         const newUser = new User()
//         const salt = bcrypt.genSaltSync(10)
//         const hash = bcrypt.hashSync(req.body.password,salt)
//             newUser.name = name
//             newUser.email = email
//             newUser.password = hash

//         newUser
//         .save()
//         .then(user=>{
//             res.status(200).json({message:`User created`,user})
//         })
//     })


//     })
// })

//getallusers

// app.get('/getAllUsers',(req,res)=>{
//     User.find({}).then(user=>{
//         res.json(user)
//     })
// })

//login
// app.post('/login',(req,res)=>{
//     return new Promise((resolve,reject)=>{
//         User.findOne({email:req.body.email})
//         .then(user=>{
//             bcrypt.compare(req.body.password,user.password)
//             .then(user=>{
//                 res.send(user === true?'you are now logged in':'incorrect credentials')
//             .catch(err=>{
//                 return res.status(500).json({message: 'server error',err})
//             })
//             })
//         }).catch(err=>reject(err))
//     })
// })

//update
// app.put('/update/:id',(req,res)=>{
//     return new Promise((resolve,reject)=>{

//         User.findById(req.params.id).then((user)=>{
//             const{name,email}= req.body
//             user.name = name?name:user.name 
//             user.email = email?email:user.email
//             user.save()
//         })
//         .then((user) =>{
//             return res.status(200).json({message:`user updated `,user})
//         }).catch(err=>res.status(500).json({message:'server error'}))
        
        
//     })
        
//     })
//delete
    // app.delete('/delete/:id',(req,res)=>{
    //     return new Promise((resolve,reject)=>{
    //         User.findByIdAndDelete({_id: req.params.id})
    //         .then(user=>{
    //             return res.status(200).json({message:'user deleted',user})
    //         })
    //         .catch(err => res.status(400).json({message:'NO user to delete'}))
    //     })
    // })






















app.listen(port,()=>{
    console.log(`listening on ${port}`)
})