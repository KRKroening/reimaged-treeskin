
var saveEnt = function(){
    
    var entryText = $("#entryInput").val();
    var date =$("#datepickerA")[0].value;
    var type = $("#subtype").text();
    var subject = $("#subjectContainer .selectedButton").text();
    var collection = {
        entry: entryText,
        date : moment(date).unix(),
        type : type,
        subject : subject
    }
    if (validateEntry(collection)){
        saveEntry(collection);
    }
    else {
        $("#errorAlert").text = "Please correct the form";
    }
}

var validateEntry = function(collection){
    if(collection.entry == "") return false;
    if(collection.date == "") return false;
    if(collection.type == "") return false;
    if(collection.subject == "") return false;
}

var searchEntries = function(){
    var dateFrom =$("#datepickerFrom")[0].value;
    var dateTo =$("#datepickerTo")[0].value;
    var type = $("#searchSubtype").text();
    var provider = $("#provDDSearch").val();
    var subject = $("#subjectContainer .selectedButton").text();
    
    var collection = {
        dateFrom: moment(dateFrom).unix(),
        dateTo : moment(dateTo).unix(),
        type : type,
        provider : provider,
        subject : subject        
    }
    getEntries(collection);
}

var clearEntry = function() {
    $("#entryInput").val("");
    $("#datepickerA").val("");
    $("#subtype").text("");
}

var revealNew = function(_this){
    $("#searchEntryContainer").hide();
    $("#newEntryContainer").show();
}

var revealSearch = function(_this){
    $("#newEntryContainer").hide();
    $("#searchEntryContainer").show();
}

var populateEntrySearch = function(data){
    data = JSON.parse(data);
    _.each(data,function(d){
        var row = `<tr>
                    <td>` + moment(d.date*1000).format("DD/MM/YYYY") + `</td>
                    <td>` + d.provider + `</td>
                    <td>` + d.entry + `</td>
                    <td>` + "View" + `</td>
                    </tr>`
        $("tbody").append(row);
    });
}

var populateProviderDD = function(data){
    data = JSON.parse(data);
    _.each(data,function(d){
        $('#provDDSearch').append($('<option>', { 
            value: d.name,
            text : d.name 
        }));
        $('#provDDNew').append($('<option>', { 
            value: d.name,
            text : d.name 
        }));
    })
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
        $("#searchSubtype").text(_this.currentTarget.innerHTML);
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
    flatpickr('#datepickerFrom');
    flatpickr('#datepickerTo');
    
    $("#searchEntryContainer").hide();
    $("#newEntryContainer").hide();
    $("#optionsContainer").hide();
    
    if(document.getElementById("typesContainer")){
        getAllVisitTypes();
    }
    if(document.getElementById("subjectList")){
        getAllSubjectsA();
    }
    getAllProvidersB();
};



load();