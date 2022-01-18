
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
const goBackButton = document.querySelector('.go-back-button')
const currentBookingButton = document.querySelector('.current-bookings')
const pastBookingButton = document.querySelector('.past-bookings')
const futureBookingButton = document.querySelector('.future-bookings');

//main section 
const pageTitle = document.querySelector('.page-title')
const bookingSection = document.querySelector('.bookings-section')
const mainPage = document.querySelector('.main-section');
const dateInput = document.querySelector('.date-input')
const dateInputButton = document.querySelector('.date-input-button')
const dateSelectionsection = document.querySelector('.date-selection-section')



//global vaiables 
let currentUser;
let bookings; 
let users;
let selectedDate;



//promise and api related 
Promise.all([customerData, roomData, bookingData])
.then((data) => {
  bookings = new Booking(data[2].bookings, data[1].rooms)
  users = data[0].customers.map((customer) => {
    return new User(customer.id, customer.name, bookings)
  })
  currentUser = users[Math.floor(Math.random() * users.length)];
  console.log(currentUser);
  displayUserName()
  console.log(dayjs());
  dateInput.value = createTodaysDate()
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
  hide(currentBookingButton)
  hide(pastBookingButton)
  hide(futureBookingButton)
  show(expenseTrackingButton)
  show(checkBookingsButton)
  show(dateSelectionsection)
  changeText(pageTitle, 'Book With baecation')
  hide(goBackButton)
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
  hide(dateSelectionsection )
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
  hide(dateSelectionsection )
  show(goBackButton)
  changeText(pageTitle, `Total Spent At Baecation: $ ${currentUser.calculateTotalCost()} Dollars`)

  currentUser.calculateAllUsersBookings().map((booking) => {
    createBookings(booking)
  })
}
const convertDate = (date) => {
  
}

const displayBookingDates = () => {
  selectedDate = dateInput.value
  const openRooms = currentUser.bookings.availableRooms(selectedDate)
  console.log(selectedDate);
  
}

//event listeners 
checkBookingsButton.addEventListener('click', checkCurrentBookings)
goBackButton.addEventListener('click', backToMain)
pastBookingButton.addEventListener('click', checkPastBookings)
currentBookingButton.addEventListener('click', checkCurrentBookings)
futureBookingButton.addEventListener('click', checkFutureBookings)
expenseTrackingButton.addEventListener('click', displayTotalCost)
dateInput.addEventListener('change', displayBookingDates)

