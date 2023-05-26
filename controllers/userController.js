const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const {User} = require('../models');
const jwt = require("jsonwebtoken")


router.post("/login",(req,res)=>{
    //TODO: sign jwt
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid credentials"})
        } else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid credentials"})
        } else {
            const token = jwt.sign({
                username:foundUser.username,
                userId:foundUser.id
            },process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            console.log(token);
           return res.json({
            token:token,
            user:foundUser
           })
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error",err})
    })
})

router.post("/",(req,res)=>{
    //TODO:create user, sign jwt
    User.create({
        username:req.body.username,
        password:req.body.password
    }).then(newser=>{
        res.json(newser)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error",err})
    })
})

router.get("/profile",(req,res)=>{
    //TODO: get userdata from jwt, verify jwt
    // console.log(req.headers);
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token)
    try{
        const data = jwt.verify(token,process.env.JWT_SECRET)
        User.findByPk(data.userId).then(user=>{
            res.json(user)
        })
    }catch(err){
        console.log(err);
        res.status(403).json({msg:"invalid token",err})
    }
})

module.exports = router;