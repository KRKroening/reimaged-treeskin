
var revealNew = function(_this){
    $("#searchEntryContainer").hide();
    $("#newEntryContainer").show();
}

var revealSearch = function(_this){
    $("#newEntryContainer").hide();
    $("#searchEntryContainer").show();
}

var populateVisitType = function (data) {
    data = JSON.parse(data);
    _.each(data, function(r){
        var objHTML = "<li class='leftTypeNav' href='#'>"+ r.name +"</li>"
        $("#typesContainer").append(objHTML);
    });
    $("#typesContainer li").on('click', function(_this){
        _.each($("#typesContainer li"),function(i){
            $(i).removeClass("selectedButton");
        });
        $(_this.currentTarget).addClass("selectedButton");
        $("#subtype").text(_this.currentTarget.innerHTML);
        $("#entryInput").prop("disabled",false);
        
    });
};

var populateSubjectList = function (data) {
    data = JSON.parse(data);
    _.each(data, function(r){
        var objHTML = "<li class='leftTypeNav' href='#'>"+ r.name +"</li>"
        $("#subjectContainer").append(objHTML);
    });
    $("#subjectContainer li").on('click', function(_this){
        _.each($("#subjectContainer li"),function(i){
            $(i).removeClass("selectedButton");
        });
        $(_this.currentTarget).addClass("selectedButton");
        $("#optionsContainer").show();
        $("#nameWelcome").text(_this.currentTarget.innerHTML);
    });
};

var load = function () {
    flatpickr('#datepickerA');
    flatpickr('#datepickerB');
    
    $("#searchEntryContainer").hide();
    $("#newEntryContainer").hide();
    $("#optionsContainer").hide();
    
    if(document.getElementById("typesContainer")){
        getAllVisitTypes();
    }
    if(document.getElementById("subjectList")){
        getAllSubjectsA();
    }
};



load();