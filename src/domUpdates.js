const domUpdates = {

  hide(element) {
    element.classList.add("hidden");
  },

  show(element) {
    element.classList.remove("hidden");
  },

  changeText(element, text) {
    element.innerText = text
  },

  createBookings(section, booking) {
    section.innerHTML += `
        <table class="booking-table">
          <tr>
            <th>Date:</th>
            <th>Room Number:</th>
            <th>Room Type:</th>
            <th>Bidet:</th>
            <th>Bed Size:</th>
            <th>Number of beds</th>
            <th>Price Per night:</th>
          </tr>
          <tr>
            <td>${booking.date}</td>
            <td>${booking.roomNumber}</td>
            <td>${booking.roomType}</td>
            <td>${booking.bidet}</td>
            <td>${booking.bedSize}</td>
            <td>${booking.numBeds}</td>
            <td>${booking.Cost}</td>
          </tr>
        </table>`
  },

  createAvailableRooms(section, room){
    section.innerHTML += `
        <table class="booking-table">
            <tr>
              <th>Room Number:</th>
              <th>Room Type:</th>
              <th>Bidet:</th>
              <th>Bed Size:</th>
              <th>Number of beds</th>
              <th>Price Per night:</th>
              <th>Book now!</th>
            </tr>
            <tr>
              <td>${room.number}</td>
              <td>${room.roomType}</td>
              <td>${room.bidet}</td>
              <td>${room.bedSize}</td>
              <td>${room.numBeds}</td>
              <td>${room.costPerNight}</td>
              <td><button id="${room.number}" class="book-now">Book</button></td>
            </tr>
          </table>`
  },

  displayUserName(userTitle, currentUser) {
    userTitle.innerText = `Welcome! ${currentUser.name}`
  }
}
export default domUpdates;