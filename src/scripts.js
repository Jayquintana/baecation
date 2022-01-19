
import './css/base.scss';
import Booking from '../src/classes/Booking.js';
import User from '../src/classes/User.js';
import { customerData, roomData, bookingData} from './apiCalls';
import domUpdates from './domUpdates';
import dayjs from 'dayjs';


// navigation section ----------
const headNav = document.querySelector('.head-navigation');
const userTitle = document.querySelector('.hello-user-title');
const goBackButton = document.querySelector('.go-back-button');
const checkBookingsButton = document.querySelector('.check-bookings-button');
const expenseTrackingButton = document.querySelector('.expense-tracking-button');
const currentBookingButton = document.querySelector('.current-bookings');
const pastBookingButton = document.querySelector('.past-bookings');
const futureBookingButton = document.querySelector('.future-bookings');


//main section -----------
//sections and articles
const bookingSection = document.querySelector('.bookings-section');
const dateSelectionsection = document.querySelector('.date-selection-section');
const availableRooms = document.querySelector('.available-rooms');
const mainPage = document.querySelector('.main-section');
const filterTags = document.querySelector('.filter-tags');
const dateSelectionBox = document.querySelector('.select-date-box');
//Buttons
const backToMainButton = document.querySelector('.back-to-main');
const tagsBox = document.querySelector('.filter-buttons');
const allRoomsRadioButton = document.querySelector('#allRooms');
//Titles and inputs
const pageTitle = document.querySelector('.page-title');
const dateInput = document.querySelector('.date-input');
const selectDateTitle = document.querySelector('.start-booking');
const checkboxes = document.querySelectorAll('.checkbox');
const filterTagstitle = document.querySelector('.tags-title');
const loadingbar = document.querySelector('.loading');

//login --------------
const loginButton = document.querySelector('#login-form-submit');
const loginForm = document.querySelector('.login-form');
const loginError = document.querySelector('.login-error-msg-holder');
const logInheader = document.querySelector('.login-header');
const loginPage = document.querySelector('.login-page');

//global vaiables 
let customers;
let bookings; 
let selectedDate;
let currentUser;

//promise and api related 
Promise.all([customerData, roomData, bookingData])
.then((data) => {
  bookings = new Booking(data[2].bookings, data[1].rooms)
  customers = data[0].customers
  dateInput.min = dayjs().format('YYYY-MM-DD')
  filterCheckBoxes()
})


//event handlers
const createTodaysDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;

  return today
}

const uncheckRadioButtons = () => {
  checkboxes.forEach((tag) => {
    tag.checked = false
  })
}

const backToMain = () => {
  bookingSection.innerHTML = ''
  availableRooms.innerHTML = ''
  domUpdates.changeText(pageTitle, 'Book With baecation')
  domUpdates.changeText(selectDateTitle, 'Start Booking, Select A Date:')
  uncheckRadioButtons()
  domUpdates.hide(currentBookingButton)
  domUpdates.hide(pastBookingButton)
  domUpdates.hide(futureBookingButton)
  domUpdates.hide(goBackButton)
  domUpdates.hide(tagsBox)
  domUpdates.hide(backToMainButton)
  domUpdates.hide(filterTagstitle)
  domUpdates.show(expenseTrackingButton)
  domUpdates.show(checkBookingsButton)
  domUpdates.show(dateSelectionsection)
  domUpdates.show(dateInput)
  domUpdates.show(dateSelectionBox)
  domUpdates.show(filterTags)
}

const checkCurrentBookings = () => {
  bookingSection.innerHTML = ''
  domUpdates.hide(dateSelectionsection)
  domUpdates.hide(dateSelectionBox)
  domUpdates.hide(filterTags)
  domUpdates.hide(expenseTrackingButton)
  domUpdates.hide(checkBookingsButton)
  domUpdates.show(goBackButton)
  domUpdates.show(currentBookingButton)
  domUpdates.show(pastBookingButton)
  domUpdates.show(futureBookingButton)
  domUpdates.changeText(pageTitle, 'Current Bookings')
  if (currentUser.calculateCurrentBooking(createTodaysDate()).length) { 
      const displayBooking = currentUser.calculateCurrentBooking(createTodaysDate()).map((booking) => {
        domUpdates.createBookings(bookingSection, booking)
    })
    return displayBooking
  } else {
    domUpdates.changeText(pageTitle, ' 0 Current Bookings Found')
  }

}

const checkPastBookings = () => {
  bookingSection.innerHTML = ''
  domUpdates.changeText(pageTitle, 'Past Bookings')
  if (currentUser.calculatePastBooking(createTodaysDate()).length) {
    const displayBooking = currentUser.calculatePastBooking(createTodaysDate()).map((booking) => {
      domUpdates.createBookings(bookingSection, booking)
    })
  } else {
    domUpdates.changeText(pageTitle, ' 0 Past Bookings Found')
  }
}

