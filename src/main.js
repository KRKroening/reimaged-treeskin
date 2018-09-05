var Main = function () {

    /*
    TODO!!!!

    Dockerize
    Get redis

    Add nodejs services
        - Chron to check if things are needed. (Pentosan, farrier, teeth, vaccines, worming, ect)
        - sends alert on website, plus to phone
        - queue service to resolve alerts
    Add login page
        -user managment
        - user account
        - password hashing
    add user to subject/provider schema
    add provider/subject to user schema
    Add tracking to service page. Like alerts.
    Add downloads page to download records.
    Ability to upload images.

    ticket/suggestion submission.



    */


    var USER_SESSION;

    var main = {};
    var entryBoxHMTL = `<div id="viewEntryBox">
                <i class="glyphicon glyphicon-remove" onclick="$('#viewEntryBox').remove()"></i>
                <p> Date: <label id='updateDate'></label> Provider <label id='updateProv'></label></p>
                <textarea id="entryUpdate"/>
                <button type="button" onclick="Main.updateEnt()">Update</button>
            </div>`;

    var openEntryViewer = function (_this) {
        $('#viewEntryBox').remove();
        $(_this.parentNode.parentNode).after(entryBoxHMTL);
        var row = $(_this).parent().parent().children();
        var entry = row[2].innerHTML;
        var prov = row[1].innerHTML;
        var date = row[0].innerHTML;
        $('#entryUpdate').val(entry).attr('data-id', row[0].dataset["id"]);
        $('#updateDate').text(date);
        $('#updateProv').text(prov);
    }

    var updateEnt = function () {
        event.preventDefault();
        var entryText = $("#entryUpdate").val();
        var date = $("#updateDate").text();
        var type = $("#subtype").text();
        var provider = $("#updateProv").text();
        var subject = $("#subjectContainer .selectedButton").text();
        var id = $("#entryUpdate").attr('data-id')
        var collection = {
            entry: entryText,
            date: parseInt(moment(date, "DD/MM/YYYY").format("X")),
            type: type,
            provider: provider,
            subject: subject
        }
        updateEntry(id, collection);
        location.reload();
    }

    var saveEnt = function () {
        $("#errors").hide()
        $("#errors").empty()

        var entryText = $("#entryInput").val();
        var date = $("#datepickerA")[0].value;
        var type = $("#subtype").text();
        var provider = $("#provDDNew").val();
        var subject = $("#subjectContainer .selectedButton")[0].dataset.id
        var collection = {
            entry: entryText,
            date: moment(date).unix().toString(),
            type: type,
            provider: provider,
            subject: subject
        }
        var validated = validateEntry()
        if (validated.length > 1) {
            saveEntry(collection);
        }
        else {
            $("#errors").show()

            $("#errors").append("Errors in submitting the Entry: \n")
            validated.forEach(v => {
                $("#errors").append(v + "\n")
            })
        }
    }

    var validateEntry = function () {
        $("#errors").empty()
        _.each($("input"), function (i) {
            $(i).css("border", "1px #ccc solid");
        });
        var flag = [];
        if ($("#entryInput").val() == "") {
            $("#entryInput").css("border", "2px red solid");
            flag.push("Entry cannot be empty.")
        }
        if ($("#datepickerA").val() == "") {
            $("#datepickerA").css("border", "2px red solid");
            flag.push("Entry cannot be empty.")
        }
        if (moment($("#datepickerA").val()) > moment()) {
            $("#datepickerA").css("border", "2px red solid");
            flag.push("Entry cannot be dated before today.")
        }
        if ($("#subtype")[0].textContent == "") {
            $("#subtype").css("border", "2px red solid");
            flag.push("Type cannot be empty.")
        }
        if ($("#provDDNew").val() == "") {
            $("#provDDNew").css("border", "2px red solid");
            flag.push("Provider cannot be empty.")
        }
        return flag;

    }

    var searchEntries = function () {
        $("tbody tr").remove();
        $('#viewEntryBox').remove();
        var dateFrom = $("#datepickerFrom")[0].value;
        var dateTo = $("#datepickerTo")[0].value;
        var type = $("#searchSubtype").text();
        var contains = $("#containsSearch").val();
        var provider = $("#provDDSearch").val();
        var subject = $("#subjectContainer .selectedButton")[0].dataset.id

        var collection = {
            dateFrom: moment(dateFrom).unix(),
            dateTo: moment(dateTo).unix(),
            type: type,
            contains: contains,
            provider: provider,
            subject: subject
        }
        $.when(getEntries(collection)).then(function (data) {
            populateEntrySearch(data);
        })
    }

    var clearEntry = function () {
        $("#entryInput").val("");
        $("#datepickerA").val("");
        $("#subtype").text("");
    }

    var revealNew = function (_this) {
        $("#searchEntryContainer").hide();
        $("#newEntryContainer").show();
        $(".typeSelection-parent").show();
    }

    var revealSearch = function (_this) {
        $("#newEntryContainer").hide();
        $("#searchEntryContainer").show();
        $(".typeSelection-parent").show();
    }

    var populateEntrySearch = function (data) {
        _.each(data, function (d) {
            var row = `<tr>
                            <td data-id=`+ d._id + `>` + moment(d.date).format("DD/MM/YYYY") + `</td>
                            <td>` + d.provider + `</td>
                            <td class="entryCell">` + d.entry + `</td>
                            <td><i class="glyphicon glyphicon-search" onclick="Main.openEntryViewer(this)"></i></td>
                        </tr>`
            $("tbody").append(row);
        });
    }

    var populateProviderDD = function (data) {
        _.each(data, function (d) {
            $('#provDDSearch').append($('<option>', {
                value: d.name,
                text: d.name
            }));
            $('#provDDNew').append($('<option>', {
                value: d.name,
                text: d.name
            }));
        })
    }

    var populateVisitType = function (data) {
        _.each(data, function (r) {
            var objHTML = "<li class='typeSelection' href='#'>" + r.name + "</li>"
            $("#typesContainer").append(objHTML);
        });
        $("#typesContainer li").on('click', function (_this) {
            _.each($("#typesContainer li"), function (i) {
                $(i).removeClass("selectedButton");
            });
            $(_this.currentTarget).addClass("selectedButton");
            $("#subtype").text(_this.currentTarget.innerHTML);
            $("#searchSubtype").text(_this.currentTarget.innerHTML);
            $("#entryInput").prop("disabled", false);
        });
    };

    var populateSubjectList = function (data) {
        if (data[0] == undefined) {
            var objHTML = `<li class='leftTypeNav' href='#' data-id="-1">No herd members! Go to 'Manage Herd' to add some!</li>`
            $("#subjectContainer").append(objHTML);
        } else {
            _.each(data, function (r) {
                var objHTML = `<li class='leftTypeNav' href='#' data-id="${r.id}"> ${r.name}</li>`
                $("#subjectContainer").append(objHTML);
            });
            $("#subjectContainer li").on('click', function (_this) {
                _.each($("#subjectContainer li"), function (i) {
                    $(i).removeClass("selectedButton");
                });
                $(_this.currentTarget).addClass("selectedButton");
                $("#optionsContainer").show();
                $("#welcome-msg").hide();
                $("#nameWelcome").text(_this.currentTarget.innerHTML);
            });
        }
    };

    var load = function () {

        USER_SESSION = GET_USER_SESSION();
        if (!USER_SESSION) location.href = "./account/login.html";
        else {
            $("body").show();

            flatpickr('#datepickerA', {
                defaultDate: "today"
            });
            flatpickr('#datepickerFrom', {
                defaultDate: new Date(new Date().setDate(new Date().getDate() - 3))
            });
            flatpickr('#datepickerTo', {
                defaultDate: "today"
            });

            $("#searchEntryContainer").hide();
            $("#newEntryContainer").hide();
            $("#optionsContainer").hide();
            $(".typeSelection-parent").hide();

            if (document.getElementById("typesContainer")) {
                $.when(getAllVisitTypes()).then(function (data) {
                    populateVisitType(data);
                })
            }
            if (document.getElementById("subjectList")) {
                $.when(getSubjectForUser(USER_SESSION.subjects)).then(function (data) {
                    populateSubjectList(data)
                })
            }
            $.when(getProvidersForUser(USER_SESSION.id)).then(function (data) {
                populateProviderDD(data)
            });
        }
    };

    return {
        load: load,
        populateSubjectList: populateSubjectList,
        populateVisitType: populateVisitType,
        populateProviderDD: populateProviderDD,
        populateEntrySearch: populateEntrySearch,
        clearEntry: clearEntry,
        revealNew: revealNew,
        revealSearch: revealSearch,
        saveEnt: saveEnt,
        updateEnt: updateEnt,
        searchEntries: searchEntries,
        openEntryViewer: openEntryViewer
    };
}();
