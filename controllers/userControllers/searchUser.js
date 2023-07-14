const UserModel = require("../../model/UserModel")

exports.searchUser = async (req, res) => {
    try {
        const { searchTerm } = req.params

        if (!searchTerm) {
            return res.status(401).json({
                success: false,
                message: 'Search Term Missing',
            })
        }


        const searchResults = await UserModel.find({ username: new RegExp(searchTerm, 'i') })


        return res.status(200).json({
            success: true,
            message: 'Users Search Successfully',
            users: searchResults
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong',
            error
        })
    }
}