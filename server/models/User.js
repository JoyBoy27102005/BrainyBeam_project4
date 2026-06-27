// In-memory user storage (no database required)
// Stores users in a simple object: { email: { name, email, _id, createdAt } }

const users = {}
let idCounter = 1

class User {
  static async findOne(query) {
    const email = query.email
    return users[email] ? { ...users[email] } : null
  }

  static async findById(id) {
    for (const email in users) {
      if (users[email]._id === id) {
        const storedData = users[email]
        // Create a User instance (without calling constructor) so save() is available
        const user = Object.create(User.prototype)
        user.name = storedData.name
        user.email = storedData.email
        user._id = storedData._id
        user.createdAt = storedData.createdAt
        return user
      }
    }
    return null
  }

  constructor(data) {
    this.name = data.name
    this.email = data.email
    this._id = String(idCounter++)
    this.createdAt = new Date()
  }

  async save() {
    users[this.email] = { name: this.name, email: this.email, _id: this._id, createdAt: this.createdAt }
    return this
  }
}

module.exports = User
