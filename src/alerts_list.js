var AlertsList = (function(){

    var alertsList = {}

    // var checkmark = "<i class='glyphicon glyphicon-trash'></i>"
    // var crossout = "<i class='glyphicon glyphicon-arrow'></i>"   
    var checkmark = "O"
    var crossout = "X"

    var filterTable = function(name){
        var targetTable = $("#alertTableBody");
        Array.from(targetTable[0].children).forEach(tr => {
            $(tr).show();
            if(name !== "None" && tr.children[1].textContent !== name){
                $(tr).hide();
            }
        })
    }

    var displayFrequency = function(hours){
        switch(hours){
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
            default :
                // 11 days
                // {
                //     hours : 264
                //     denomination : "d"
                // }

                var numOfHours = hours.hours;
                var calcedNum;
                var denom;

                switch(hours.denom){
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
                

                break;
            
        }
    }

    var markAsResolved = function(alert_id){
        resolveAlert(alert_id);
        console.log(alert_id)
    }

    var loadAlertsTable = function(data){
        var data = [
            {
                id:123,
                name: "Testing",
                for: "Scooter",
                active: true,
                frequency: {
                    hours: 2880,
                    denom: "m"
                },
                trigger_date: moment().format("YYYY-MM-DD"),
                resolved: true
            },
            {
                id:345,
                name: "Another test", 
                for: "Buster",
                active: true,
                frequency: 720,
                trigger_date: moment().format("YYYY-MM-DD"),
                resolved: false
            }
        ]
        _.each(data, function(d){
            var html = `<tr class="${d.resolved ? "" : "ResolvedWarning\" title=\"Alarm has been triggered but not recorded as resolved."}"><td data-id=${d.id}>${d.name}</td>
                    <td>${d.for}</td>
                    <td>${d.active ? checkmark : crossout}</td>
                    <td>${displayFrequency(d.frequency)}</td>
                    <td>${d.trigger_date}</td>
                    <td>${d.resolved ? checkmark : crossout}</td>
                    <td><label class='iconHover' onclick='window.location.href = "alerts_edit.html?mode=${d.id}";'>Edit</label> | <label class='iconHover' onclick='markAsResolved(${d.id})";'>Resolve</label>  | <label  class='iconHover' onclick="AlertsList.deleteAlert(${d.id})">Delete</label></td>
                    </tr>`;
            $("#alertTableBody").append(html);
        });
    }

    var load = function(){
        $("#filterByInv").on("change", e => {
            const value = e.currentTarget.selectedOptions[0].textContent;
            filterTable(value);
        })

        loadAlertsTable()
        // if(document.getElementById("alertTable")){
        //     $.when(getAllAlerts()).then(function(data){
        //         loadAlertsTable(data);
        //     });
        // }
    }

    return {
        load : load,
        markAsResolved : markAsResolved
    }

})(jQuery, moment);