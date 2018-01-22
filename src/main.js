var Main = function(){

    var main = {};
    var entryBoxHMTL = `<div id="viewEntryBox">
                <i class="glyphicon glyphicon-remove" onclick="$('#viewEntryBox').remove()"></i>
                <p> Date: <label id='updateDate'></label> Provider <label id='updateProv'></label></p>
                <textarea id="entryUpdate"/>
                <button type="button" onclick="Main.updateEnt()">Update</button>
            </div>`;

    var openEntryViewer = function(_this){
        $('#viewEntryBox').remove();
        $('table').after(entryBoxHMTL);
        var row = $(_this).parent().parent().children();
        var entry = row[2].innerHTML;
        var prov = row[1].innerHTML;
        var date = row[0].innerHTML;
        $('#entryUpdate').val(entry);
        $('#updateDate').text(date);
        $('#updateProv').text(prov);
    }

    var updateEnt = function(){
        var entryText = $("#entryUpdate").val();
        var date =$("#updateDate").text();
        var type = $("#subtype").text();
        var provider = $("#updateProv").text();
        var subject = $("#subjectContainer .selectedButton").text();
        var collection = {
            entry: entryText,
            date : moment(date,"DD/MM/YYYY").format("X"),
            type : type,
            provider: provider,
            subject : subject
        }
        updateEntry(collection);
        location.reload();
    }

    var saveEnt = function(){
        var entryText = $("#entryInput").val();
        var date =$("#datepickerA")[0].value;
        var type = $("#subtype").text();
        var provider = $("#provDDNew").val();
        var subject = $("#subjectContainer .selectedButton").text();
        var collection = {
            entry: entryText,
            date : moment(date).unix().toString(),
            type : type,
            provider: provider,
            subject : subject
        }
        if (validateEntry(collection)){
            saveEntry(collection);
            location.reload();
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
        else return true;
    }

    var searchEntries = function(){
        $("tbody tr").remove();
        $('#viewEntryBox').remove();   
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
                            <td class="entryCell">` + d.entry + `</td>
                            <td><i class="glyphicon glyphicon-search" onclick="Main.openEntryViewer(this)"></i></td>
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
        flatpickr('#datepickerA',{
            defaultDate : "today"
        });
        flatpickr('#datepickerFrom',{
            defaultDate : new Date(new Date().setDate(new Date().getDate()-3))
        });
        flatpickr('#datepickerTo',{
            defaultDate : "today"
        });

        // var button = document.getElementById("forClass");
        // button.addEventListener("click",function(){
        //     console.log("Alakazam.");
        //     var div = document.getElementById("subjectContainer");
        //     div.style.backgroundColor = "red";
        // })
        
        $("#searchEntryContainer").hide();
        $("#newEntryContainer").hide();
        $("#optionsContainer").hide();
        
        if(document.getElementById("typesContainer")){
            getAllVisitTypes();
        }
        if(document.getElementById("subjectList")){
            getAllSubjects();
        }
        getAllProviders();
    };

    return {
        load : load,
        populateSubjectList : populateSubjectList,
        populateVisitType : populateVisitType,
        populateProviderDD : populateProviderDD,
        populateEntrySearch : populateEntrySearch,
        clearEntry : clearEntry,
        revealNew : revealNew,
        revealSearch : revealSearch,
        saveEnt : saveEnt,
        updateEnt: updateEnt,
        searchEntries : searchEntries,
        openEntryViewer : openEntryViewer
    };
}();
