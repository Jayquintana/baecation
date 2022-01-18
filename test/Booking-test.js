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

  it('should show available rooms', () => {
    expect(booking.availableRooms('2022/01/17')).to.deep.equal(
      [
        {
          number: 1,
          roomType: 'residential suite',
          bidet: true,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 358.4
        },
        {
          number: 2,
          roomType: 'suite',
          bidet: false,
          bedSize: 'full',
          numBeds: 2,
          costPerNight: 477.38
        },
        {
          number: 3,
          roomType: 'single room',
          bidet: false,
          bedSize: 'king',
          numBeds: 1,
          costPerNight: 491.14
        },
        {
          number: 6,
          roomType: 'junior suite',
          bidet: true,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 397.02
        },
        {
          number: 8,
          roomType: 'junior suite',
          bidet: false,
          bedSize: 'king',
          numBeds: 1,
          costPerNight: 261.26
        },
        {
          number: 9,
          roomType: 'single room',
          bidet: true,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 200.39
        },
        {
          number: 11,
          roomType: 'single room',
          bidet: true,
          bedSize: 'twin',
          numBeds: 2,
          costPerNight: 207.24
        },
        {
          number: 12,
          roomType: 'single room',
          bidet: false,
          bedSize: 'twin',
          numBeds: 2,
          costPerNight: 172.09
        },
        {
          number: 13,
          roomType: 'single room',
          bidet: false,
          bedSize: 'queen',
          numBeds: 2,
          costPerNight: 423.92
        },
        {
          number: 14,
          roomType: 'residential suite',
          bidet: false,
          bedSize: 'twin',
          numBeds: 1,
          costPerNight: 457.88
        },
        {
          number: 15,
          roomType: 'residential suite',
          bidet: false,
          bedSize: 'full',
          numBeds: 1,
          costPerNight: 294.56
        },
        {
          number: 16,
          roomType: 'single room',
          bidet: false,
          bedSize: 'full',
          numBeds: 2,
          costPerNight: 325.6
        },
        {
          number: 18,
          roomType: 'junior suite',
          bidet: false,
          bedSize: 'king',
          numBeds: 2,
          costPerNight: 496.41
        },
        {
          number: 19,
          roomType: 'single room',
          bidet: false,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 374.67
        },
        {
          number: 20,
          roomType: 'residential suite',
          bidet: false,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 343.95
        },
        {
          number: 21,
          roomType: 'single room',
          bidet: false,
          bedSize: 'full',
          numBeds: 2,
          costPerNight: 429.32
        },
        {
          number: 22,
          roomType: 'single room',
          bidet: false,
          bedSize: 'full',
          numBeds: 2,
          costPerNight: 350.31
        },
        {
          number: 23,
          roomType: 'residential suite',
          bidet: false,
          bedSize: 'queen',
          numBeds: 2,
          costPerNight: 176.36
        },
        {
          number: 25,
          roomType: 'single room',
          bidet: true,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 305.85
        }
      ]
    )
  })

  it('should filter by room type', () => {
    
  })
})