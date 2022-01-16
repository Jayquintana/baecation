
import './css/base.scss';
import Booking from '../src/classes/Booking.js';
import User from '../src/classes/User.js';
import { customerData, roomData, bookingData} from './apiCalls';


// navigation section 
const navButtonsBox = document.querySelector('.nav-buttons');
const bookingSection = document.querySelector('.bookings-section')
const userTitle = document.querySelector('.hello-user-title');
const currentPageTitle = document.querySelector('.current-page-title');
const checkBookingsButton = document.querySelector('.check-bookings-button');
const expenseTrackingButton = document.querySelector('.expense-tracking-button');
const goBackButton = document.querySelector('.go-back-button')
//main section 
const pageTitle = document.querySelector('.page-title')


//global vaiables 
let currentUser;
let bookings; 
let users;



//promise and api related 
Promise.all([customerData, roomData, bookingData])
.then((data) => {
  bookings = new Booking(data[2].bookings, data[1].rooms)
  users = data[0].customers.map((customer) => {
    return new User(customer.id, customer.name, bookings)
  })
  currentUser = users[Math.floor(Math.random() * users.length)];
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

const createTodaysDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;

  return today
}

const backToMain = () => {
  navButtonsBox.innerHTML = `
  <button class="check-bookings-button">Check Bookings</button>
        <button class="expense-tracking-button">Expense Tracking</button>
  `
  changeText(pageTitle, 'Book With baecation')
  hide(goBackButton)
}

const createBookings = (date, roomNumber, roomType, bidet, bedSize, numBeds, cost) => {
    bookingSection.innerHTML = `
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
            <td>${date}</td>
            <td>${roomNumber}</td>
            <td>${roomType}</td>
            <td>${bidet}</td>
            <td>${bedSize}</td>
            <td>${numBeds}</td>
            <td>${cost}</td>
          </tr>
        </table>`
}

const checkCurrentBookings = () => {
  show(goBackButton)
  changeText(pageTitle, 'Current Bookings')
  navButtonsBox.innerHTML = `
  <button class="past-bookings">Past Bookings</button>
  <button class="current-bookings">Current Bookings</button>
  <button class="future-bookings">Upcoming Bookings</button>
  `

  const loop = currentUser.calculateCurrentBooking(createTodaysDate()).map((booking) => {
    createBookings(booking.date, booking.roomNumber, 
                    booking.roomType, booking.bidet, 
                    booking.bedSize, booking.numBeds, 
                    booking.Cost)
})

  console.log(currentUser.calculateCurrentBooking(createTodaysDate()));

}


  


//event listeners 
checkBookingsButton.addEventListener('click', checkCurrentBookings)
goBackButton.addEventListener('click', backToMain)