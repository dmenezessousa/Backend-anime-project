const express = require('express');
const router = express.Router();

const {
    getAllFavoriteManga,
    addMangaToFavorite,
    deleteFavoriteManga,
} = require('./controller/Controller');


router.get("/get-all-manga",
    // passport.authenticate("jwt-user",{session:false}),
    getAllFavoriteManga,
);

router.post("/add-manga",
// passport.authenticate("jwt-user",{session:false}),
    addMangaToFavorite,
);

router.delete("/delete-manga/:id",
    // passport.authenticate("jwt-user",{session:false}),
    deleteFavoriteManga,
);


module.exports = router;