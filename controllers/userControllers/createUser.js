const User = require("../../model/UserModel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body

        // Check if all fields are provided
        if(!(username && email && password)){
            return res.status(401).json({
              code: '401',
              message: 'All fields are required'
            })
        }

         // check if user already exists or not
      const userAlreadyExists = await User.findOne({ email });
      if (userAlreadyExists) {
        // throw new Error("User Already Exists")
        return res.status(402).json({
          code: '402',
          message: 'This Email Is Already Registered'
        });
      }

      // check if username available
      const usernameAvailable = await User.findOne({username})
      if(usernameAvailable){
        return res.status(403).json({
          code: '403',
          message: 'Username not available'
        })
      }

      // encrypt password
      const myEnPassword = await bcrypt.hash(password, 10);

      // create a new entry in db
      const user = await User.create({
        username,
        email,
        password: myEnPassword,
      });
  
      // create token and send it to user
      const token = jwt.sign(
        {
          id: user._id,
          email,
        },
        process.env.SECRET,
        { expiresIn: "2h" }
      );
  
      user.token = token;
  
      // dont want to send user to frontend
      user.password = undefined;
  
      res.status(201).json(user);



    } catch (error) {
        console.log(error)
    }
}