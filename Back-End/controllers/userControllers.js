const User = require('../models/User') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req,res) => {

    const userExists = await User.findOne({username: req.body.username})
    if(userExists) {
        return res.status(400).send('User already exists')
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const {username, password} = req.body
        const user = await User.create({username, password: hashedPassword}) 
        res.status(200).json(user)   
    }
    catch (err) {
        console.log(err)
    }
}



const userLogin = async (req,res) => {
    const user = await User.findOne({username: req.body.username})
    if(user == null) {
        return res.status(404).send('No user with that username or password')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.send({token: token})
        }
        else {
            res.status(404).send('Incorrect password or username')
        }
    }
    catch (err) {
        res.status(500).send()
    }
}

const userSignout = async (req,res) => {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
        res.send({msg : 'You have been logged Out' });
        } else {
            res.send({msg:'Error'});
        }
    });
}

const token = async (req,res) => {
    const token = req.headers["authorization"]
    if(!token) {
        return res.status(401).json({msg:'Access denied'})
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        res.send(token)
    }
    catch (err) {
        res.status(400).json('Invalid token')
    }
}


module.exports = { 
    register,
    userLogin,
    userSignout,
    token
}; 