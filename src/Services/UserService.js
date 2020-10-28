import axios from 'axios'

const UserService = function () {

    const getUserDetails = async function (email) {
        const user = await axios.get(`http://localhost:3001/user/${email}`)
        return user.data
    }

    const getUserProperties = async (id) => {
        const userProperties = await axios.get(`http://localhost:3001/properties/${id}`)
        return userProperties.data
    }

    const getPropertyTodo = async (id) => {
        const todoList = await axios.get(`http://localhost:3001/todos/${id}`)
        return todoList.data
    }

    const addNewProperty = async (propertyDetails) => {
        const newProperty = await axios.post(`http://localhost:3001/property`, propertyDetails)
        return newProperty.data
    }

    const addNewTodo = async (todo) => {
        const newTodo = await axios.post('http://localhost:3001/property', todo)
        return newTodo.data
    }

    const updateUserDetails = async (userId, userNewDetails) => {
        const userDetails = await axios.put(`http://localhost:3001/user/${userId}`, userNewDetails)
        return userDetails.data
    }

    const updateProperty = async (propertyId, updateDetails) => {
        const updatedProperty = await axios.put(`http://localhost:3001/property/${propertyId}`, updateDetails)
        return updatedProperty.data
    }

    const updateTodoDetails = async (todoId, todoDetails) => {
        const todo = await axios.put(`http://localhost:3001/todo/${todoId}`, todoDetails)
        return todo.data
    }

    const updateTodoStatus = async (todoId, status) => {
        const todo = await axios.put(`http://localhost:3001/todo/${todoId}`, status )
        return todo.data
    }

    const deleteProperty = async (propertyId) => {
        const property = await axios.delete(`http://localhost:3001/property/${propertyId}`)
        return property.data
    }

    const deleteTodo = async (todoId) => {
        const todo = await axios.delete(`http://localhost:3001/todo/${todoId}`)
        return todo.data
    }

    return { getUserDetails, getUserProperties, getPropertyTodo, addNewProperty, addNewTodo, updateUserDetails, updateProperty, updateTodoDetails, updateTodoStatus, deleteProperty, deleteTodo }
}

export default UserService;