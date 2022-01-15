
class User {
  constructor(id, name, bookings) {
    this.id = id;
    this.name = name;
    this.bookings = bookings
    this.currentBookings = []
  
  }

  calculateCurrentBooking(todaysDate) {
    let createBooking;
    const userBookings = this.bookings.getUserBookings(this.id)

    const compareDates = userBookings.filter((booking) => {
      return booking.date === todaysDate
    });

    const bookingRooms = compareDates.map((booking) => {
      return this.bookings.getBookingRoom(booking.id)
    })

    const pushBookings = compareDates.forEach((booking)=>{
      const pushRooms = bookingRooms.forEach((room)=>{
          const createBooking = {
            userId: booking.userID,
            date: booking.date,
            roomNumber: room.number,
            roomType: room.roomType,
            bidet: room.bidet,
            bedSize: room.bedSize,
            numBeds: room.numBeds,
            Cost: room.costPerNight
        }
        this.currentBookings.push(createBooking)
      })
    })

    



    console.log(this.currentBookings);
  }
}

module.exports = User;