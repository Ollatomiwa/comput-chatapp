import jwt from "jsonwebtoken"

export const generateToken = (userId, res)=>{
    //generating a token
    const token = jwt.sign((userId), process.env.JWT_SECRET, {
    expiresIn:"7d"
})

res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS, AFTER SEVEN DAYS IT IS GOING TO EXPIRE AND USERS WILL HAVE TO SIGN IN AGAIN
    httpsOnly: true, // prevent XSS attacks: criss-site scripting attacks
    sameSite: "strict", //CSFR attacks: cross site request forgery attacks
    secure: process.env.NODE_ENV!= "development" // this is going to be true if we are in production
})

return token;
}