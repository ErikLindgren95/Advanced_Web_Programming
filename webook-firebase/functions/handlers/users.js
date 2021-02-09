const { db, admin } = require("../utils/admin");

const config = require("../utils/firebaseAdmin");
const firebase = require("firebase");

const {} = require("@firebase/storage");
const functions = require("firebase-functions");
const formidable = require("formidable");
const { uuid } = require("uuidv4");
const { firebaseConfig } = require("firebase-functions");

firebase.initializeApp(config);
const storage = firebase.storage();

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };
  let userToken, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ message: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((token) => {
      userToken = token;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ userToken });
    })
    .catch((error) => {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        return res.status(400).json({ error: "Email is already in use" });
      } else {
        return res.status(500).json({ error: "Wrong usernamer or password" });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};

const checkUserDetails = (data) => {
  let userDetails = {};
  //#TASK: Check if empty
  userDetails.aboutMe = data.aboutMe;
  return userDetails;
};

exports.changeUserDetails = (req, res) => {
  let userDetails = checkUserDetails(req.body);

  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details changed successfully" });
    })
    .catch((err) => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};

exports.getUserInformation = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
      }
      res.json(userData);
    })
    .catch((err) => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};
exports.getUserInformationByHandle = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.params.userHandle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
      }
      res.json(userData);
    })
    .catch((err) => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};

exports.upploadImage = (req, res) => {
  //This code is taken from google clouds documentation, see reference:
  //https://cloud.google.com/functions/docs/writing/http#storage-example

  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const Busboy = require("busboy");

  const busboy = new Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();
  const imgToken = uuid()
  // This object will accumulate all the fields, keyed by their name
  const fields = {};

  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads = {};

  busboy.on("field", (fieldname, val) => {
    // TODO(developer): Process submitted field values here
    console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });

  const fileWrites = [];
  
  // This code will process each file uploaded.
  busboy.on("file", (fieldname, file, filename) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    filename = `${`${req.user.handle}.png`}`
    console.log(`Processed file ${filename}`);
    const filepath = path.join(tmpdir, filename);
    uploads[fieldname] = filepath;

    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);
    // File was processed by Busboy; wait for it to be written.
    // Note: GCF may not persist saved files across invocations.
    // Persistent files must be kept in other locations
    // (such as Cloud Storage buckets).
    const promise = new Promise((resolve, reject) => {
      file.on("end", () => {
        writeStream.end();
      });
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
    fileWrites.push(promise);
  });
  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on('finish', async () => {
    await Promise.all(fileWrites);
    // TODO(developer): Process saved files here
    for (const file in uploads) {
      admin.storage().bucket().upload(uploads[file],{
        resumable: false,
        metadata: {
          metadata: {
            contentType: "png",
            firebaseStorageDownloadTokens: imgToken,
          },
        },
      }).then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${filename}?alt=media&token=${imgToken}`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })

    }
    res.send();
  });
  busboy.end(req.rawBody);
};
