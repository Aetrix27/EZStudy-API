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
    equation_name = randEquation()
    expect(equationList).to.have.members([res.body.equation_name]);
    done()


  })

});
