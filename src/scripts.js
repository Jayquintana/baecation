
import './css/base.scss';
import Booking from '../src/classes/Booking.js';
import User from '../src/classes/User.js';
import { customerData, roomData, bookingData} from './apiCalls';
import dayjs from 'dayjs';


// navigation section 
const navButtonsBox = document.querySelector('.nav-buttons');
const userTitle = document.querySelector('.hello-user-title');
const currentPageTitle = document.querySelector('.current-page-title');
const checkBookingsButton = document.querySelector('.check-bookings-button');
const expenseTrackingButton = document.querySelector('.expense-tracking-button');
const goBackButton = document.querySelector('.go-back-button');
const currentBookingButton = document.querySelector('.current-bookings');
const pastBookingButton = document.querySelector('.past-bookings');
const futureBookingButton = document.querySelector('.future-bookings');

//main section 
const pageTitle = document.querySelector('.page-title');
const bookingSection = document.querySelector('.bookings-section');
const mainPage = document.querySelector('.main-section');
const dateInput = document.querySelector('.date-input');
const dateInputButton = document.querySelector('.date-input-button');
const dateSelectionsection = document.querySelector('.date-selection-section');
const availableRooms = document.querySelector('.available-rooms');
const selectDateTitle = document.querySelector('.start-booking');
const filterTags = document.querySelector('.filter-tags');
const checkboxes = document.querySelectorAll('.checkbox')
const filterTagstitle = document.querySelector('.tags-title')
const allRoomsRadioButton = document.querySelector('#allRooms')
const loadingbar = document.querySelector('.loading')
const dateSelectionBox = document.querySelector('.select-date-box')
const tagsBox = document.querySelector('.filter-buttons')
const backToMainButton = document.querySelector('.back-to-main')

//global vaiables 
let currentUser;
let bookings; 
let users;
let selectedDate;



//promise and api related 
Promise.all([customerData, roomData, bookingData])
.then((data) => {
  console.log(data[2].bookings[data[2].bookings.length -1]);
  bookings = new Booking(data[2].bookings, data[1].rooms)
  users = data[0].customers.map((customer) => {
    return new User(customer.id, customer.name, bookings)
  })
  currentUser = users[Math.floor(Math.random() * users.length)];
  displayUserName()
  dateInput.min = dayjs().format('YYYY-MM-DD')
  filterCheckBoxes()
})



//reausable functions 
const hide = (element) => {
  element.classList.add("hidden");
};

const show = (element) => {
  element.classList.remove("hidden");
};

const changeText = (element, text) => {
  element.innerText = text
}
//event handlers
const displayUserName = () => {
  userTitle.innerText = `Welcome! ${currentUser.name}`
}
const createTodaysDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;

  return today
}

const backToMain = () => {
  bookingSection.innerHTML = ''
  availableRooms.innerHTML = ''
  changeText(pageTitle, 'Book With baecation')
  changeText(selectDateTitle, 'Start Booking, Select A Date:')
  hide(currentBookingButton)
  hide(pastBookingButton)
  hide(futureBookingButton)
  show(expenseTrackingButton)
  show(checkBookingsButton)
  hide(goBackButton)
  show(dateSelectionsection)
  show(dateInput)
  show(dateSelectionBox)
  show(filterTags)
  hide(tagsBox)
  hide(filterTagstitle)
  hide(backToMainButton)
}

