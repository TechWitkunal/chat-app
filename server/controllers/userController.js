const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    await User.findByIdAndUpdate(user._id, { isOnline: true });
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getdataEmail = async (req, res, next) => {
  const { name, password, email } = req.params;
  const username = name;
  try {
    const users = await User.findOne({ email }).select(["_id"]);
    // console.log(name, password, email)
    const { _id } = users;
    // console.log(_id)
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { username, password: hashedPassword },
      { new: true } // Return the updated document
    )

    return res.status(200).json({ error: "update successfully" });
  } catch {
    return res.status(404).json({ error: 'User not update' });
  }
  // eslint-disable-next-line no-unreachable
  return { status: false };
}

module.exports.updateInfo = async (req, res, next) => {
  const { userId } = req.params;
  const { username, email } = req.body;
  // console.log("username =>",username," email=>", email)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not update' });
    }

    res.json({ success: true, updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming you're passing userId as a parameter
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: 'Invalid user ID', status: false });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found', status: false });
    }

    // Exclude sensitive information like the password before sending the response
    const { _id, username, email } = user.toObject();
    return res.json({ status: true, user: { _id, username, email } });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      isOnline: true,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setOnline = async(req, res, next) => {
  try {
  const { id, isOnline} = req.params;
  await User.findByIdAndUpdate(id, { isOnline: isOnline });
  }catch(error) {
    return res.status(404).json({ error: "Not update" });
  }
}

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    console.log(users?.friends);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = async(req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    await User.findByIdAndUpdate(req.params.id, { isOnline: false });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
