
const bcrypt = require('bcryptjs')

const User = require('../models/Users')

module.exports={
    register:(req,res)=>{
        return new Promise((resolve,reject)=>{
            const {name,email,password} = req.body
    
            
            if(name.length === 0 || email.length === 0|| password.length === 0){
                return res.json({message:'All fields must be completed'})
            }
    
    
     
            User.findOne({email})
            .then(user=>{
                if(user){
                    return res.status(403).json({message:'user already exists'})
                }
    
            const newUser = new User()
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password,salt)
                newUser.name = name
                newUser.email = email
                newUser.password = hash
    
            newUser
            .save()
            .then(user=>{
                res.status(200).json({message:`User created`,user})
            })
        })
    
    
        })
    }, 


    // getAllUsers:(req,res)=>{
    //     User.find({}).then(user=>{
    //         res.json(user)
    //     })
    // },

    login:(req,res)=>{
        return new Promise((resolve,reject)=>{
            User.findOne({email:req.body.email})
            .then(user=>{
                bcrypt.compare(req.body.password,user.password)
                .then(user=>{
                    res.send(user === true?'you are now logged in':'incorrect credentials')
                .catch(err=>{
                    return res.status(500).json({message: 'server error',err})
                })
                })
            }).catch(err=>reject(err))
        })
    },

    updateProfile:(req,res)=>{
        return new Promise((resolve,reject)=>{
    
            User.findById(req.params.id).then((user)=>{
                const{name,email}= req.body
                user.name = name?name:user.name 
                user.email = email?email:user.email
                user.save()
            })
            .then((user) =>{
                return res.status(200).json({message:`user updated `,user})
            }).catch(err=>res.status(500).json({message:'server error'}))
            
            
        })
            
        },

    deleteProfile : (req,res)=>{
        return new Promise((resolve,reject)=>{
            User.findByIdAndDelete({_id: req.params.id})
            .then(user=>{
                return res.status(200).json({message:'user deleted',user})
            })
            .catch(err => res.status(400).json({message:'NO user to delete'}))
        })
    },
}
    
