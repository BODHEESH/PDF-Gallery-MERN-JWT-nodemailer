const jwt = require("jsonwebtoken")

const adminLogin = async (req, res) => {
  try {

    const { ADMIN_EMAIL, ADMIN_PWD } = process.env;
    const { email, password } = req.body;
    
    if (email === ADMIN_EMAIL) {

      if (password === ADMIN_PWD) {

        const privateKey = process.env.USER_JWTSECRET_KEY
        console.log(req.body.email);
      
           jwt.sign({ email: req.body.email }, privateKey, function(err, admintoken) {
             if(err){
               console.log(err)
               return res.json({ state: false, msg:"Something went wrong !" })
             }else{
               console.log( "Admin Token created : ",admintoken)
               return res.json({ state: "ok", admintoken })
             }
           });
        res.json({ admin: true, auth: true });
      } else {
        res.json("Incorrect Password");
      }
    } else {
      res.json("Incorrect email id");
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  adminLogin,
};
