const customerData = fetch('http://localhost:3001/api/v1/customers')
.then((respoce) => responce.json())

const roomData = fetch('http://localhost:3001/api/v1/rooms')
.then((respoce) => responce.json())

const bookingData = fetch('http://localhost:3001/api/v1/bookings')
.then((respoce) => responce.json())

export {customerData, roomData, bookingData};