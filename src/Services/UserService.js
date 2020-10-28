import axios from 'axios'

const UserService = function () {

    const getUserDitails = async function (email) {
        const user = await axios.get(`http://localhost:3001/user/${email}`)
        return user.data
    }

    getUserProperties = async (userId) => {
        const userProperties = await axios.get(`http://localhost:3001/properties/${userId}`)
        return userProperties.data
    }

    updateUserDetails = async (userId,userNewDetails) => {
        const userDetails = await axios.get(`http://localhost:3001/user/${userId}`,userNewDetails)
        return userDetails.data
    }


    return { getUserDitails }
}

export default UserService;