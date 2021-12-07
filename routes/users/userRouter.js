const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
    userSignUp,
    userLogin,
    updateUser
} = require('./controller/Controller');


const {
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    validateLoginData,
    validateUpdateData,
} = require('../lib');


router.post("/create-user",
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    userSignUp,
);

router.post("/login",
    checkIsEmpty,
    checkIsUndefined,
    validateLoginData,
    userLogin,
);

router.put("/update-profile",
    passport.authenticate("jwt-user",{session:false}),
    checkIsEmpty,
    checkIsUndefined,
    validateUpdateData,
    updateUser,
);

module.exports = router;