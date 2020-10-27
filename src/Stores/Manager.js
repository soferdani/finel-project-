import { makeObservable, observable, action, computed } from 'mobx';
import Property from './Property';
import Todo from './Todo';

export default class Manager {
    constructor(manager) {
        this.id = manager.id
        this.img = manager.img
        this.firstName = manager.firstName
        this.lastName = manager.lastName
        this.email = manager.email
        this.phone = manager.phone
        this.dateJoin = manager.dateJoin
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
        });
    };


    addProperty = async (propertyDetails) => {
        const newProperty = await ManagerService().addProperty(propertyDetails);
        this.properties.push(new Property(newProperty));
    };

    updateProperty = async (propertyId, updateDetails) => {
        const property = this.properties.find(p => p.id === propertyId);
        for (let prop in updateDetails) {
            await PropertyService().updateProperty(propertyId, updateDetails[prop]);
            property[prop] = updateDetails[prop]
        };
    };

    updateManagerDetails = async (managerDetails) => {
        for(let prop in managerDetails){
            await ManagerService().updateDetails(this.id, managerDetails[prop]);
            this[prop] = managerDetails[prop]
        }
    };


}