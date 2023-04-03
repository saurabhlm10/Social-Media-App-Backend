const User = require("../../model/UserModel");

const removeFromFollowersList = async (username, foreignUsername) => {
    const removeFromFollowersListResponse = await User.findOneAndUpdate({ username: foreignUsername }, { $pull: { followers: username } }, {
        new: true
    })

    return removeFromFollowersListResponse
}

const removeFromFollowingList = async (username, foreignUsername) => {
    const removeFromFollowingListResponse = await User.findOneAndUpdate({ username }, { $pull: { following: foreignUsername } }, {
        new: true
    })

    return removeFromFollowingListResponse
}

const addToFollowersList = async (username, foreignUsername) => {
    const addToFollowersListResponse = await User.findOneAndUpdate({ username: foreignUsername }, { $addToSet: { followers: username } }, {
        new: true
    })

    return addToFollowersListResponse;
}

const addToFollowingList = async (username, foreignUsername) => {
    const addToFollowingListResponse = await User.findOneAndUpdate({ username }, { $addToSet: { following: foreignUsername } }, {
        new: true
    })

    return addToFollowingListResponse;
}

exports.addRemoveFollower = async (req, res) => {
    try {
        const { username, foreignUsername } = req.params

        const { followers } = await User.findOne({ username: foreignUsername })

        if (followers.includes(username)) {

            const removedFollower = removeFromFollowersList(username, foreignUsername)

            const removedFollowing = removeFromFollowingList(username, foreignUsername)

            const [removeFromFollowersListResponse, removeFromFollowingListResponse] = await Promise.all([removedFollower, removedFollowing])

            return res.status(201).json({
                message: 'Removed Follower',
                removeFromFollowersListResponse,
                removeFromFollowingListResponse
            })
        }

        const addedFollower = addToFollowersList(username, foreignUsername)

        const addedFollowing = addToFollowingList(username, foreignUsername)

        const [addToFollowersListResponse, addToFollowingListResponse] = await Promise.all([addedFollower, addedFollowing])

        res.status(202).json({
            message: 'Added Follower',
            addToFollowersListResponse,
            addToFollowingListResponse
        })

    } catch (error) {
        console.log(error)
    }
}