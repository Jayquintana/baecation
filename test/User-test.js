import { expect } from 'chai';
import User from '../src/classes/User.js'
import customers from '../src/test-data/customer-data.js'

describe('User', () => {
  const users = customers.map((user) => {
    return new User(user.id, user.name)
  })

  console.log(users);

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('should be an instace of booking', () => {
    expect(users[0]).to.be.an.instanceOf(User)
    expect(users[9]).to.be.an.instanceOf(User)
  })

  it('should hold the user id', () => {
    expect(users[0].id).to.equal(1)
    expect(users[10].id).to.equal(11)
  })
  it('should hold the users name', () => {
    expect(users[0].name).to.equal('Leatha Ullrich')
    expect(users[10].name).to.equal('Melissa Sauer')
  })

  it('should show the users current booking', () => {
    expect(users[0].calculateCurrentBooking()).to.deep.equal()
  })
})