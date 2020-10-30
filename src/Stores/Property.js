import { makeObservable, observable } from 'mobx'

export default class Property {
    constructor(property) {
        this.id = property.id
        this.img = property.img
        this.address = property.adress
        this.roomNum = property.roomNum
        this.bathrooms = property.bathrooms
        this.maxGuestes = property.max_gusts
        this.pool = property.pool
        this.ac = property.ac
        this.wifi = property.wifi
        this.kitchen = property.kitchen
        this.owner = {
            id: property.owner,
            name: property.name,
            phone: property.phone,
            country: property.country,
            email: property.email
        }
        this.todoList = []
        this.serviceWorkers = []
        this.booking = []

        makeObservable(this, {
            id: observable,
            img: observable,
            address: observable,
            roomNum: observable,
            bathrooms: observable,
            maxGuestes: observable,
            pool: observable,
            ac: observable,
            wifi: observable,
            pool: observable,
            kitchen: observable,
            owner: observable,
            serviceWorkers: observable,
            booking: observable
        })
    }
}