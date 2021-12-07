const {checkIsEmpty} = require('./common/checkIsEmpty');
const {checkIsUndefined} = require('./common/checkIsUndefined');
const {validateCreateData} = require('./auth/validateCreateData');
const {validateLoginData} = require('./auth/validateLoginData');
const {validateUpdateData} = require('./auth/validateUpdateData');
const {userJWTStrategy} = require('./passport/userPassport');
const {errorHandler} = require('./errorHandler/errorHandler');
const {checkJwt}=require('./common/checkJwt');

module.exports = {
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    validateLoginData,
    validateUpdateData,
    userJWTStrategy,
    errorHandler,
    checkJwt
};