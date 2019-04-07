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
    }, function (errorObject) {
        console.log(errorObject);
    })
});
