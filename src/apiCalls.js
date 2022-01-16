const customerData = fetch('http://localhost:3001/api/v1/customers')
.then((response) => response.json())

const roomData = fetch('http://localhost:3001/api/v1/rooms')
.then((response) => response.json())

const bookingData = fetch('http://localhost:3001/api/v1/bookings')
.then((response) => response.json())

export {customerData, roomData, bookingData};