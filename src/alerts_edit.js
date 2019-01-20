var AlertsEdit = (function () {

    var alertsEdit = {}
    let id;

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }

    function setSelectedValue(selectObj, valueToSet) {
        for (var i = 0; i < selectObj.options.length; i++) {
            if (selectObj.options[i].value == valueToSet) {
                selectObj.options[i].selected = true;
                return;
            }
        }
    }

    var getHoursFromCustom = function (val, denom) {
        var hours;
        switch (denom) {
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

    var loadToForm = function (data) {
        $("#nameInput").val(data.name);
        setSelectedValue($("#subjectDD")[0], data.subject_id)
        $("#activeInput").prop("checked", data.active);
        setSelectedValue($("#frequencyInput")[0], data.frequency) //TODO: fix the rest of these.

        var formattedDate = moment(data.trigger_date).format("YYYY-MM-DD")
        $("#startFromDate").val(formattedDate);

        var formattedTime = moment(data.trigger_date).format("H:mm a")
        $(".timepicler").wickedpicker({"now":formattedTime});
    }

    var clearForm = function () {
        $("#errors").empty()

        $("#typeInput").val("");
        $("#forInput").val("");
        $("#activeInput").prop("checked", false);
        $("#frequencyInput").val("");
        $("#startFromDate").val("");
        $("#customValue").val("");
        $("#customInput").val("");
        $("#customFrequencyContainer").hide();
        if ($("#nameInput").prop("disabled") == false) {
            $("#nameInput").val("");
        }
    }

    var validateForm = function (collection) {
        var errorList = []
        if (collection.name === "") errorList.push("Alert must have a name.");
        if (collection.for === "") errorList.push("Alert must be assigned to a subject.");
        if (collection.frequency === "") errorList.push("Alert frequency must not be empty.");
        if (collection.trigger_date === "") errorList.push("Start data must not be empty.")
        if (moment(collection.trigger_date*1000) < moment().utc) errorList.push("Start date cannot be older than today.")
        return errorList;
    }

    var gatherCollectionFromPage = function () {
        var collection = {};
        collection.name = $("#nameInput").val();
        collection.subject_id = $("#subjectDD")[0].selectedOptions[0].value;
        collection.active = $("#activeInput").prop("checked");

        date = $("#startFromDate").val();
        time = $(".timepicker").wickedpicker('time');
        collection.trigger_date = moment().unix("YYYY-MM-DD h : mm a",date + " " + time)
        collection.user_id = USER_SESSION.id;

        if ($("#frequencyInput")[0].selectedOptions[0].value === "-1") { //if custom
            var dateValue = $("#customValue").val();
            var dateDenom = $("#customInput")[0].selectedOptions[0].value;
            var hours = getHoursFromCustom(dateValue, dateDenom);
            var denom = dateDenom;
            collection.frequency = {
                hours, denom
            }
        } else { //Preset
            collection.frequency = { "hours" : $("#frequencyInput")[0].selectedOptions[0].value , "denom" : null };
        }

        if (id != "new") collection.id = id;
        return collection;
    }

    var load = function () {
        USER_SESSION = GET_USER_SESSION();
        if (!USER_SESSION) location.href = "./account/login.html";
        else {
            $("body").show();
            $("#errors").hide()

            flatpickr('#startFromDate', {
                defaultDate: "today"
            });

            $('.timepicker').wickedpicker({
                twentyFour: false,  //Display 24 hour format, defaults to false
                upArrow: 'wickedpicker__controls__control-up',  //The up arrow class selector to use, for custom CSS
                downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS
                close: 'wickedpicker__close', //The close class selector to use, for custom CSS
                hoverState: 'hover-state', //The hover state class to use, for custom CSS
                title: 'Timepicker', //The Wickedpicker's title,
                timeSeparator: ' : ', // The string to put in between hours and minutes (and seconds)
                minutesInterval: 15, //Change interval for minutes, defaults to 1
                clearable: false, //Make the picker's input clearable (has clickable "x")
            });
          
            $.when(getSubjectForUser(USER_SESSION.subjects)).then(function (data) {
                data.forEach(function(d){
                    $("#subjectDD").append("<option value='"+ d.id + "'>"+ d.name +"</option>")
                });
            });

            $("#customFrequencyContainer").hide();

            $("#frequencyInput").on("change", o => {
                if (o.currentTarget.selectedOptions[0].value == "-1") {
                    $("#customFrequencyContainer").show();
                } else {
                    $("#customFrequencyContainer").hide();
                }
            })

            id = getQueryVariable("mode");
            if (id != "new") {
                $("#nameInput").prop("disabled", true);
                $.when(api_getAlertById(id)).then(function(res){
                    loadToForm(res[0]);
                })
            }

            $("#clearBtn").on("click", function () {
                clearForm();
            });
            $("#saveBtn").on("click", function () {
                $("#errors").hide()
                $("#errors").empty()
                var collection = gatherCollectionFromPage();
                var validation = validateForm(collection);
                if (validation.length < 1) {
                    api_saveAlert(collection);
                } else {
                    $("#errors").show()

                    $("#errors").append("Errors in submitting the Alert: \n")
                    validation.forEach(v => {
                        $("#errors").append(v + "\n")
                    })
                }
            });
        }
    }

    return {
        load: load
    }

})();