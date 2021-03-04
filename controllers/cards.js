const Card = require('../models/card');

const User = require("../models/user");
const jwt = require('jsonwebtoken');

module.exports = (app) => {

  app.get('/', (req, res) => {
    Card.find({}).lean()
      .then(cards => { 
        console.log("HERESRSF")
        console.log(cards)
        res.render('cards-index', { cards });
      })
      .catch(err => {
        console.log(err.message);
      })
  })

  app.get('/randomcard', (req, res) => {
        // Get the count of all users

    Card.count().exec(function (err, count) {

      // Get a random entry
      var random = Math.floor(Math.random() * count)

      // Again query all users but only fetch one offset by our random #
      Card.findOne().skip(random).exec(
        function (err, cards) {
          // Tada! random user
          console.log(cards)
          //res.render('cards-random-index', { cards });
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
    //var currentUser = req.user;
    return res.render("cards-new");
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

  // CREATE
  app.post('/cards/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const card = new Card(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    card.save((err, card) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });
};