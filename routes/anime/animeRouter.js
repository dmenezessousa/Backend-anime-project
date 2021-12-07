const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    getAllFavoriteAnime,
    addAnimeToFavorite,
    deleteFavoriteAnime,
} = require('./controller/Controller');

router.get("/get-all-anime",
    passport.authenticate("jwt-user",{session:false}),
    getAllFavoriteAnime,
);

router.post("/add-anime",
    passport.authenticate("jwt-user",{session:false}),
    addAnimeToFavorite,
);

router.delete("/delete-anime/:id",
    passport.authenticate("jwt-user",{session:false}),
    deleteFavoriteAnime,
);

module.exports = router;