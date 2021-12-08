const Manga = require('../model/Manga');
const User = require('../../users/model/User');
const getErrorMessage = require('../../lib/errorHandler/errorHandler');

async function getAllFavoriteManga(req,res){
    try{
        let foundUser = await User.findOne({ email: req.user.email }).select(
            "-__v"
            );

        let allFavoriteMangas = await Manga.find({user: foundUser._id});

        res.json({message: "Success", payload: allFavoriteMangas});
    }catch(e){
        res.status(500).json(getErrorMessage(e));
    }
    
};

async function addMangaToFavorite (req,res){
    const {title, mangaPoster,mangaID}= req.body;

    try {
            let foundUser = await User.findOne({ email: req.user.email }).select(
                "-__v"
                );
            const createdManga = new Manga({
                title,
                mangaPoster,
                mangaID,
                mangaOwner: foundUser._id,
            })

            let savedManga = await createdManga.save();

            foundUser.mangaHistory.push(savedManga._id);

            await foundUser.save();

            return res.json({message: "Success", savedManga});
    }catch(e){
        res.status(500).json(getErrorMessage(e));
    }
}


async function deleteFavoriteManga(req,res){
    try{
        let deletedManga = await Manga.findByIdAndRemove(req.params.id);

        if(!deletedManga){
            return res.status(404).json({message: "Error", error: "Manga not found"});
        }else{
        let foundUser = await User.findOne({ email: req.user.email }).select(
            "-__v"
            );
        let userManga = foundUser.mangaHistory;

        let userMangasHistory = userManga.filter(
            (item) => item._id.toString() !== req.params.id
        );

        foundUser.mangaHistory = userMangasHistory;

        await foundUser.save();

        res.json({message: "Deleted", payload: deletedManga});
        }

    }catch(e){
        res.status(500).json(getErrorMessage(e));
    }
};

module.exports = {
    getAllFavoriteManga,
    addMangaToFavorite,
    deleteFavoriteManga,
};