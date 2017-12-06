(function () {
    const auth = firebase.auth();
    const database = firebase.database();

    //we create temporary quill container that parse Delta object(is a main Quill structure) to HTML
    function quillGetHTML(inputDelta) {
        let tempCont = document.createElement("div");
        (new Quill(tempCont)).setContents(inputDelta);
        return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    }

    auth.onAuthStateChanged(function (firebaseUser) {
        //check if user is logged in
        if (firebaseUser) {
            //get all messages of user whenever it refreshed
            database.ref("diaryEntries/" + auth.currentUser.uid).on("value", (snapshot) => {
                const dates = document.getElementById("dates");
                //remove all previous messages from screen
                while (dates.firstChild) {
                    dates.removeChild(dates.firstChild);
                }
                //create date elements
                snapshot.forEach((node) => {
                    console.log(snapshot.val());
                    let date = $(document.createElement('p'));
                    let blockDate = $(document.createElement('div'));
                    let blockMessages = $(document.createElement("div"));
                    $(blockDate).addClass("date");
                    $(date).html(node.key);
                    $(date).appendTo(blockDate);
                    $(blockDate).appendTo(dates);
                    $(blockMessages).addClass("messages");
                    $(blockMessages).appendTo(blockDate);
                    $(date).click(()=>{
                        $(blockMessages).toggleClass("show");
                    });
                    //create message elements
                    node.forEach((child)=> {
                        let message = quillGetHTML(child.val().message);
                        let time = $(document.createElement('span'));
                        let messageElement = $(document.createElement("div"));
                        let deleteButton = $(document.createElement("button"));
                        $(messageElement).html(message);
                        $(messageElement).addClass("message");
                        $(deleteButton).html("Delete");
                        $(time).html("("+child.val().time+")");
                        $(time).addClass("time");
                        $(deleteButton).click(()=>{
                            database.ref("diaryEntries/" + auth.currentUser.uid + "/" + node.key + "/" + child.key).remove()
                                .catch(e => console.log(e.message));
                            console.log("Entry successfully removed");
                        });
                        $(messageElement).appendTo(blockMessages);
                        $(time).appendTo(messageElement);
                        $(deleteButton).appendTo(messageElement);
                    })
                });

            });
        }
    });

    <!-- Initialize Quill editor -->
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];
    const quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow',
        placeholder: 'Make a new entry...'
    });

    const btnSave = document.getElementById('submitBtn');
    btnSave.addEventListener('click', e => {
        //if user isn't logged - access denied
        if(!auth.currentUser) {
            alert("Please, log in")
        }
        else if(!quill.getContents) {
            console.log();
        }
        else {
        //set formatting for date and time
        const date = new Date();
            let optionsDate = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            let optionsTime = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
        //save message in the database
        const promiseSave = database.ref("diaryEntries/" + auth.currentUser.uid + "/" + date.toLocaleString("en-US", optionsDate)).push({
            message: quill.getContents(),
            time: date.toLocaleString("en-US", optionsTime),
        })
            .catch(e => console.log(e.message));
            //refresh editor
            quill.setContents('');
            console.log('Entry added successfully');
    }});


}());
