import {
    makeObservable,
    observable,
    action,
    computed
} from 'mobx';
import { Property, Todo } from '../Stores'
import { UserService as userService } from '../Services/UserService'
const UserService = userService()

export default class User {

    constructor() {
        this.isAuth = false
        this.id = ''
        this.img = ''
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.phone = ''
        this.dateJoin = ''
        this.type = null
        this.properties = []

        makeObservable(this, {
            id: observable,
            img: observable,
            firstName: observable,
            lastName: observable,
            email: observable,
            phone: observable,
            dateJoin: observable,
            properties: observable,
            userIsAuth: action,
            loadUserDitails: action,
            loadUserProperties: action,
            loadProperteisTodos: action,
            addNewProperty: action,
            addNewTodo: action,
            updateUserDetails: action,
            updatePropertyDetails: action,
            updateTodoDetails: action,
            updateTodoStatus: action,
            deleteProperty: action,
            deleteTodo: action
        })
    };

    userIsAuth = async (email, bool) => {
        try {
            this.isAuth = bool
            if (this.isAuth) {
                const userData = await UserService.getUserDitails(email)
                this.loadUser(userData)
                await this.loadUserProperties()
                await this.loadProperteisTodos()
            }
        } catch (error) {
            console.log(error);
        }
    };

    loadUserDitails = async (user) => {
        this.id = user.id
        this.img = user.img
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.phone = user.phone
        this.dateJoin = user.dateJoin
    };

    loadUserProperties = async () => {
        const userProperties = await UserService.getUserProperties(this.id)
        userProperties.forEach(p => {
            this.properties.push(new Property(p))
        })

    };

    loadProperteisTodos = async () => {
        for (let property of this.properties) {
            let todoList = await UserService.getPropertyTodo(property.id)
            todoList.forEach(todo => {
                property.todoList.push(new Todo(todo))
            })
        }
    };

    addNewProperty = async (property) => {
        if (this.type === 1) {
            const propertyDetails = { manager: this.id, ...property }
            await UserService.addNewProperty(propertyDetails)
            this.properties.push(new Property(property))
        }
        else {
            console.log('You dont have prommision')
        }
    };

    addNewTodo = async (propertyId, todoDetails) => {
        if (this.type === 1) {
            const property = this.properties.find(p => p.id === propertyId)
            property.todoList.push(new Todo(todoDetails))
            const todo = { property: property.id, ...todoDetails }
            await UserService.addNewTodo(todo)
        }
        else {
            console.log('You dont have prommision');
        }
    };

    updateUserDetails = async (userDetails) => {
        await updateDetails(this.id, userDetails);
        for (let prop in userDetails) {
            this[prop] = userDetails[prop]
        }
    };

    updatePropertyDetails = async (propertyId, updateDetails) => {
        if (this.type === 1) {
            const property = this.properties.find(p => p.id === propertyId)
            await UserService.updateProperty(property.id, updateDetails)
            for (let prop in updateDetails) {
                property[prop] = updateDetails[prop]
            }
        }
        else {
            console.log('You dont have prommision');
        }
    };

    updateTodoDetails = async (propertyId, todoId, todoDetails) => {
        const property = this.properties.find(p => p.id === propertyId)
        const todo = property.todoList.find(td => td.id === todoId)
        if (this.type === 1) {
            await UserService.updateTodoDetails(todo.id, todoDetails)
            for (let td in todoDetails) {
                todo[td] = todoDetails[td]
            }
        }
    };

    updateTodoStatus = async (propertyId, todoId, todoStatus) => {
        const property = this.properties.find(p => p.id === propertyId)
        const todo = property.todoList.find(td => td.id === todoId)
        todo.isComplete = todoStatus
        await UserService.updateTodoStatus(todo.id, todoStatus)
    };

    deleteProperty = async (propertyId) => {
        if (this.type === 1) {
            const propertyIndex = this.properties.findIndex(p => p.id === propertyId)
            this.properties.splice(propertyIndex, 1)
            await UserService.deleteProperty(propertyId)
        }
        else {
            console.log('You dont have prommision');
        }
    };

    deleteTodo = async (propertyId, todoId) => {
        if (this.type === 1) {
            const property = this.properties.find(p => p.id === propertyId)
            const todoIndex = property.todoList.findIndex(td => td.id === todoId)
            property.todoList.splice(todoIndex, 1)
            await UserService.deleteTodo(todoId);
        }
        else {
            console.log('You dont have prommision');
        }
    };
};








