const Card = require('../models/card');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

function getRandomCard(){
  Card.count().exec(function (err, count) {

    var random = Math.floor(Math.random() * count)

    Card.findOne().skip(random).exec(
      function (err, cards) {
        console.log(cards)
        Card.findById(cards.id).lean()
        .then(card => {
          res.render("cards-random-index", { card });
        })
        .catch(err => {
          console.log(err.message);
        });
      })
     
  })
}
module.exports = (app) => {

  app.get('/', (req, res) => {
    var currentUser = req.user;

    Card.find({}).lean()
      .then(cards => { 
        console.log(cards)
        res.render('cards-index', { cards, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      })
  })

  app.get('/randomcard', (req, res) => {
    Card.count().exec(function (err, count) {

      var random = Math.floor(Math.random() * count)

      Card.findOne().skip(random).exec(
        function (err, cards) {
          console.log(cards)
          Card.findById(cards.id).lean()
          .then(card => {
            res.render("cards-random-index", { card });
          })
          .catch(err => {
            console.log(err.message);
          });
        })
       
    })

  })

  app.get("/cards/new", function(req,res){
    var currentUser = req.user;
    return res.render("cards-new", { currentUser });
  })

  app.get("/cards/:id", function(req, res) {
    // LOOK UP THE POST
    Card.findById(req.params.id).lean()
      .then(card => {
        res.render("cards-show", { card });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.post('/edit/:id', (req, res) => {
    Card.findByIdAndUpdate(req.params.id, req.body).then(() => {
        return Card.findOne({_id: req.params.id})
    }).then((card) => {
        res.redirect(`/`);
        return res.json({card})
    }).catch((err) => {
        throw err.message
    })
  })

  app.post('/delete/:id', (req, res) => {
    Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (card === null) {
        return res.json({message: 'User does not exist.'})
      }
      console.log(card)
      res.redirect(`/`);

      return res.json({
        'message': 'Successfully deleted.',
        '_id': req.params.id
      })
    })
    .catch((err) => {
      console.log(err.message);
    })
  })

 // CREATE
  app.post("/cards/new", (req, res) => { 
    var card = new Card(req.body);
    card.author = req.user._id;

    if (req.user) { var card = new Card(req.body); 
      card.author = req.user._id;

      card
      .save()
      .then(card => {
          return User.findById(req.user._id);
      })
      .then(user => {
          user.cards.unshift(card);
          user.save();
          res.redirect(`/`);
      })
      .catch(err => {
          console.log(err.message);
      });
      } else {
        return res.status(401); 
      }
});

};