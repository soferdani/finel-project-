import axios from 'axios'

const UserService = function () {

    const getUserDetails = async function (email) {
        const user = await axios.get(`/user/${email}`)
        return user.data
    }

    const getUserProperties = async (id) => {
        const userProperties = await axios.get(`/properties/${id}`)
        return userProperties.data
    }

    const getPropertyTodo = async (id) => {
        const todoList = await axios.get(`/todos/${id}`)
        return todoList.data
    }

    const getServiceWorkers = async (id) => {
        const serviceWorkers = await axios.get(`/service/${id}`)
        return serviceWorkers.data
    }

    const getBooking = async (id) => {
        const booking = await axios.get(`/booking-all/${id}`)
        return booking.data
    }

    const addNewProperty = async (propertyDetails) => {
        const newProperty = await axios.post(`/property`, propertyDetails)
        return newProperty.data
    }

    const addNewTodo = async (todo) => {
        const newTodo = await axios.post('/property', todo)
        return newTodo.data
    }

    const addNewServiceWorker = async (serviceWorker) => {
        const newServiceWorker = await axios.post('/service-create', serviceWorker)
        return newServiceWorker.data
    }

    const addNewBooking = async (booking) => {
        const id = await axios.post('/booking', booking)
        return id.data
    }

    const updateUserDetails = async (userId, userNewDetails) => {
        const userDetails = await axios.put(`/user/${userId}`, userNewDetails)
        return userDetails.data
    }

    const updateProperty = async (propertyId, updateDetails) => {
        const updatedProperty = await axios.put(`/property/${propertyId}`, updateDetails)
        return updatedProperty.data
    }

    const updateTodoDetails = async (bookingId, bookingDetails) => {
        const booking = await axios.put(`/booking/${bookingId}`, bookingDetails)
        return booking.data
    }

    const updateBookingDetails = async (todoId, todoDetails) => {
        const todo = await axios.put(`/todo/${todoId}`, todoDetails)
        return todo.data
    }

    const updateTodoStatus = async (todoId, status) => {
        const todo = await axios.put(`/todo/${todoId}`, status )
        return todo.data
    }

    const deleteProperty = async (propertyId) => {
        const property = await axios.delete(`/property/${propertyId}`)
        return property.data
    }

    const deleteTodo = async (todoId) => {
        const todo = await axios.delete(`/todo/${todoId}`)
        return todo.data
    }

    const deleteServiceWorkers = async (propertyId, ServiceWorkerId) => {
        const deleted = await axios.delete(`/service/${propertyId}/${ServiceWorkerId}`)
        return deleted.data
    }

    const deleteBooking = async (bookingId) => {
        const deleted = await axios.delete(`/booking-delete/${bookingId}`)
        return deleted.data
    }

    return { getUserDetails,
        getUserProperties,
        getPropertyTodo,
        getServiceWorkers,
        getBooking,
        addNewProperty,
        addNewTodo,
        addNewServiceWorker,
        addNewBooking,
        updateUserDetails,
        updateProperty,
        updateTodoDetails,
        updateTodoStatus,
        updateBookingDetails,
        deleteProperty,
        deleteTodo,
        deleteServiceWorkers,
        deleteBooking
     }
}

export default UserService;