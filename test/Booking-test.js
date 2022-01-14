import { expect } from 'chai';
import Booking from '../src/classes/Booking.js'
import bookings from '../src/test-data/booking-data.js'
import rooms from '../src/test-data/room-data.js'

describe('Booking', () => {
const booking = new Booking(bookings, rooms)

  it('should be a function', () => {
    expect(Booking).to.be.a('function')
  })

  it('should be an instace of booking', () => {
    expect(booking).to.be.an.instanceOf(Booking)
  })

  it('should hold booking data', () => {
    expect(booking.bookingData[0]).to.deep.equal(
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 9,
        date: '2022/04/22',
        roomNumber: 15,
        roomServiceCharges: []
      }
    )
  })

  it('should hold room data', () => {
    expect(booking.roomData[0]).to.deep.equal(
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      }
    )
  })

  it('should be able to grab all of the users rooms', () => {
    expect(booking.getUserBookings(9)[0]).to.deep.equal(
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 9,
        date: '2022/04/22',
        roomNumber: 15,
        roomServiceCharges: []
      }
    )
  })

  it('should grab a booking room info', () => {
    expect(booking.getBookingRoom("5fwrgu4i7k55hl6sz")).to.deep.equal(
      {
        number: 15,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56
      }
    )
  })
})