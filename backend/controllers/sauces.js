
const fs = require('fs');
const Sauce = require('../models/sauces');

exports.addSauce = (req, res, next) => {

    req.body.sauce = JSON.parse(req.body.sauce);
    console.log(req.body.sauce)
    const url = req.protocol + '://' + req.get('host');
   const sauce = new Sauce({
      
    
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      manufacturer: req.body.sauce.manufacturer,
      mainPepper: req.body.sauce.mainPepper,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
  });
    sauce.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
  
};

exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      req.body.sauce = JSON.parse(req.body.sauce);
      sauce = {
        _id: req.params.id,
        userId: req.body.userId,
        name: req.body.sauce.name,
        description: req.body.sauce.description,
        imageUrl: url + '/images/' + req.file.filename,
        manufacturer: req.body.sauce.manufacturer,
        mainPepper: req.body.sauce.mainPepper,
        heat: req.body.sauce.heat,
      

      };
    } else {
      sauce = {
        _id: req.params.id,
        userId: req.body.userId,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        manufacturer: req.body.manufacturer,
        mainPepper: req.body.mainPepper,
        heat: req.body.heat,

        
      };
    }
    Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: ' updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
      (sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
          Sauce.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        });
      }
    );
  };

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.likeSauces = (req, res, next) => {
  //  likes the sauce
   Sauce.findOne({_id: req.params.id}).then((sauce) => {
         if (req.body.like == 1) {
         sauce.usersLiked.push(req.body.userId)
         sauce.likes += req.body.like
         
         }
    
//  is canceling their like or dislike
         else if (req.body.like == 0) {
           if (sauce.usersLiked.includes(req.body.userId)) {
              sauce.usersLiked = sauce.usersLiked.filter(like => like != req.body.userId);
         sauce.likes -= 1
         //console.log(sauce.usersLiked)
         
           }
           if (sauce.usersDisliked.includes(req.body.userId)) {
             sauce.usersDisliked = sauce.usersDisliked.filter(dislikes => dislikes != req.body.userId);
             sauce.dislikes -= 1
         
          }
         }
     
       //dislikes the sauce    
         else if (req.body.like == -1) {
         sauce.usersDisliked.push(req.body.userId)
         sauce.dislikes += 1
         
         }
   
         sauce.save().then(
          () => {
            res.status(201).json({
              message: 'Post saved successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          });

        })
      }
      
        

/*exports.likeSauce = (req, res, next) => { 
  sauce.findOne({_id: req.params.id}).then(
    (sauce)=> {
      if(!sauce.likes.includes(req.body.))
    }
  )
}
///
exports.likeSauces = (req, res, next) => {
   //  likes the sauce
    sauces.findOne({_id: req.params.id}).then((sauce) => {
          if (req.body.like == 1) {
          sauce.usersLiked.push(req.body.userId)
          sauce.likes += req.body.like
          }
     
//  is canceling their like or dislike
          else if (req.body.like == 0) {
            if (sauce.usersLiked.includes(req.body.userId)) {
               sauce.usersLiked = sauce.usersLiked.filter(like => like != req.body.userId);
          sauce.likes -= 1
            }
            if (sauce.usersDisliked.includes(req.body.userId)) {
              sauce.usersDisliked = sauce.usersDisliked.filter(dislikes => dislikes != req.body.userId);
              sauce.dislikes -= 1
           }
          }
      
        //dislikes the sauce    
          else if (req.body.like == -1) {
          sauce.usersDisliked.push(req.body.userId)
          sauce.dislikes += 1
          }
    
        sauce.save().then(
          () => {
              res.status(201).json})


                /////


                exports.likeDislikeSauce = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id
          // Sauce liked
  switch (like) {
    case 1 :
        Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
          .then(() => res.status(200).json({ message: `liked` }))
          .catch((error) => res.status(400).json({ error }))
      break;
          // Neutral
    case 0 :
        Sauce.findOne({ _id: sauceId })
           .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                .then(() => res.status(200).json({ message: `neutral` }))
                .catch((error) => res.status(400).json({ error }))
            }
            if (sauce.usersDisliked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})




*/