import dotenv from 'dotenv'
dotenv.config()
import { Webhook } from 'svix'
import userModel from '../model/user.js';

//api controller function to mangae clerk user with database
//api/user/webhooks

const webhooks = async (req, res) => {
    try {
        // Create instance of webhook from svix with secret
        const webhook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET);

        // Verify webhook signature
        const svixHeaders = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        }
        
        const payload = JSON.stringify(req.body);
        
        try {
            webhook.verify(payload, svixHeaders);
        } catch (err) {
            console.error('Webhook verification failed:', err);
            return res.status(401).json({ success: false, message: 'Invalid webhook signature' });
        }

        const { type, data } = req.body;

        //trigger according to type of event 
        switch (type) {
            case 'user.created': {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses?.[0]?.email_address,
                    firstName: data.first_name || '',
                    LastName: data.last_name || '',
                    creditBalanace: 5,
                    photo: data.image_url || '',
                }

                const user = new userModel(userData);
                await user.save();

                return res.status(200).json({ success: true });
            }
            case 'user.deleted': {
                await userModel.findOneAndDelete({ clerkId: data.id });
                return res.status(200).json({ success: true });
            }
            case 'user.updated': {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses?.[0]?.email_address,
                    firstName: data.first_name || '',
                    LastName: data.last_name || '',
                    creditBalanace: 5,
                    photo: data.image_url || '',
                }

                await userModel.findOneAndUpdate(
                    { clerkId: data.id }, 
                    userData,
                    { new: true }
                );
                return res.status(200).json({ success: true });
            }
            default:
                return res.status(400).json({ success: false, message: 'Unsupported webhook type' });
        }

    } catch (error) {
        console.error('Webhook processing error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export { webhooks };
