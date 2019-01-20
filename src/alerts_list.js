var AlertsList = (function () {

    var alertsList = {}

    var active = "<i class='glyphicon glyphicon-asterisk' style='color:green;font-size:20px;'></i>"
    var disabled = "<i class='glyphicon glyphicon-asterisk' style='color:orange;font-size:20px;'></i>"

    var unresolved = "<i class='glyphicon glyphicon-exclamation-sign' style='color:red;font-size:20px;'></i>"
    var resolved = "<i class='glyphicon glyphicon-ok-sign' style='color:green;font-size:20px;'></i>"

    var subjects;

    var filterTable = function (name) {
        var targetTable = $("#alertTableBody");
        Array.from(targetTable[0].children).forEach(tr => {
            $(tr).show();
            if (name !== "None" && tr.children[1].textContent !== name) {
                $(tr).hide();
            }
        })
    }

    var displayFrequency = function (hours) {
        switch (parseInt(hours)) {
            case 0:
                return "No Repeat";
                break;
            case 24:
                return "Daily";
                break;
            case 48:
                return "Every 2 days";
                break;
            case 72:
                return "Every 3 days";
                break;
            case 168:
                return "Weekly";
                break;
            case 336:
                return "Bi-weekly";
                break;
            case 720:
                return "Monthly";
                break;
            case 1440:
                return "Bi-Monthly";
                break;
            case 4320:
                return "Semi-Annual";
                break;
            case 8760:
                return "Annual";
                break;
            default:
                // 11 days
                // {
                //     hours : 264
                //     denomination : "d"
                // }

                var numOfHours = hours.hours;
                var calcedNum;
                var denom;

                switch (hours.denom) {
                    case "y":
                        calcedNum = numOfHours / 8760;
                        denom = "Years";
                        break;
                    case "m":
                        calcedNum = numOfHours / 720;
                        denom = "Months"
                        break;
                    case 'w':
                        calcedNum = numOfHours / 168;
                        denom = "Weeks";
                        break;
                    default:
                        calcedNum = numOfHours / 24;
                        denom = "Days";
                        break;
                }

                return `${calcedNum} ${denom}`;
        }
    }

    var markAsResolved = function (alert_id) {
        resolveAlert(alert_id);
    }

    var loadAlertsTable = function (data) {
        _.each(data, function (d) {
            var sub = subjects.filter(function(s){
                if(s.id == d.subject_id)
                    return s
            })[0]

            var html = `<tr class="${d.resolved ? "" : "ResolvedWarning"}\"><td data-id=${d.id}>${d.name}</td>       
                    <td>${sub.name}</td>
                    <td>${d.active ? active : disabled}</td>
                    <td>${displayFrequency(d.frequency)}</td>
                    <td>${d.trigger_date}</td>
                    <td ${d.resolved ? "":'title=\"Alarm has been triggered but not recorded as resolved."'}>${d.resolved ? resolved : unresolved}</td>
                    <td><label class='iconHover' onclick='window.location.href = "alerts_edit.html?mode=${d.id}";'>Edit</label> | <label class='iconHover' onclick='markAsResolved(${d.id})";'>Resolve</label>  | <label  class='iconHover' onclick="AlertsList.deleteAlert(${d.id})">Delete</label></td>
                    </tr>`;
            $("#alertTableBody").append(html);
        });
    }

    var load = function () {
        USER_SESSION = GET_USER_SESSION();
        if (!USER_SESSION) location.href = "./account/login.html";
        else {
            $("body").show();

            $.when(getSubjectForUser(USER_SESSION.subjects)).then(function (data) {
                subjects = data
                data.forEach(function (d) {
                    $("#filterByInv").append("<option value='" + d.id + "'>" + d.name + "</option>");
                })
                if (document.getElementById("alertTable")) {
                    $.when(api_getAlertByUser(USER_SESSION.id)).then(function (data) {
                        loadAlertsTable(data);
                    });
                }
            })

            $("#filterByInv").on("change", e => {
                const value = e.currentTarget.selectedOptions[0].textContent;
                filterTable(value);
            })

        }
    }

    return {
        load: load,
        markAsResolved: markAsResolved
    }

})();