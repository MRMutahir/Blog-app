import {
  onAuthStateChanged,
  getAuth,
  doc,
  getDoc,
  db,
  setDoc
} from "../firebase/firebase.js";
const auth = getAuth();
let blogtittle = document.getElementById("input-text");
let blogstext = document.getElementById("textarea");
console.log(blogtittle, textarea);
let isloggedinuser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
    // id = uid
    getUserdata(uid);
    continueUi(uid)
    // displayUi(id)
    //     userData = uid;
    console.log(uid);

    //       console.log(blogsdata);
  } else {
    // User is signed out
    // ...
  }
});
//
// let useerUid;
// console.log(id,"jhfduihsdi");

// console.log(id,"hdshsdhioij");
async function getUserdata(id) {
  const docRef = doc(db, "userData", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    let { email, image, lastname, name, password } = docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

async function blogPost() {
  let title = blogtittle.value;
  let text = blogstext.value;
 
  onAuthStateChanged(auth,async (user) => {
    if (user) {
      let blogsdata = {
        BlogTitle: title,
        Blogtext: text,
      };
      const uid = user.uid;
      const docRef = doc(db, "userData", uid);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let { email, image, lastname, name, password } = docSnap.data()
        displayUi(title, text, email, image, lastname, name,uid)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      await setDoc(doc(db, "postcontent", uid), {
        Title: title, TextContent: text, Email: email, Image: image, lastname: lastname, Name: name
      })
      
    } else {
      
    }
  });


}
async function displayUi(title, text, email, image, lastname, name,id) {
  onAuthStateChanged(auth,async (user) => {
    if (user) {
     
      const uid = user.uid;
      await setDoc(doc(db, "postcontent", uid), {
        Title: title, TextContent: text, Email: email, Image: image, lastname: lastname, Name: name
      })
      
    } else {
      
    }
  });
 
  let uiset = ` <div class="outer-div">
<div class="inner-div">
  <!-- Section -->
  <div class="section">
    <!-- Image -->
    <div class="image">
      <img src="${image}" height="100px" width="100px" alt="" />
    </div>
    <!-- Blog Title -->
    <div class="blog-title">${title} <br><b class="names">${name}-${new Date().toLocaleString()}</b>
    <br>
    <span>06-11-2023</span>
  </div>
    <!-- User Name -->
    <!-- <div class="user-name"></div> -->
  </div>
  <div class="para">
 ${text}
  </div>
  <!-- Button container -->
  <div class="button-container">
    <!-- Delete button -->
    <div class="button">Delete</div>
    <!-- Edit button -->
    <div class="button">Edit</div>
  </div>
</div>
</div>
`
  let uidiv = document.querySelector('.uiset')
  let div = document.createElement('div');
  div.innerHTML = uiset;
  uidiv.appendChild(div)
}
async function continueUi(id) {
  // console.log("kfdjhkjeh");
  const docRef = doc(db, "postcontent",id);
  const docSnap = await getDoc(docRef);


    console.log("Document data:", docSnap.data());
    docSnap.data()
  let { Title,
    TextContent,
    Email,
    Image,
    lastname,
    Name} = docSnap.data()
  let uiset = ` <div class="outer-div">
<div class="inner-div">
  <!-- Section -->
  <div class="section">
    <!-- Image -->
    <div class="image">
      <img src="${Image}" height="100px" width="100px" alt="" />
    </div>
    <!-- Blog Title -->
    <div class="blog-title"><b>${Title}</b> <br><i class="names">${Name} - ${new Date().toLocaleDateString()}</i>
    <br>
   
  </div>
    <!-- User Name -->
    <!-- <div class="user-name"></div> -->
  </div>
  <div class="para">
 ${TextContent}
  </div>
  <!-- Button container -->
  <div class="button-container">
    <!-- Delete button -->
    <div class="button">Delete</div>
    <!-- Edit button -->
    <div class="button">Edit</div>
  </div>
</div>
</div>
`
  let uidiv = document.querySelector('.uiset')
  let div = document.createElement('div');
  div.innerHTML = uiset;
  uidiv.appendChild(div)
 

    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
 

continueUi()

// console.log(blogsdata);
window.blogPost = blogPost;
