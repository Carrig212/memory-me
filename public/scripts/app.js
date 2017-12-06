(function () {

    var config = {
        apiKey: "AIzaSyCAY1dodrD1TZigdJiAbdNZgBLOnlkuRZs",
        authDomain: "myapp-js-687a0.firebaseapp.com",
        databaseURL: "https://myapp-js-687a0.firebaseio.com",
        projectId: "myapp-js-687a0",
        storageBucket: "myapp-js-687a0.appspot.com",
        messagingSenderId: "925451577532"
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
        const logged = document.getElementById('logged');
        if (firebaseUser) {
            logged.innerHTML = firebaseUser.email;
        } else {
            logged.innerHTML = "Join";
        }
    });
}());
