const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken');
const JwtKey = 'e-com';
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.status(500).send("Something went wrong");
    } else {
      resp.send({ result, auth: token });
    }
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.status(500).send("Something went wrong");
        } else {
          resp.send({ user, auth: token });
        }
      });
    } else {
      resp.status(404).send({ result: "No User Found" });
    }
  } else {
    resp.status(400).send({ result: "Please provide email and password" });
  }
});

app.post("/add-product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", verifyToken, async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.status(404).send({ result: "No Products found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  if (result.deletedCount > 0) {
    resp.send({ result: "Product deleted" });
  } else {
    resp.status(404).send({ result: "Product not found" });
  }
});

app.get("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.status(404).send({ result: "No Record Found." });
  }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } }
    ]
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.header('authorization');
  if (token) {
    token = token.split(' ')[1];
    Jwt.verify(token, JwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: 'Invalid token, please login again' });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: 'Please provide a token' });
  }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// exports.api = functions.https.onRequest(app);