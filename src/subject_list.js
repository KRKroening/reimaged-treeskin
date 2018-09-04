var SubjectList = (function ($, moment) {

    var subjectList = {};

    var loadSubjectTable = function (data) {
        if (data.length == 0) {
            var html = `<label style="width:100%;text-align:center;">Nothing to display! Click 'Add' to create some!</label>`;
            $("#subjectTable").after(html);
        } else {
            _.each(data, function (d) {
                var html = `<tr><td data-id=` + d.id + `>` + d.name + `</td>
                    <td>` + (parseInt(moment().format('YYYY')) - parseInt(moment(d.age).format('YYYY'))) + `</td>
                    <td>`+ d.gender + `</td>
                    <td>`+ d.breed + `</td>
                    <td>`+ d.colour + `</td>
                    <td><label class='iconHover' onclick='window.location.href = "subjects_edit.html?mode=`+ d.id + `";'>Edit</label> | <label  class='iconHover' onclick="SubjectList.deleteSub(this)">Delete</label></td>
                    </tr>`;
                $("#subjectTableBody").append(html);
            });
        }
    }

    var deleteSub = function (i) {
        var id = $(i).parent().parent().children()[0].dataset["id"];
        deleteSubject(id);
        location.reload();
    }


    var load = function () {
        USER_SESSION = GET_USER_SESSION();
        if (!USER_SESSION) location.href = "./account/login.html";
        else {
            $("body").show();
            if (document.getElementById("subjectTable")) {
                $.when(getSubjectForUser(USER_SESSION.subjects)).then(function (data) {
                    loadSubjectTable(data);
                });
            }
        }
    }

    return {
        load: load,
        loadSubjectTable: loadSubjectTable,
        deleteSub: deleteSub
    }
})(jQuery, moment);