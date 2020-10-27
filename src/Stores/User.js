import { 
    makeObservable, 
    observable, 
    action, 
    computed 
} from 'mobx';

export default class Manager {

    constructor() {

        this.id = ''
        this.img = ''
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.phone = ''
        this.dateJoin = ''
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
            loadUser: action,
            updateUser: action,
            addProperty: action
        })

    }

    loadUser = async (user) => {
        this.id = user.id
        this.img = user.img
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.phone = user.phone
        this.dateJoin = user.dateJoin
        this.properties = user.properties
    } 

    updateUser = async (key, value) => {
        this[key] = value
    }

    addProperty = async (property) => {
        this.properties.push(property)
    }

}