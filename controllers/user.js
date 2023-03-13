const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User does not exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "3d" });
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, userName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" });
        if( password !== confirmPassword ) return res.status(400).json({ message: "Passwords does not match"});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, fullName: `${firstName} ${lastName}`, userName})

        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });
        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
    
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "An error occured" })
    }
}
exports.getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// exports.createUser = async (req, res) => {
//     const { userId } = req.params;
//     const { fullName, userName, email, password, gender } = req.body;

//     try {
//         const newUser = new User({ fullName, userName, email, password, gender, userId });
//         await newUser.save();

//         res.status(201).json(newComment)
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }
exports.updateUser = async (req, res) => {
    const { userId: _id } = req.params;
    const user = req.body;
    try{

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No User with that id");

    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });
    res.json(updatedUser)
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    // get user id from the authentication middleware
    const userId = req.userId;

    try {
        //get user with id from user model
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User with id does not exist" });

        // check if post creator is the same as the user id from authentication
        console.log(post.user)
        if (user.id === userId) {
            await User.findByIdAndDelete(id);
        } else {
            return res.status(401).json({ message: "You cannot delete this user because you're not the creator" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
