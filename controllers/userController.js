const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const {User} = require('../models');


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
           return res.json(foundUser)
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
    res.json('get profile route')
})

module.exports = router;