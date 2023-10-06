// Every nextjs route is a serverless route, which means that this is a Lambda function
// that opens up ONLY when it gets called. Everytime it gets called it needs to spin up 
// the server and make a connection to the DB

import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from '@models/user'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({session}) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString()

        return session
    },
    async signIn({profile}) {
        try {
            await connectToDB()
            // Check if the user is already exists
            const userExists = await User.findOne({
                email: profile.email
            })

            // If not, create a new user and save it to a db
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    // Replacing any space with no space and making all letter lowercase
                    username: profile.email.replace(' ', '').toLowerCase,
                    image: profile.picture
                })
            }

            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
})

// Accoarding to off docs this how one should export it
export {handler as GET, handler as POST}