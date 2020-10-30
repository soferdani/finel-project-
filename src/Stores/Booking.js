import { makeObservable, observable } from 'mobx'

export default class Booking {
    constructor(booking) {
        this.id = booking.id
        this.startDate = booking.startDate
        this.endDate = booking.endDate
        this.gusts = booking.gusts
        this.channel = booking.channel
        this.nights = booking.nights
        this.firstName = booking.firstName
        this.lastName = booking.lastName
        this.img = booking.photo
        // this.phone = booking.phone
        // this.emali = booking.email

        makeObservable(this, {
            id: observable,
            startDate: observable,
            endDate: observable,
            gusts: observable,
            channel: observable,
            nights: observable,
            firstName: observable,
            lastName: observable,
            img: observable,
            // phone: observable,
            // email: observable
        })
    }
}