
import './css/base.scss';
import './images/turing-logo.png'
import './classes/Booking.js'
import { customerData, roomData, bookingData} from './apiCalls';


// navigation section 
const userTitle = document.querySelector('.hello-user-title');
const currentPageTitle = document.querySelector('.current-page-title');
const checkBookingsButton = document.querySelector('.check-bookings-button');
const expenseTrackingButton = document.querySelector('.expense-tracking-button');
const navButtonsBox = document.querySelector('.nav-buttons');
const bookingsSection = document.querySelector('.bookings-section')
//main section 
const pageTitle = document.querySelector('.page-title')


//global vaiables 
let currentUser;


//promise and api related 
Promise.all([customerData, roomData, bookingData])
.then((data) => {
  console.log(data);
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

const createBookings = (date, roomNumber, roomType, bidet, bedsize) => {
  bookingsSection.innerHTML = `
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
            <td>2022/01/14</td>
            <td>3</td>
            <td>suit</td>
            <td>false</td>
            <td>queen</td>
            <td>2</td>
            <td>457.88</td>
          </tr>
        </table>`
}

const viewBookings = () => {
  changeText(pageTitle, 'Current Bookings')
  navButtonsBox.innerHTML = `
  <button class="past-bookings">Past Bookings</button>
  <button class="current-bookings">Current Bookings</button>
  <button class="future-bookings">Upcoming Bookings</button>
  `



}


  


//event listeners 
checkBookingsButton.addEventListener('click',viewBookings)