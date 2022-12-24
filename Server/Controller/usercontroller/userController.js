const bcrypt = require("bcrypt");
const { regValidation, loginValidation } = require("../../helpers/validation");
const User = require("../../model/userModel");
const userVerification = require("../../model/verification");
const nodemailer=require('nodemailer')
const jwt = require("jsonwebtoken")
const path = require("path")


  /* -------------------------------------------------------------------------- */
   /*                                email config                                */
   /* -------------------------------------------------------------------------- */
   const transporter=nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "elearningbodhi@gmail.com",
      pass: "bxnheviauygqsfke",
    },
  })
  



const register = async (req, res) => {
  try {
  const result = regValidation.validateSync(req.body)
  console.log(result,"1111");
  const isExists = await User.findOne({email:result.email})
  if(isExists){
    throw new Error("User already exists")
  }

  const hash =await bcrypt.hash(result.password,12)

  const user = User({
    name:result.name,
    email:result.email,
    password:hash
  })
  await user.save().then(async(result)=>{
    sendOtp(result,res)
    res.json({
      msg:'register success',
      user:{
         ...user._doc,
         password:''
      }  
    })

  })

 //init session / create jwt

  // res.send({user,message:"Access granted"})


  } catch (error) {
    console.log(error);
    res.status(500).json(error.message)
  }
};



const userLogin = async (req, res) => {
  try {
    console.log(req.body,"--");
    const result = loginValidation.validateSync(req.body)
    const user = await User.findOne({email:result.email})

    if(!user){
        throw new Error("User not found")
    }

    if(user.isBlocked){
      throw new Error ("You are temporarily blocked")
    }

   const privateKey = process.env.USER_JWTSECRET_KEY
   const auth = await bcrypt.compare(result.password,user.password)
    if(!auth){
        throw new Error("Incorrect credentials")
    }else{
 
      jwt.sign({ email: user.email }, privateKey, function(err, token) {
        if(err){
          console.log(err)
          return res.json({ state: false, msg:"Something went wrong !" })
        }else{
          console.log( "Token created : ",token)
          return res.json({ state: "ok", token, user })
        }
      });


    }



    // //login and jwt token generated
    // const login = async (req, res) => {
    //   // console.log(req.body);
    //   const { email, password } = req.body;
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     return res.json({ error: "User not found" })
    //   }
    //   else if (user.status == 'Blocked') {
    //     return res.json({ error: "Access denied temporarily" })
    //   }
    //   else {
    //     const auth = await bcrypt.compare(password, user.password);
    //     // console.log(auth, "klklk");
    //     if (auth) {
    //       console.log("entered");
    //       //token generation
    //       const usertoken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })
    //       // console.log(token);
    //       if (res.status(201)) {
    //         console.log('hai');
    //         return res.json({ state: "ok", userdata: usertoken, user: user })
    //       } else {
    //         console.log('hello');
    //         return res.json({ error: "error" });
    //       }
    //     }
    //     else {
    //       return res.json({ status: "error", error: "Invalid Password" })
    //     }
    //   }
    // }





  
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message)
  }
};



const userDashboard = async (req, res) => {
  try {
    const loggedUser = "ranjith1@gmail.com"
    const user =await User.findOne({email:loggedUser})
    res.send(user.files)
  } catch (error) {
    console.log(error);
  }
};



const userSearch = async (req, res) => {
  try {
    res.send(req.body)
  } catch (error) {
    console.log(error);
  }
};

const uploadPdf = async (req, res) => {
  try {
    
    console.log(req.file)
    console.log(req.body)

    const userId = req.body.userId


   const user = await User.findOne({_id:userId})
   const time = Date.now()

   const pdfFile ={
    time:time,
    fileName:req.file.filename
   }

   console.log(user.files.push(pdfFile))
   await user.save()
   console.log(user.files)

  

  //  res.send(user.files)
  res.status(200).json({message:"successfully uploaded"})


  } catch (error) {
    console.log(error);
  }
};

const download = async (req, res) => {
  try {
    res.send("under development")
    // const fileId = req.params.id
    // const userId = "63a71bfe797727872ebdb139"
    // const user = await User.findOne({_id:userId})

    // console.log(user.files)
    // let obj = user.files.find(o => o._id == fileId);
 
    // const dir = require("../../public/js")
    // // const dir = path.join(__dirname,"JS.pdf")
    // console.log("directory ",dir)
    // // res.download(dir)
 

  } catch (error) {
    console.log(error);
  }
};

const deletePdf = async (req, res) => {
  try {
    console.log(req.params.id)
    res.send(req.body)
  } catch (error) {
    console.log(error);
  }
};
const userPagination = async (req, res) => {
  try {
    res.send(req.body)
  } catch (error) {
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  try {
    res.send(req.body)
  } catch (error) {
    console.log(error);
  }
};




/* -------------------------------------------------------------------------- */
/*                         --------------------------                         */
/* -------------------------------------------------------------------------- */



const sendOtp = async (result, res) => {
  console.log(result, "hey there");
  try {
    const OTP = await Math.floor(100000 + Math.random() * 900000).toString();
    console.log(OTP);
    var senEMail = {
      from: "elearningbodhi@gmail.com",
      to: result.email,
      subject: "Sending Email from PDF Gallery ",
      text: `Hi ${result.name} Your OTP pin has been generated `,
      html: `<h1>Hi ${result.username}</h1><p>Your OTP is ${OTP}</p>`,
    };

    let hashOTP = await bcrypt.hash(OTP, 10);
    let verify = await userVerification.findOne({ userId: result._id });
    if (!verify) {
      const userverification = new userVerification({
        userId: result._id,
        Otp: hashOTP,
        Created: Date.now(),
        Expiry: Date.now() + 100000,
      });
      await userverification.save();
    } else {
      await userVerification.updateOne(
        { userId: result._id },
        { Otp: hashOTP }
      );
    }

    transporter.sendMail(senEMail, function (error, info) {
      console.log("oioioioi");
      if (error) {
        console.log(error, "yuyuuy");
      } else {
        res.json({
          status: "pending",
          msg: "Verification otp mail sent",
          mail: result.email,
          user: result,
        });
      }
    });  
  } catch (error) {
    console.log(error);
  }
};


const verifyOtp = async (req, res) => {
  console.log(req.body.OTP,'verify OTP ----------');
  let OtpVerify = await userVerification.findOne({ userId: req.body.user });
  let correctOtp = await bcrypt.compare(req.body.OTP, OtpVerify.Otp);
  if (correctOtp) {
    await User.updateOne(
      { _id: req.body.user },
      { $set: { verified: "true" } }
    );
    res.status(200).json({ verified: true });
  } else {
    res.status(200).json({ verified: false, msg: "Incorrect OTP" });
  }
};


/* -------------------------------------------------------------------------- */
/*                                 RESEND OTP                                 */
/* -------------------------------------------------------------------------- */


const resendOTP=  async (req, res) => {
  console.log(req.body,'jjjjjjjjjjjjjjjjjjjjjjj');
  sendOtp(req.body, res).then((response) => {
      res.status(200).json(true)
  })

}





module.exports = {
  register,
  userLogin,
  userDashboard,
  userSearch,
  uploadPdf,
  download,
  deletePdf,
  userPagination,
  userLogout,
  verifyOtp,
  sendOtp,
  resendOTP
};
