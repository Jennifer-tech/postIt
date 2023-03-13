const jwt = require('jsonwebtoken');

exports.authentication = async (req, res, next) => {
    try {
        //to get the token from the client side and setting it in the first position in the array
        const token = req.headers.authorization.split(" ")[1];
        //checking if the token is from our database or googleAuth
        const isCustomAuth = token.length < 500;   

        //storing the data we will get from the token itself in decodedData
        let decodedData;

        if(token && isCustomAuth){
            // this gives data from each specific token(i.e the username and id)
            // test is the secret key
            decodedData = jwt.verify(token, "test");

            // storing the ID of the user accessing the database(eg user liking the post)
            req.userId = decodedData?.id;
        }else {
            // this occurs if we are using token from googleAuth
            decodedData = jwt.decode(token);

            // sub is google's name for specific id that differentiates every single google user
            req.userId = decodedData?.sub;
        }
        //passing the action unto the second thing
        next();

    }catch(error){
        res.status(500).json({ message: "You are not logged in"})
    }
}