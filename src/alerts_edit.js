var AlertsEdit = (function(){

    var alertsEdit = {}
    let id;
    
    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

    function setSelectedValue(selectObj, valueToSet) {
        for (var i = 0; i < selectObj.options.length; i++) {
            if (selectObj.options[i].text== valueToSet) {
                selectObj.options[i].selected = true;
                return;
            }
        }
    }

    var getHoursFromCustom = function(val, denom){
        var hours;
        switch(denom){
            case "y":
                hours = val * 8760;
                break;
            case "m":
                hours = val * 720;
                break;
            case "w":
                hours = val * 168;
                break;
            case "d":
                hours = val * 24;
                break;
            default:
                hours = val;
                break;
        }
        return hours;
    }

    var loadToForm = function(data){
        $("#nameInput").val(data.name);
        setSelectedValue($("#forInput")[0],data.for)
        $("#activeInput").prop("checked", data.active);
        setSelectedValue($("#frequencyInput")[0],data.frequency)

        var formattedDate = moment(data.trigger_date).format("YYYY-MM-DD")
        $("#startFromDate").val(formattedDate);
    }

    var clearForm = function(){
        $("#errors").empty()
        
        $("#typeInput").val("");
        $("#forInput").val("");
        $("#activeInput").prop("checked", false);        
        $("#frequencyInput").val("");
        $("#startFromDate").val("");
        $("#customValue").val("");
        $("#customInput").val("");
        $("#customFrequencyContainer").hide(); 
        if($("#nameInput").prop("disabled")==false){
            $("#nameInput").val("");
        }
    }

    var validateForm = function(collection){
        var errorList = []
        if(collection.name === "") errorList.push("Alert must have a name.");
        if(collection.for === "") errorList.push("Alert must be assigned to a subject.");
        if(collection.frequency === "") errorList.push("Alert frequency must not be empty.");
        if(collection.trigger_date === "") errorList.push("Start data must not be empty.")
        if(moment(collection.trigger_date) < moment()) errorList.push("Start date cannot be older than today.")
        return errorList;
    }

    var gatherCollectionFromPage = function(){
        var collection = {};
        collection.name = $("#nameInput").val();
        collection.for = $("#forInput")[0].selectedOptions[0].value;
        collection.active = $("#activeInput").val();
        collection.trigger_date = $("#startFromDate").val();

        if($("#frequencyInput")[0].selectedOptions[0].value === "-1"){ //if custom
            var dateValue = $("#customValue").val();
            var dateDenom = $("#customInput")[0].selectedOptions[0].value;
            var hours = getHoursFromCustom(dateValue, dateDenom);
            var denom = dateDenom;
            collection.frequency = {
                hours,denom
            }
        } else{ //Preset
            collection.frequency = $("#frequencyInput")[0].selectedOptions[0].value;
        }

        if(id) collection.id = id;
        return collection;
    }

    var load = function(){
        $("#errors").hide()            
        
        flatpickr('#startFromDate',{
            defaultDate : "today"
        });

        $("#customFrequencyContainer").hide();

        $("#frequencyInput").on("change", o => {
            if(o.currentTarget.selectedOptions[0].value == "-1")
            {
                $("#customFrequencyContainer").show();            
            } else {
                $("#customFrequencyContainer").hide();                
            }
        })

        id = getQueryVariable("mode");
        if(id != "new")
        {
            $("#nameInput").prop("disabled", true);
            $.when(getAllProvidersById(provid)).then(function(data){
                loadToForm(data)
            });
        }

        $("#clearBtn").on("click", function(){
            clearForm();
        });
        $("#saveBtn").on("click", function(){
            $("#errors").hide()                        
            $("#errors").empty()
            var collection = gatherCollectionFromPage();
            var validation = validateForm(collection);
            if(validation.length < 1){
                api_saveAlert(collection);
            }else{
                $("#errors").show() 
                
                $("#errors").append("Errors in submitting the Alert: \n")                
                validation.forEach( v => {
                    $("#errors").append(v + "\n")
                })
            }
        });
    }

    return {
        load : load
    }

})(jQuery, moment);