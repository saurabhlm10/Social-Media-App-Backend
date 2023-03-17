const User = require("../../model/UserModel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
    try {
        // collect info 
        const {username, password} = req.body

        // validate
        if(!(username && password)){
            return res.status(401).json({
                code: '401',
                message: 'Username And Password Is Required'
            })
        }

        // check if user exists
        const user = await User.findOne({username})

        if(!user){
            return res.status(402).json({
                code: '402',
                message: 'User Is Not Registered'
            })
        }

        // Check if password in correct
        const checkPassword = await bcrypt.compare(password, user.password)



        if(!checkPassword){
            return res.status(403).json({
                code: '403',
                message: 'Password Is Incorrect'
            })
        } 

        const token = jwt.sign(
            {
                id: user._id,
                username
            },
            process.env.SECRET,
            {
                expiresIn: '24h'
            }
        )

        user.password = undefined

        user.token = token

        return res.status(201).json({
            success: true,
            token,
            user
        })

    } catch (error) {
        console.log(error)
    }
}