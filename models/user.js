import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        // If it's not unique or not added it'll show an error with the msg bellow
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    username: {
        type: String,
        required: [true, 'User name is required'],
        match: [/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username invalid, it should contain 6-20 alphanumeric letters and be unique!']
    },
})

// Checks if a user model already exists, if not then it created a new one and assigns it to
// a "User" variable

const User = models.User || model('User', UserSchema)

export default User