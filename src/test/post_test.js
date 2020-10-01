const chai = require('chai');
const chaiHttp = require('chai-http');
//const server = require('../controllers/post');
let should = chai.should();
let expect = chai.expect;
var ServerAddr;
//var app = require('../app');
//const app = require('../../app');
//const http = require('http').createServer(app).listen(3000);

chai.use(chaiHttp);
var post;

describe('Post curd operation', () => {
  before(function () {
    ServerAddr = 'http://localhost:5050/';
    post = { title: 'The Book' , description: 'The Book description', user_id: 1 }
  })

  after(function () {
    console.log("post test")
  })

  /* Test the Posts api */
  describe("GET /api/posts", () => {
    it("Display all posts", function (done) {
      chai.request(ServerAddr)
        .get('api/posts')
        .end((err, res) => {
          if (err) {
            console.log("Print error ", err)
            done(err)
          } else {
            //res.body.status.should.equal(200)
            res.body.message.should.equal('Registration Successful')
            done()
          }
        })
    })

    it("Post is already present", function (done) {
      chai.request(ServerAddr)
        .post('/api/posts').send(post)
        .end((err, res) => {
          if (err) {
            console.log("Print error ", err)
            done(err)
          } else {
            res.body.status.should.equal(201)
            res.body.message.should.equal('Post already present')
            done()
          }
        })
    })
  });


});