var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", function (req, res, next) {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/comments"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ])
    .then((responseArr) => {
      let posts = responseArr[1].data;
      let comments = responseArr[0].data;

      let result = posts.map((post) => {
        post.commentList = comments.filter((comment) => {
          return comment.postId == post.id;
        });
        return {
          post_id: post.id,
          post_title: post.title,
          post_body: post.body,
          total_number_of_comments: post.commentList.length,
        };
      });

      result.sort((a, b) => a.total_number_of_comments - b.total_number_of_comments); // Sort by total_number_of_comments
      result.reverse(); // Descending order

      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
