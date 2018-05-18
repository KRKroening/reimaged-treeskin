var SubjectList = (function($, moment){

    var subjectList = {};

    var loadSubjectTable = function(data){
        _.each(data, function(d){
            var html = `<tr><td data-id=`+ d._id +`>` + d.name +`</td>
                    <td>` + (parseInt(moment().format('YYYY')) - d.age) +`</td>
                    <td>`+d.gender+`</td>
                    <td>`+d.breed+`</td>
                    <td>`+d.colour+`</td>
                    <td><label class='iconHover' onclick='window.location.href = "subjects_edit.html?mode=`+d._id+`";'>Edit</label> | <label  class='iconHover' onclick="SubjectList.deleteSub(this)">Delete</label></td>
                    </tr>`;
            $("#subjectTableBody").append(html);
        });
    }

    var deleteSub = function(i)
    {
        var id = $(i).parent().parent().children()[0].dataset["id"];
        deleteSubject(id);
        location.reload();
    }


    var load = function(){
        var test = $("#subjectTableBody");
        if(document.getElementById("subjectTable")){
            $.when(getAllSubjects()).then(function(data){
                loadSubjectTable(data);
            });
        }
    }

    var testMath = function(a,b,c){
        return a+b+c;
    }

     return {
         load : load,
         loadSubjectTable : loadSubjectTable,
         testMath : testMath,
         deleteSub: deleteSub
     }
})(jQuery, moment);