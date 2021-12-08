const Anime = require('../model/Anime');
const User = require('../../users/model/User');
const getErrorMessage = require('../../lib/errorHandler/errorHandler');

async function getAllFavoriteAnime(req,res){
    try{
        let foundUser = await User.findOne({ email: req.user.email }).select(
            "-__v"
            );
            console.log(foundUser);
        let allFavoriteAnimes = await Anime.find({user: foundUser._id});

        res.json({message: "Success", payload: allFavoriteAnimes});
    }catch(e){
        res.status(500).json(getErrorMessage(e));
    }
    
};

async function addAnimeToFavorite (req,res){
    const {title, animePoster,animeID}= req.body;

    try {
            let foundUser = await User.findOne({ email: req.user.email }).select(
                "-__v"
                );
            const createdAnime = new Anime({
                title,
                animePoster,
                animeID,
                animeOwner: foundUser._id,
            })

            let savedAnime = await createdAnime.save();

            foundUser.animeHistory.push(savedAnime._id);

            await foundUser.save();

            return res.json({message: "Success", savedAnime});
    }catch(e){
        res.status(500).json(getErrorMessage(e));
    }
}


async function deleteFavoriteAnime(req,res){
    try{
        let deletedAnime = await Anime.findByIdAndRemove(req.params.id);

        if(!deletedAnime){
            return res.status(404).json({message: "Error", error: "Anime not found"});
        }else{
        let foundUser = await User.findOne({ email: req.user.email }).select(
            "-__v"
            );
        let userAnime = foundUser.animeHistory;

        let userAnimesHistory = userAnime.filter(
            (item) => item._id.toString() !== req.params.id
        );

        foundUser.animeHistory = userAnimesHistory;

        await foundUser.save();

        res.json({message: "Deleted", payload: deletedAnime});
        }

    }catch(e){
        res.status(500).json(getErrorMessage(e));
    }
};

module.exports = {
    getAllFavoriteAnime,
    addAnimeToFavorite,
    deleteFavoriteAnime,
};