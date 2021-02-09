const { db } = require("../utils/admin");

exports.getPostsBySymbol = (req, res) => {
  db.collection("posts")
    .where("symbol", "==", req.params.symbol)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          userHandle: doc.data().userHandle,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          symbol: doc.data().symbol
        });
      });
      return res.json(posts);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.getPostsByUserHandle = (req, res) => {
  db.collection("posts")
    .where("userHandle", "==", req.params.userHandle)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          userHandle: doc.data().userHandle,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          symbol: doc.data().symbol
        });
      });
      return res.json(posts);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.createPost = (req, res) => {
  const newPost = {
    userHandle: req.user.handle,
    body: req.body.body,
    symbol: req.body.symbol,
    createdAt: new Date().toISOString(),
  };
  db.collection("posts")
    .add(newPost)
    .then((doc) => {
      newPost.postId = doc.id;
      res.json(newPost);
    })
    .catch((error) => {
      res.status(500).json({ error: "Document not created" });
      console.error(error);
    });
};

exports.deletePost = (req, res) => {
  const document = db.doc(`/posts/${req.params.postId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Post deleted" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.code });
    });
};
