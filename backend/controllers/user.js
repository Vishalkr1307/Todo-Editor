const User = require("..//models/user");
// const User = require("..//models/user");
const bcrypt = require("bcrypt");

const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await new User(name, email, password);
    await user.save();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send("bad request");
  }
};
const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("user not found");
    }
    const checkPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!checkPassword) {
      return res.status(200).send("password does not match");
    }

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send("bad request");
  }
};

const getUser=async (req, res) => {
    try{
        const user=await User.findAll()

        return res.status(200).send(user)

    }
    catch (err) {
        return res.status(500).send("bad request");
    }
}
const getSingleUser=async (req, res) => {
    try{
        const user=await User.findById(req.params.id)

        return res.status(200).send(user)

    }
    catch (err) {
        return res.status(500).send("bad request");
    }
}

module.exports = { Register, Login,getUser,getSingleUser };
