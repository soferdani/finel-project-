import { makeObservable, observable } from 'mobx'

export default class ServiceProvider {
    constructor(serviceProvider) {
        this.id = serviceProvider.id
        this.img = serviceProvider.img
        this.firstName = serviceProvider.firstName
        this.lastName = serviceProvider.lastName
        this.email = serviceProvider.email
        this.phone = serviceProvider.phone
        this.dateJoin = serviceProvider.dateJoin
        this.properties = []
        makeObservable(this, {
            id: observable,
            img: observable,
            firstName: observable,
            lastName: observable,
            email: observable,
            phone: observable,
            dateJoin: observable,
        })
    }
}