const checkFutureBookings = () => {
  bookingSection.innerHTML = ''
  domUpdates.changeText(pageTitle, 'Upcoming Bookings')
  if (currentUser.calculateFutureBooking(createTodaysDate()).length) {
    const displayBooking = currentUser.calculateFutureBooking(createTodaysDate()).map((booking) => {
      domUpdates.createBookings(bookingSection, booking)
    })
  } else {
    domUpdates.changeText(pageTitle, ' 0 Upcoming Bookings Found')
  }
}

const displayTotalCost = () => {
  bookingSection.innerHTML = ''
  domUpdates.hide(expenseTrackingButton)
  domUpdates.hide(checkBookingsButton)
  domUpdates.hide(dateSelectionsection)
  domUpdates.show(goBackButton)
  domUpdates.changeText(pageTitle, `Total Spent At Baecation: $ ${currentUser.calculateTotalCost()} Dollars`)

  currentUser.calculateAllUsersBookings().map((booking) => {
    domUpdates.createBookings(bookingSection, booking)
  })
}

const displayBookingDates = () => {
  availableRooms.innerHTML = ''
  selectedDate = dayjs(dateInput.value).format('YYYY/MM/DD')
  const openRooms = currentUser.bookings.availableRooms(selectedDate)
  if (openRooms.length) {
      openRooms .map((room) => {
        domUpdates.changeText(selectDateTitle, `Rooms Available On: ${dayjs(selectedDate).format('MM/DD/YYYY')}`)
        uncheckRadioButtons()
        domUpdates.hide(dateInput)
        domUpdates.show(goBackButton)
        domUpdates.show(filterTags)
        domUpdates.show(tagsBox)
        domUpdates.show(filterTagstitle)
        domUpdates.createAvailableRooms(availableRooms, room)
      })
    } else {
    domUpdates.changeText(selectDateTitle, `We apologize for the inconvenience, No rooms available`)
      domUpdates.show(goBackButton)
    }
}

const filterCheckBoxes = () => {
  checkboxes.forEach((box) => {
    box.addEventListener('change', function () {
      const filteredRooms = filterRoomsByTag(box.id)
      if (filteredRooms.length) {
        availableRooms.innerHTML = ''
        filteredRooms.map((room) =>{
          domUpdates.changeText(filterTagstitle, `Available ${room.roomType}s`)
          domUpdates.createAvailableRooms(availableRooms, room)
        })
      } else {
        availableRooms.innerHTML = ''
        domUpdates.changeText(filterTagstitle, 'We apologize for the inconvenience, No rooms available')

      }
    })
  })
}

const filterRoomsByTag = (roomType) => {
  const filteredRooms =  currentUser.bookings.availableRooms(selectedDate).filter((room) => {
      return room.roomType === roomType
    })
  return filteredRooms
}

const postBookings =  (event) => {
  if (event.target.id) {
    let room = parseInt(event.target.id, 10);
    let id = currentUser.id
    const newBooking = currentUser.bookings.createPostBooking(room, id, selectedDate)
    
    fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(newBooking),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .catch((err) => domUpdates.changeText(pageTitle, `Error, Something went Wrong`));
    availableRooms.innerHTML = ''
    domUpdates.changeText(pageTitle, 'Loading Your Booking')
    domUpdates.hide(filterTags)
    domUpdates.hide(dateSelectionBox)
    domUpdates.show(loadingbar)

    setTimeout(() => {
      fetchNewData()
      domUpdates.hide(loadingbar)
      domUpdates.changeText(pageTitle, 'Room Successfully Booked! ')
      domUpdates.show(backToMainButton)
    }, 2000);
  }
}

const fetchNewData = () => {
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

const checkLogIn = (event) => {
  event.preventDefault()
  const userName = loginForm.username.value;
  const password = loginForm.password.value;
  const userNumber = parseInt(userName.replace(/[^0-9]/g, ''), 10)

  if (userName === `customer${userNumber}` && password === 'overlook2021') {
    const customer = customers.find((customer) => {
    return customer.id === userNumber
  })
    currentUser = new User(customer.id, customer.name, bookings)
    domUpdates.displayUserName(userTitle, currentUser)
    domUpdates.show(headNav)
    domUpdates.show(mainPage)
    domUpdates.hide(loginPage)
} else {
    domUpdates.show(loginError)
    setTimeout(() => {
      domUpdates.hide(loginError)
    }, 2000)
  } 
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
loginButton.addEventListener('click', function (event) {
  checkLogIn(event)
})
allRoomsRadioButton.addEventListener('change', function() {
  domUpdates.changeText(filterTagstitle, 'All Rooms')
  displayBookingDates()
})
