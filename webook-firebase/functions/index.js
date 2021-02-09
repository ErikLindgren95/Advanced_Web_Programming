const functions = require("firebase-functions");
const app = require("express")();

const {getPostsBySymbol,getPostsByUserHandle, createPost, deletePost} = require('./handlers/posts'); 
const {signUp, login, changeUserDetails, getUserInformation,getUserInformationByHandle, upploadImage} = require('./handlers/users'); 
const {auth} = require('./middleware/auth');

//Post routes
app.get("/posts/:symbol",auth,getPostsBySymbol); 
app.get("/posts/user/:userHandle",auth,getPostsByUserHandle); 
app.post("/posts",auth, createPost);
app.delete("/post/:postId", auth, deletePost);

//User routes
app.post("/signup",signUp );
app.post("/login",login );
app.get("/user/",auth,getUserInformation)
app.post("/user", auth,changeUserDetails)
app.get("/user/:userHandle", auth, getUserInformationByHandle); 
app.post("/images", auth, upploadImage)



exports.api = functions.region("europe-west3").https.onRequest(app);
