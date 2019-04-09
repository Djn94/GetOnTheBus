console.log('aye')
var busNum;
var busDest;
var initialLeave;
var trainFrequency;
var config = {
    apiKey: "AIzaSyAgCT-vlZgqogA2vjv7qGjnE8agod2FDTY",
    authDomain: "nuclassproj.firebaseapp.com",
    databaseURL: "https://nuclassproj.firebaseio.com",
    projectId: "nuclassproj",
    storageBucket: "nuclassproj.appspot.com",
    messagingSenderId: "180178704154"
};
firebase.initializeApp(config);
var database = firebase.database();
console.log(database);
$('#add-bus').on('click', function (event) {

    event.preventDefault();
    busNum = $('#busNum').val().trim();
    busDest = $('#trainDest').val().trim();
    busLeave = $('#initialDep').val().trim();
    busFreq = $('#frequency').val().trim();
    database.ref().push({
        idNumber: busNum,
        destination: busDest,
        initialLeave: busLeave,
        trainFrequency: busFreq,
    },
        function (errorObject) {
            console.log(errorObject);
        })
});
database.ref().on('child_added', function (childSnap) {
    console.log(childSnap.val().idNumber);
    console.log(childSnap.val().destination);
    console.log(childSnap.val().initialLeave);
    console.log(childSnap.val().trainFrequency);
    $("#inputRow").append(" <tr> <th scope='row'>" + childSnap.val().idNumber + "</th> <td scope='col'> " + childSnap.val().destination +
        "</td> <td scope='col'> " + childSnap.val().initialLeave +
        "</td> <td scope='col'> " + childSnap.val().trainFrequency + "</td>" + "<td>'this is where the cal will go'</td></tr>");

});


//initial time minus current time equals initres
//initres mod frequency equals freqMod
//frequency minus freqMod = how many minutes away minsAway
//howmany mins away+current time==next arrival

initialLeave - currentTime = initialResult
initialResult % trainFrequency = freqMod
trainFrequency - freqMod = minsAway
minsAway + currentTime=nextArrival