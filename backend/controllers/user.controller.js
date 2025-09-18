
import { Webhook } from 'svix'
import userModel from '../model/user.js';

//api controller function to mangae clerk user with database
//api/user/webhooks

const webhooks = async (req, res) => {

    try {

        // creat instansce of webhook from svix with scret 
        const webhook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET);

        // get verifyed webhooks
        webhook.verify(JSON.stringify(req.body), {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        })

        const { type, data } = req.body;

        //trigger according to type of event 
        switch (type) {
            case 'user.created': {

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    LastName: data.last_name,
                    creditBalanace: 5,
                    photo: data.image_url,
                }

                const user = new userModel(userData);
                await user.save();

                res.json({})
                break
            }
            case 'user.deleted': {
                await userModel.findOneAndDelete({ clerkId: data.id })
                res.json({})
                break
            }
            case 'user.updated': {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    LastName: data.last_name,
                    creditBalanace: 5,
                    photo: data.image_url,
                }

                await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
                res.json()

                break
            }
            default:
        }


    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}


export  {webhooks};