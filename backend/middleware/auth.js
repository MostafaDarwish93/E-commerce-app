import jwt from "jsonwebtoken";

const authUser = async (req,res,next) => {
    try{
        
        const {token} = req.headers;
        if(!token){
            res.status(401).json({message: "No authentication token, authorization denied"});
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId= tokenDecode.id;
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}
export default authUser;