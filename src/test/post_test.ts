import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { Post } from '../models/post';
import { EXISTING_POST } from './constants';
import app from '../app';
let should = chai.should();
chai.use(chaiHttp);
let expect = chai.expect;

describe("Post Curd operations", function () {
  const requester = chai.request(app).keepOpen();
  let dummyPost: Post;
  before(async () => {
    dummyPost = await Post.create(EXISTING_POST);
    console.log(dummyPost)
  });

  after(async () => {
    if (requester) await requester.close();
    await Post.destroy({
      where: {
          id: dummyPost.id
      }
    });
  });

  describe("#GET /api/posts", function () {
    it("Find all posts", function (done) {
      requester.post("/api/posts")
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(200);
          res.body.title.should.equal(EXISTING_POST.title);
          done();
        });
    });
  });

  describe("#GET /api/posts", function () {
    it("Find Single post", function (done) {
      requester.post("/api/posts/:id")
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(200);
          res.body.title.should.equal(EXISTING_POST.title);
          done();
        });
    });
  });
});