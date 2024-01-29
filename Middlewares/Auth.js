import {ValidateSign} from "../utils/common.js"

//auth
export const isAuthenticated=async (req,res,next)=>{
    try {
        const token= req.cookies.token || req.body.token || req.get("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing"
            })
        }
        try {
            const decode=await ValidateSign(token,process.env.JWT_SECRET);
            req.user=decode;
        
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message :"something went wrong"
        })
    }
}
//isStudent
// exports.isStudent=async (req,res,next)=>{
//     try {
//         if(req.user.accountType!=="Student"){
//             return res.status(401).json({
//                 success:false,
//                 message:"Permisson Denied"
//             })
//         }
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"User role Cannot be verified"
//         })
//     }
// }
// //isInstructor
// exports.isInstructor=async (req,res,next)=>{
//     try {
//         if(req.user.accountType!=="Instructor"){
//             return res.status(401).json({
//                 success:false,
//                 message:"Permisson Denied"
//             })
//         }
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"User role Cannot be verified"
//         })
//     }
// }
// //isAdmin
// exports.isAdmin=async (req,res,next)=>{
//     try {
//         if(req.user.accountType!=="Admin"){
//             return res.status(401).json({
//                 success:false,
//                 message:"Permisson Denied"
//             })
//         }
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"User role Cannot be verified"
//         })
//     }
// }