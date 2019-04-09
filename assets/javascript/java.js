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
    let currentTime = moment();

    busNum = $('#busNum').val().trim();
    busDest = $('#trainDest').val().trim();
    busLeave = $('#initialDep').val().trim();
    busFreq = $('#frequency').val().trim();

    var momentLeave = moment(busLeave, "HH:mm").subtract(1, "years");
    var initialResult = moment().diff(moment(momentLeave), "minutes");
    var freqMod = initialResult % busFreq;
    var busMinsAway = busFreq - freqMod;
    var momentNextBus = moment().add(busMinsAway, "minutes");
    var nextBus = moment(momentNextBus).format(' h:mm a')

    database.ref().push({
        idNumber: busNum,
        destination: busDest,
        initialLeave: busLeave,
        busFrequency: busFreq,
        moreMinutes: busMinsAway,
        theNextBus: nextBus,
    },
        function (errorObject) {
            console.log(errorObject);
        })
});
database.ref().on('child_added', function (childSnap) {
    $("#inputRow").append(" <tr> <th scope='row'>" + childSnap.val().idNumber + "</th> <td scope='col'> " + childSnap.val().destination +
        "</td> <td scope='col'> " + childSnap.val().initialLeave +
        "</td> <td scope='col'> Every " + childSnap.val().busFrequency + " minutes</td>" + "<td>in " + childSnap.val().moreMinutes + " minutes</td><td>at " + childSnap.val().theNextBus + "</td></tr>");

});

