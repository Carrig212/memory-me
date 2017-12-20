
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
    //I didn't finsh this in time for the submission, I thought i could send push notifications
    //easier with Firebase but i didnt have time to look into it more
    const title = 'Background Message Title';
    const options = {
        body: payload.data.body,
        icon: payload.data.icon
    };

    return self.registration.showNotification(title,
        options);
});