import dotenv from 'dotenv'
dotenv.config()
import { Webhook } from 'svix'
import userModel from '../model/user.js';
import Razorpay from 'razorpay'
import transactionModel from '../model/transactions.js';

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



//api controller function to get user availbale creadits data
const userCredits = async (req, res) => {
    try {

        const { clerkId } = req.user
        const userData = await userModel.findOne({ clerkId });

        if (!userData)
            return res.json({ success: false, message: "user not found" });


        res.json({ success: true, credits: userData.creditBalanace });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//getway initailize
const razorpayInstance = new Razorpay({
    key_id: process.env.ROZORPAY_ID,
    key_secret: process.env.ROZORPAY_SECRET,
});

//api to make payment  for credits
const paymnetRazorPay = async (req, res) => {
    try {
        const { clerkId } = req.user
        const { planId } = req.body
        const userData = await userModel.findOne({ clerkId })
        if (!userData || !planId)
            return res.json({ success: false, message: "invalid credentials" })

        let credits, plan, amount, data

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 10
                amount = 10
                break;

            case "Advance":
                plan = 'Advance'
                credits = 20
                amount = 50
                break;

            case 'Business':
                plan = 'Business';
                credits = 30
                amount = 250
                break;
        }

        const date = Date.now()


        //creating transactions
        const transactionData = {
            credits, plan, clerkId, amount, date,
        }

        const newTransaction = await transactionModel.create(transactionData)
        console.log("New transactions", newTransaction)
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id

        }

        await razorpayInstance.orders.create(options, (err, order) => {
            if (err)
                return res.json({ message: err, success: false })
            res.json({ success: true, order })
        })

    } catch (error) {

    }
}


//api controller finction to verify razorpay payment verifu
export const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        if (!razorpay_order_id)
            return res.json({ success: false, message: "razorpay_order_id is requried" })

        const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderinfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderinfo.receipt)
            if (transactionData.payment) {
                return res.json({ success: false, message: "Payment failed" })
            }

            // adding credits in user Data
            const userData = await userModel.findOne({ clerkId: transactionData.clerkId })
            const creditBalanace = transactionData.credits + userData.creditBalanace
            await userModel.findByIdAndUpdate(userData._id, { creditBalanace })

            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

            res.json({ messag: "Credits added", success: true, })
        }
    } catch (error) {

    }
}


export { webhooks, userCredits, paymnetRazorPay };
