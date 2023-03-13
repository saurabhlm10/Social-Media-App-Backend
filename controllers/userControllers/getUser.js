const User = require("../../model/UserModel");

exports.getUser = async (req, res) => {

    try {
        const {username} = req.params

        // console.log('triggered')

        // console.log(username)

        if(!username){
            return res.status(401).send('username is required')
        }

        const user = await User.findOne({username})

        // console.log(user)

        // console.log(user.password)

        if(!user){
            return res.status(402).send('username is invalid')
        }

        user.password = undefined


        res.status(200).json(user)
        
    } catch (error) {
        console.log(error)

    }


}