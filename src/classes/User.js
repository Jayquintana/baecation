
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  
  }

  calculateCurrentBooking(id, todaysDate) {

    //current user
    // current date 

    // This function will take in a user id as an argument 
    //will also take in a date argument
    // match that id with a booking 
    //will match the date to see if the booking is for today
    // use the booking method to get the room 
    //now we have a booking obj and we want to spit put an object of our own 
    

      // expected output
    // const booking = {
    //   roomNumber: 12,
    //   dateBooked: "2022/01/24",
    //   roomType: "residential suite", 
    //   bidet: false,
    //   bedSize: "king",
    //   numBeds: 1,  
    //   costPerNight: 491.14
    // }
  }
}

module.exports = User;