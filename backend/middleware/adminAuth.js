import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try{
        const {token} = req.headers
        console.log(token);
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }
        console.log(process.env.JWT_SECRET);
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id !== process.env.ADMIN_ID){
            return res.status(401).json({message: "Unauthorized"});
        }
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

export default adminAuth;