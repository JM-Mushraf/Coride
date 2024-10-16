import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
// export const sendToken=(user,statusCode,res)=>{
//     const token=user.getJWT();
//     //option for cookie

//     const options={
//         expires:new Date(
//             Date.now() + 2 * 24 * 60 * 60 * 1000
//         ),
//         httpOnly:true,
//     }
//     res.status(statusCode).cookie('token',token,options).json({
//         success:true,
//         user,
//         token,
//     })
// }



export const sendToken = (userOrAdmin, statusCode, res, isAdmin = false) => {
    console.log("Admin Secret Key:", process.env.ADMIN_SECRET_KEY);
    const secretKey = isAdmin ? process.env.USER_SECRET_KEY : process.env.ADMIN_SECRET_KEY;
    const token = jwt.sign({ id: userOrAdmin._id }, secretKey, {
        expiresIn: "2d", // Token expiration time
    });

    const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        userOrAdmin,
        token,
    });
};
