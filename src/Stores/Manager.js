import { 
    makeObservable, 
    observable, 
    action, 
    computed 
} from 'mobx'
import User from './User'
import Property from './Property'
import Todo from './Todo'

export default class Manager extends User {

    constructor() {

        super()

        makeObservable(this, {
        })

    }

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

    // updateManagerDetails = async (managerDetails) => {
    //     for(let prop in managerDetails){
    //         await ManagerService().updateDetails(this.id, managerDetails[prop]);
    //         this[prop] = managerDetails[prop]
    //     }
    // };

}