const createBookings = (booking) => {
    bookingSection.innerHTML += `
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
}

const checkCurrentBookings = () => {
  bookingSection.innerHTML = ''
  hide(dateSelectionBox)
  hide(filterTags)
  hide(expenseTrackingButton)
  hide(checkBookingsButton)
  show(goBackButton)
  show(currentBookingButton)
  show(pastBookingButton)
  show(futureBookingButton)
  changeText(pageTitle, 'Current Bookings')
  if (currentUser.calculateCurrentBooking(createTodaysDate()).length) { 
      const displayBooking = currentUser.calculateCurrentBooking(createTodaysDate()).map((booking) => {
        createBookings(booking)
    })
    return displayBooking
  } else {
    changeText(pageTitle, ' 0 Current Bookings Found')
  }

}

const checkPastBookings = () => {
  bookingSection.innerHTML = ''
  changeText(pageTitle, 'Past Bookings')
  if (currentUser.calculatePastBooking(createTodaysDate()).length) {
    const displayBooking = currentUser.calculatePastBooking(createTodaysDate()).map((booking) => {
      createBookings(booking)
    })
  } else {
    changeText(pageTitle, ' 0 Past Bookings Found')
  }
}

const checkFutureBookings = () => {
  bookingSection.innerHTML = ''
  changeText(pageTitle, 'Upcoming Bookings')
  if (currentUser.calculateFutureBooking(createTodaysDate()).length) {
    const displayBooking = currentUser.calculateFutureBooking(createTodaysDate()).map((booking) => {
      createBookings(booking)
    })
  } else {
    changeText(pageTitle, ' 0 Upcoming Bookings Found')
  }
}

const displayTotalCost = () => {
  bookingSection.innerHTML = ''
  hide(expenseTrackingButton)
  hide(checkBookingsButton)
  hide(dateSelectionsection)
  show(goBackButton)
  changeText(pageTitle, `Total Spent At Baecation: $ ${currentUser.calculateTotalCost()} Dollars`)

  currentUser.calculateAllUsersBookings().map((booking) => {
    createBookings(booking)
  })
}

const displayBookingDates = () => {
  availableRooms.innerHTML = ''
  selectedDate = dayjs(dateInput.value).format('YYYY/MM/DD')
  const openRooms = currentUser.bookings.availableRooms(selectedDate)
  if (openRooms.length) {
      openRooms .map((room) => {
        changeText(selectDateTitle, `Rooms Available On: ${dayjs(selectedDate).format('MM/DD/YYYY')}`)
        uncheckRadioButtons()
        hide(dateInput)
        show(goBackButton)
        show(filterTags)
        show(tagsBox)
        // show()
        availableRooms.innerHTML += `
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
          </table>
    `
      })
    } else {
    changeText(selectDateTitle, `Sorry, No Rooms Available`)
      show(goBackButton)
    }
}

const filterCheckBoxes = () => {
  checkboxes.forEach((box) => {
    box.addEventListener('change', function () {
      const filteredRooms = filterRoomsByTag(box.id)
      if (filteredRooms.length) {
        availableRooms.innerHTML = ''
        filteredRooms.map((room) =>{
          changeText(filterTagstitle, `Available ${room.roomType}s`)
          availableRooms.innerHTML += `
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
            <tr class="table-output">
              <td>${room.number}</td>
              <td>${room.roomType}</td>
              <td>${room.bidet}</td>
              <td>${room.bedSize}</td>
              <td>${room.numBeds}</td>
              <td>${room.costPerNight}</td>
              <td><button id="${room.number}" class="book-now">Book</button></td>
            </tr>
          </table>`
        })

      } else {
        availableRooms.innerHTML = ''
        changeText(filterTagstitle, 'Sorry No Rooms Available')

      }
    })
  })
}

const uncheckRadioButtons = () => {
  checkboxes.forEach((tag) => {
    tag.checked = false
  })
}

const filterRoomsByTag = (roomType) => {
  const filteredRooms =  currentUser.bookings.availableRooms(selectedDate).filter((room) => {
      return room.roomType === roomType
    })
  return filteredRooms
}

const postBookings =  (event) => {
  let room = parseInt(event.target.id, 10);
  let id = currentUser.id
  const newBooking = currentUser.bookings.createNewBooking(room, id, selectedDate)
  
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(newBooking),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .catch((err) => changeText(pageTitle, `Error, Something went Wrong`));
  availableRooms.innerHTML = ''
  changeText(pageTitle, 'Loading Your Booking')
  hide(filterTags)
  hide(dateSelectionBox)
  show(loadingbar)

  setTimeout(() => {
    fetchData()
    hide(loadingbar)
    changeText(pageTitle, 'Room Successfully Booked! ')
    show(backToMainButton)
  }, 2000);
}

const fetchData = () => {
  const customerDatas = fetch('http://localhost:3001/api/v1/customers')
    .then((response) => response.json())

  const roomDatas = fetch('http://localhost:3001/api/v1/rooms')
    .then((response) => response.json())

  const bookingDatas = fetch('http://localhost:3001/api/v1/bookings')
    .then((response) => response.json())

  Promise.all([customerDatas, roomDatas, bookingDatas])
    .then((data) => {
      bookings = new Booking(data[2].bookings, data[1].rooms)
      currentUser = new User(currentUser.id, currentUser.name, bookings)
    })
}





//event listeners 
checkBookingsButton.addEventListener('click', checkCurrentBookings)
goBackButton.addEventListener('click', backToMain)
pastBookingButton.addEventListener('click', checkPastBookings)
currentBookingButton.addEventListener('click', checkCurrentBookings)
futureBookingButton.addEventListener('click', checkFutureBookings)
expenseTrackingButton.addEventListener('click', displayTotalCost)
dateInput.addEventListener('change', displayBookingDates);
availableRooms.addEventListener('click', postBookings)
backToMainButton.addEventListener('click', backToMain)
allRoomsRadioButton.addEventListener('change', function() {
  changeText(filterTagstitle, 'All Rooms')
  displayBookingDates()
  
})
