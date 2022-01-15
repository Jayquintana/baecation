class Booking {
  constructor(bookingData, roomData) {
    this.bookingData = bookingData;
    this.roomData = roomData;
  }
  getUserBookings(userId) {
    let findBookings = this.bookingData.filter((booking) => {
        return booking.userID === userId
    })
    return findBookings
  }

  getBookingRoom(bookingId) {
    let findBooking = this.bookingData.find((booking) => {
      return booking.id === bookingId
    })

    let findRoom = this.roomData.find((room) => {
        return room.number ===  findBooking.roomNumber
    })
    return findRoom
  }
}

module.exports = Booking;