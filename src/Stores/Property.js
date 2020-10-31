import { makeObservable, observable } from 'mobx'

export default class Property {
    constructor(property) {
        this.id = property.id
        this.name = property.propertyName
        this.img = property.img
        this.address = property.address
        this.rooms = property.rooms
        this.bathrooms = property.bathrooms
        this.guests = property.guests
        this.pool = property.pool
        this.ac = property.ac
        this.wifi = property.wifi
        this.kitchen = property.kitchen
        this.owner = {
            id: property.ownerId, 
            name: property.OwnerName, 
            phone: property.phone, 
            country: property.country, 
            email: property.email
        }
        this.todoList = []
        this.serviceWorkers = []
        this.booking = []

        makeObservable(this, {
            id: observable,
            name: observable,
            img: observable,
            address: observable,
            rooms: observable,
            bathrooms: observable,
            guests: observable,
            pool: observable,
            ac: observable,
            wifi: observable,
            pool: observable,
            kitchen: observable,
            owner: observable,
            serviceWorkers: observable,
            booking: observable,
            todoList: observable
        })
    }
}