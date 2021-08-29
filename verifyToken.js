const jwt = require("jsonwebtoken")

function verify(req,res, next) {
    const authHeaders = req.headers.token;
    if (authHeaders) {
        const token = authHeaders.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user)=> {
            if(err){
                res.status(403).json("token not valid");
            }
            req.user = user
            next()
        }
        
        )
    }else{
        return res.status(401).json("You are not authnticated")
    }
}
module.exports = verify