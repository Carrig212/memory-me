(function() {

  const config = {
    apiKey: "AIzaSyC1g8NJiXRtNZUeZoVEx6RYKg-KikYsqns",
    authDomain: "memoryme-js.firebaseapp.com",
    databaseURL: "https://memoryme-js.firebaseio.com",
    projectId: "memoryme-js",
    storageBucket: "memoryme-js.appspot.com",
    messagingSenderId: "609070950026"
  };
  firebase.initializeApp(config);

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  //btnLogin click
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //signin
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e=> console.log(e.message));
  });

  //btnSignup click
  btnSignUp.addEventListener('click', e => {
    //TODO: Check given email (then research verify)
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //signin
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e=> console.log(e.message));
  });

  //btnLogout click
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });


  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
    }else{
      console.log('not logged in');
      btnLogout.classList.add('hide');
    }
  });

}());
