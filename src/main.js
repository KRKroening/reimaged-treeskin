
var drawJournalArea = function(){

}


var populateVisitType = function (data) {
    data = JSON.parse(data);
    _.each(data, function(r){
        var objHTML = "<li class='leftTypeNav' href='#'>"+ r.name +"</li>"
        $("#typesContainer").append(objHTML);
    });
};

var populateSubjectList = function (data) {
    data = JSON.parse(data);
    _.each(data, function(r){
        var objHTML = "<li class='leftTypeNav' href='#'>"+ r.name +"</li>"
        $("#subjectContainer").append(objHTML);
    });
};

var load = function () {
    // $('#datePicker').datepicker({
    //     format: 'mm/dd/yyyy',
    //     startDate: '-3d'
    //     });
    if(document.getElementById("typesContainer")){
        getAllVisitTypes();
    }
    if(document.getElementById("subjectList")){
        getAllSubjectsA();
    }
};

$("#subjectContainer li").on('click', function(_this){
    drawJournalArea(_this);
});

load();