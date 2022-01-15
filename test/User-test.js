import { expect } from 'chai';
import User from '../src/classes/User.js'
import Booking from '../src/classes/Booking.js'
import customers from '../src/test-data/customer-data.js'
import bookings from '../src/test-data/booking-data.js'
import rooms from '../src/test-data/room-data.js'

describe('User', () => {
  const booking = new Booking(bookings, rooms)
  const users = customers.map((user) => {
    return new User(user.id, user.name, booking)
  })


  it('should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('should be an instace of booking', () => {
    expect(users[0]).to.be.an.instanceOf(User)
    expect(users[9]).to.be.an.instanceOf(User)
  })

  it('should hold the user id', () => {
    expect(users[0].id).to.equal(1)
    expect(users[10].id).to.equal(11)
  })
  it('should hold the users name', () => {
    expect(users[0].name).to.equal('Leatha Ullrich')
    expect(users[10].name).to.equal('Melissa Sauer')
  })

  it('should show the users current booking', () => {
    users[39].calculateCurrentBooking('2022/01/14')
    expect(users[39].calculateCurrentBooking('2022/01/14')).to.deep.equal(
      [
        {
          userId: 40,
          date: '2022/01/14',
          roomNumber: 22,
          roomType: 'single room',
          bidet: false,
          bedSize: 'full',
          numBeds: 2,
          Cost: 350.31
        },
        {
          userId: 40,
          date: '2022/01/14',
          roomNumber: 24,
          roomType: 'suite',
          bidet: false,
          bedSize: 'queen',
          numBeds: 1,
          Cost: 327.24
        }
      ]
    )
  })
})