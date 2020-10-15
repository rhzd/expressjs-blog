var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", function (req, res, next) {
  axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then((response) => {
      let comments = response.data;

      let filteredData = comments.filter((el) => {
        return (
          el.postId.toString().toLowerCase().includes(req.query.postId ? req.query.postId.toString().toLowerCase() : '') &&
          el.email.toString().toLowerCase().includes(req.query.email ? req.query.email.toString().toLowerCase() : '') &&
          el.name.toString().toLowerCase().includes(req.query.name ? req.query.name.toString().toLowerCase() : '') &&
          el.body.toString().toLowerCase().includes(req.query.body ? req.query.body.toString().toLowerCase() : '') &&
          el.id.toString().toLowerCase().includes(req.query.id ? req.query.id.toString().toLowerCase() : '') 
        );
      });
      res.json(filteredData);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
