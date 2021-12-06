const express = require("express");
const router = express.Router();


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
    checkIsEmpty,
    checkIsUndefined,
    validateUpdateData,
    updateUser,
);

router.delete("/update-profile",

);
module.exports = router;