class Booking {
  constructor(bookingData, roomData) {
    this.bookingData = bookingData;
    this.roomData = roomData;
  }
  getUserBookings(userId) {
    const findBookings = this.bookingData.filter((booking) => {
        return booking.userID === userId
    })
    return findBookings
  }

  getBookingRoom(bookingId) {
    const findBooking = this.bookingData.find((booking) => {
      return booking.id === bookingId
    })
    const findRoom = this.roomData.find((room) => {
        return room.number ===  findBooking.roomNumber
    })
    return findRoom
  }

  availableRooms(date) {
    const availableRooms = [];
    const findBookings = this.bookingData.filter((booking) => {
      return booking.date === date
    })
    const findRooms = findBookings.map((booking) => {
      return this.getBookingRoom(booking.id)
    })
    const filter = this.roomData.filter((allRoom) => !findRooms.find(room => allRoom.number === room.number))
    return filter
  }

  createNewBooking(roomNumber, customerId, date) {
    let serialNumber = Math.random().toString(36).substr(2, 9);
    const createNewBooking = {
      id: serialNumber,
      userID: customerId,
      date: date,
      roomNumber: roomNumber,
      roomServiceCharges: []
    }
    return createNewBooking
  }
  
}

module.exports = Booking;