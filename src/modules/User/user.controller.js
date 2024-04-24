
// import { order} from "../../../Databases/Models/user.model.js"
import  Jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { UserModel } from "../../../databases/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"

import { sendEmailPcode } from "../../../services/emails/sentEmailPinCode.js"
import { AppError } from "../../utils/AppError.js"






//signUp
const signUp=catchError(async(req,res,next)=>{
    let user= await UserModel.create(req.body)
   await user.hashPass()
   await user.save()
   let token=Jwt.sign({userId:user._id,role:user.role},"FUCK_YOU");
    res.status(201).json({ message: "success" ,token});
})


//signIn
const signIn = catchError(async (req, res, next) => {
  const { emailOrMobile,password } = req.body;
  let user = await UserModel.findOne({
    $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }],
  });
  if (user && bcrypt.compareSync(password, user.password)) {
    await UserModel.findByIdAndUpdate(user._id, { status: "online" });
    let token = Jwt.sign(
      { userId: user._id, role: user.role },
      "FUCK_YOU"
    );
    return res.status(201).json({ message: "success", token });
  }
  
return next(new AppError("email or password incorrect", 401));
})

//get all users by the admin
const getAllUsers=catchError(async(req,res,next)=>{
    let users= await UserModel.find({})
    !users&& res.status(404).json({message:"No User Found!"});
    res.json({message:"Success",users})})

//get profile data of useruser by the admin
const getProfileData = catchError(async (req, res, next) => {
    let user = await UserModel.findById(req.params.id);
    !user && next(new AppError("not user found", 404));
    user && res.json({ message: "success", user });
  });

//update user data
const updateUser=catchError(async(req,res,next)=>{
    let User= await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !User &&  res.status(404).json( {message:'User not found!'})
    res.json({message:"Success",User})
})
//update user password
const UpdatePassword = catchError(async (req, res, next) => {
  let user = await UserModel.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.currentPassword, user.password)) {
    let token = Jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_Secret
    );
    const hashPass = await bcrypt.hash(req.body.newPassword, 8);
    await UserModel.findByIdAndUpdate(req.user._id, {
      password: hashPass,
      passwordChangedAt: Date.now(),
    });
    return res.json({ msg: "success", token });
  }
  next(new AppError("password incorrect", 401));
});
//delete user account by the admin
const deleteUser=catchError(async(req,res,next)=>{
    let user= await UserModel.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).json( {message:'User not found!'})
    res.json({message:"Success",user})
})
//get all orders for specific user
const getAllUserOrders=catchError(async(req,res,next)=>{
    let userId=req.params.id
    let user=await UserModel.findById(userId)
    if( !userId){
        res.status(404).json( {message:'User not found!'})
    }else{
        let orders= await Order.find({})
        !orders&& res.status(404).json({message:"No Order Found!"});
        res.json({message:"Success",orders})
    } 
})


  //forget password
  const forgetPassword = catchError(async (req, res, next) => {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(new AppError("not user found"));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await sendEmailPcode(user.email,otp);
    await user.save();
    res.status(200).json({ message: "success", otp });
  });
  //Reset password using otp
  const resetPassword = catchError(async (req, res, next) => {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(new AppError("not user found"));
    if (user.otp !== req.body.otp || new Date() > user.otpExpiry)
      return next(new AppError("Invalid or expired OTP", 401));
    user.password = req.body.newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    await user.hashPass();
    res.status(200).json({ message: "Password reset successfuly" });
  });
  // logout
const logout = catchError(async (req, res, next) => {
    await UserModel.findByIdAndUpdate(req.user._id, {
      logoutAt: Date.now(),
      status: "offline",
    });
    res.status(200).json({ message: "you logOut successfuly" });
  });
 

export{
    signUp,
    signIn,
    getAllUsers,
    getProfileData,
    updateUser,
    deleteUser,
    UpdatePassword,
    logout,
    forgetPassword,
    resetPassword,
    getAllUserOrders

    
}




const signin = catchError(async (req, res,next) => {
  let user = await usermodel.findOne({ email: req.body.email })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
      let token = jwt.sign({ userId : user._id , email : user.email }, process.env.JWT_KEY)
      return res.json({ message: "success", token })
  }
  return next(new AppError('incorrect password or email',401))
})

