const localstrategy=require('passport-local').Strategy;

const initilize = (passport,getUserbyEmail,getUserbyId) => {
      const authenticateUser = async (email,password,done) =>{
            const user=await getUserbyEmail(email);
            console.log("in passport config");
            console.log(user);
            if(user==null)
            {
                  return done(null,false,{message:"No user with that email"});
            }
            else{
                  if(password==user.password)
                  {
                        return done(null,user);
                  }
                  else
                  {
                        return done(null,false,{message:"password incorrect"});
                  }
            }
      }
      passport.use(new localstrategy({usernameField:'email'},authenticateUser));
      passport.serializeUser((user,done)=>done(null,user.id));
      passport.deserializeUser(async (id,done)=>{
            return done(null,await getUserbyId(id));
      });
}

module.exports=initilize;