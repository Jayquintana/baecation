
class User {
  constructor(id, name, bookings) {
    this.id = id;
    this.name = name;
    this.bookings = bookings
    this.pastBookings = []
  }

  calculateCurrentBooking(todaysDate) {
    let createdBookings = []
    const userBookings = this.bookings.getUserBookings(this.id)
    const compareDates = userBookings.filter((booking) => {
      return booking.date === todaysDate
    });

    const bookingRooms = compareDates.map((booking) => {
      return this.bookings.getBookingRoom(booking.id)
    })

    console.log(compareDates, 'current book');

    const pushBookings = compareDates.forEach((booking)=>{
      const pushRooms = bookingRooms.forEach((room)=>{
          const createBooking = {
            bookingID: booking.id,
            userId: booking.userID,
            date: booking.date,
            roomNumber: room.number,
            roomType: room.roomType,
            bidet: room.bidet,
            bedSize: room.bedSize,
            numBeds: room.numBeds,
            Cost: room.costPerNight
        }
        createdBookings.push(createBooking)
      })
    })
    const filteredWithoutDuplicates = [...new Map(createdBookings.map((booking) => [booking.roomNumber,booking])).values(),];

    return filteredWithoutDuplicates;
  }

  calculatePastBooking(todaysDate) {
    let createdBookings = []
    const userBookings = this.bookings.getUserBookings(this.id)

    const compareDates = userBookings.filter((booking) => {
        const date1 = new Date(todaysDate);
        const date2 = new Date(booking.date)
        return date1 > date2
    });

    const bookingRooms = compareDates.map((booking) => {
      return this.bookings.getBookingRoom(booking.id)
    })

    console.log(compareDates, 'past book');

    const pushBookings = compareDates.forEach((booking) => {
      const pushRooms = bookingRooms.forEach((room) => {
        const createBooking = {
          bookingID: booking.id,
          userId: booking.userID,
          date: booking.date,
          roomNumber: room.number,
          roomType: room.roomType,
          bidet: room.bidet,
          bedSize: room.bedSize,
          numBeds: room.numBeds,
          Cost: room.costPerNight
        }
        createdBookings.push(createBooking)
      })
    })

    const filteredWithoutDuplicates = [...new Map(createdBookings.map((booking) => [booking.roomNumber, booking])).values(),];
    
    return filteredWithoutDuplicates;
    
  
  }

  calculateFutureBooking(todaysDate) {
    let createdBookings = []
    const userBookings = this.bookings.getUserBookings(this.id)

    const compareDates = userBookings.filter((booking) => {
      const date1 = new Date(todaysDate);
      const date2 = new Date(booking.date)

      return date1 < date2
    });

    const bookingRooms = compareDates.map((booking) => {
      return this.bookings.getBookingRoom(booking.id)
    })

    console.log(compareDates, 'future book');
    const pushBookings = compareDates.forEach((booking) => {
      const pushRooms = bookingRooms.forEach((room) => {
        const createBooking = {
          bookingID: booking.id,
          userId: booking.userID,
          date: booking.date,
          roomNumber: room.number,
          roomType: room.roomType,
          bidet: room.bidet,
          bedSize: room.bedSize,
          numBeds: room.numBeds,
          Cost: room.costPerNight
        }
        createdBookings.push(createBooking)
      })
    })
    const filteredWithoutDuplicates = [...new Map(createdBookings.map((booking) => [booking.roomNumber, booking])).values(),];
    console.log(filteredWithoutDuplicates, 'filter');
    return filteredWithoutDuplicates;
  }

  calculateTotalCost() {
    const userBookings = this.bookings.getUserBookings(this.id)

    const bookingRooms = userBookings.map((booking) => {
      return this.bookings.getBookingRoom(booking.id)
    })
    const totalCost = bookingRooms.reduce((acc, room) => {
      return acc += room.costPerNight
    },0)

    return Math.round(totalCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  calculateAllUsersBookings() {
    let createdBookings = []
    const userBookings = this.bookings.getUserBookings(this.id)
    const bookingRooms = userBookings.map((booking) => {
      return this.bookings.getBookingRoom(booking.id)
    })
    const pushBookings = userBookings.forEach((booking) => {
      const pushRooms = bookingRooms.forEach((room) => {
        const createBooking = {
          bookingID: booking.id,
          userId: booking.userID,
          date: booking.date,
          roomNumber: room.number,
          roomType: room.roomType,
          bidet: room.bidet,
          bedSize: room.bedSize,
          numBeds: room.numBeds,
          Cost: room.costPerNight
        }
        createdBookings.push(createBooking)
      })
    })
    const filteredWithoutDuplicates = [...new Map(createdBookings.map((booking) => [booking.roomNumber, booking])).values(),];
    console.log(filteredWithoutDuplicates);
    return filteredWithoutDuplicates;
  }

  
  
  
}

module.exports = User;