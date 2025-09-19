import jwt from 'jsonwebtoken'

//middleware fucntion to decode jwt token to get clrkidr
const authUser = async (req, res, next) => {
    try {
        //get token from request header
        const {token}= req.headers
        //verify token  
        if(!token){
            return res.json({success:false, message:"Not authorized  login again"})
        }

        const token_decod= jwt.decode(token)

        // Store clerkId in req.user instead of req.body since it's authentication data
        req.user = {
            clerkId: token_decod.clerkId
        }
        next();

    } catch (error) {
        console.error('Webhook processing error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default authUser