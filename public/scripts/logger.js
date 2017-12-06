(function () {

    const database = firebase.database();

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    const btnPasswordReset = document.getElementById('btnPasswordReset');
    const divLogin = document.getElementById('login');

    //btnLogin click
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //signin

            const promise = auth.signInWithEmailAndPassword(email, pass)
                .then(() => {
                    //if user didn't verify email, he will log out every time
                    if(!auth.currentUser.emailVerified){
                        console.log("Please, verify your email");
                        firebase.auth().signOut();
                    }
                    console.log(auth.currentUser);
                })
                .catch(e => console.log(e.message));
    });

    //btnSignup click
    btnSignUp.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //signin
        const promiseAuth = auth.createUserWithEmailAndPassword(email, pass)
            .then(() => {
                //after creating user we need to save it in the database
                const promiseSave = database.ref("users/" + auth.currentUser.uid).set({
                    //you can add other user fields if they will appear(except password, it's inappropriate)
                    email: email,
                })
                    .catch(e => console.log(e.message));
                auth.onAuthStateChanged(user => {
                    //if user is logged in, send email verification
                    user.sendEmailVerification()
                        .then(()=> {
                                console.log("Email verification was sent");
                                firebase.auth().signOut();
                            }
                        )
                        .catch(e => console.log(e.message));
                });
                console.log(auth.currentUser);
            })
            .catch(e => console.log(e.message));
    });

    //btnLogout click
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    //btnPasswordReset click
    btnPasswordReset.addEventListener('click', e=> {
        //user has to type email and then click a "forgot password" link
       if(!txtEmail.value) console.log("Email is required");
       else {
           const email = txtEmail.value;
           const auth = firebase.auth();
           auth.sendPasswordResetEmail(email)
               .then(()=> {
                console.log("Link with password resetting was sent to your email")
               }
           )
               .catch(e => console.log(e.message));
       }
    });
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            console.log(firebaseUser);
            divLogin.classList.add('hide');
            btnLogout.classList.remove('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
            divLogin.classList.remove('hide');
        }
    });

}());
