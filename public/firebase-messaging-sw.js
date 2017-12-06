// DON'T RENAME THIS FILE
// DON'T MOVE THIS FILE
importScripts("https://www.gstatic.com/firebasejs/4.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.6.2/firebase-messaging.js");

var config = {
    apiKey: "AIzaSyCAY1dodrD1TZigdJiAbdNZgBLOnlkuRZs",
    authDomain: "myapp-js-687a0.firebaseapp.com",
    databaseURL: "https://myapp-js-687a0.firebaseio.com",
    projectId: "myapp-js-687a0",
    storageBucket: "myapp-js-687a0.appspot.com",
    messagingSenderId: "925451577532"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    //there you can set up how notification will appear
    const title = 'Background Message Title';
    const options = {
        body: payload.data.body,
        icon: payload.data.icon
    };

    return self.registration.showNotification(title,
        options);
});