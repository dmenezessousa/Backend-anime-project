const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    getAllFavoriteManga,
    addMangaToFavorite,
    deleteFavoriteManga,
} = require('./controller/mangaController');

router.get("/get-all-manga",
    passport.authenticate("jwt-user",{session:false}),
    getAllFavoriteManga,
);

router.post("/add-manga",
    passport.authenticate("jwt-user",{session:false}),
    addMangaToFavorite,
);

router.delete("/delete-manga/:id",
    passport.authenticate("jwt-user",{session:false}),
    deleteFavoriteManga,
);


module.exports = router;