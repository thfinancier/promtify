import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

// params get populated if dynamic variables are passed to the url. 
// Such as this one: /api/users/${session?.user.id}/posts in the profile page.
export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({creator: params.id}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch data', { status: 500 })
    }
}