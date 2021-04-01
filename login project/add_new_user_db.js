const Student=require('./mongo').Student;

const new_user=async (req, res, next) => {
      try {
            const new_student = await Student.create({
                  email: req.body.email,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  password: req.body.password
            });
      }
      catch {
            console.log("lol");
      }
      next();
}

module.exports=new_user;