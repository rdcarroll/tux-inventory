let userDB;

module.exports = (injectedUserDB) => {
    userDB = injectedUserDB;

    return {
        registerUser: registerUser,
        updateUser: updateUser,
        login: login,
    };
};

function registerUser(req, res) {
    userDB.isValidUser(req.body.UserName, (error, isValidUser) => {
        if (error || isValidUser) {
            const message = error
                ? "Something went wrong!"
                : "This user already exists!";

            sendResponse(res, message, error);

            return;
        }
        
        //new user gets default password
        req.body.Password = "123456";

        userDB.register(req.body.UserName, req.body.Password, (response) => {
            sendResponse(
                res,
                !response.error  ? "Success!!" : "Something went wrong!",
                response.error
            );
        });
    });
}
function updateUser(req, res) {
    userDB.isValidUser(req.body.UserName, (error, isValidUser) => {
        if (error) {
            const message =  "Something went wrong!";

            sendResponse(res, message, error);

            return;
        }

        userDB.register(req.body.UserName, req.body.Password, (response) => {
            sendResponse(
                res,
                !response.error  ? "Success!!" : "Something went wrong!",
                response.error
            );
        });
    });
}

function login(query, res) {}

function sendResponse(res, message, error) {
    res.status(error !== undefined ? 400 : 200).json({
        message: message,
        error: error,
    });
}