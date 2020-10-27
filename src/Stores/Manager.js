import { makeObservable, observable } from 'mobx'

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
        })
    }
}