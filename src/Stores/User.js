import {
    makeObservable,
    observable,
    action,
    computed
} from 'mobx';
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
            updateUser: action,
            addProperty: action
        })

    }
    userIsAuth = async (email, bool) => {
        try {
            this.isAuth = bool
            if (this.isAuth) {
                const userData = await UserService.getUserDitails(email)
                this.loadUser(userData)
                await this.loadUserProperties()
            }
        } catch (error) {
            console.log(error);
        }
    }

    loadUserDitails = async (user) => {
        this.id = user.id
        this.img = user.img
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.phone = user.phone
        this.dateJoin = user.dateJoin
        this.properties = user.properties
    }

    loadUserProperties = async () => {
        const userProperties = await UserService.getUserProperties(this.id)
        this.properties = userProperties
    }
    updateUserDetails = async (userDetails) => {
        await updateDetails(this.id, userDetails);
        for (let prop in userDetails) {
            this[prop] = userDetails[prop]
        }
    }

    //creteNewUser=async()=>{
    //}
    
    // addProperty = async (propertyDetails) => {
    //     const newProperty = await ManagerService().addProperty(propertyDetails);
    //     this.properties.push(new Property(newProperty));
    // };
    // updateProperty = async (propertyId, updateDetails) => {
    //     const property = this.properties.find(p => p.id === propertyId);
    //     for (let prop in updateDetails) {
    //         await PropertyService().updateProperty(propertyId, updateDetails[prop]);
    //         property[prop] = updateDetails[prop]
    //     };
    // };
}








