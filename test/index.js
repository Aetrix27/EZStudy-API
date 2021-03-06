const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("API Tests", function() {
  it("TODO: Should test each endpoint of your API");

  it('should get a random equation', (done) => {
    chai.request(app)
    .get(`/equations`)
    equation_name = getRandomCard()
    expect(equationList).to.have.members([res.body.equation_name]);
    done()

  })

  it('Should create with valid attributes at POST /posts/new', function(done) {
    // Checks how many posts there are now
    Post.estimatedDocumentCount()
      .then(function (initialDocCount) {
          agent
              .post("/posts/new")
      
              .set("content-type", "application/x-www-form-urlencoded")
              // Make a request to create another
              .send(newPost)
              .then(function (res) {
                  Post.estimatedDocumentCount()
                      .then(function (newDocCount) {
                          // Check that the database has one more post in it
                          expect(res).to.have.status(200);
                          // Check that the database has one more post in it
                          expect(newDocCount).to.be.equal(initialDocCount + 1)
                          done();
                      })
                      .catch(function (err) {
                          done(err);
                      });
              })
              .catch(function (err) {
                  done(err);
              });
      })
      .catch(function (err) {
          done(err);
      });
  });

});
