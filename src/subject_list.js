

var loadSubjectTable = function(data){
    _.each(data, function(d){
        var html = `<tr><td>` + d.name +`</td>
                  <td>` + d.age +`</td>
                  <td>`+d.gender+`</td>
                  <td>`+d.breed+`</td>
                  <td>`+d.colour+`</td>
                  <td><label class='iconHover' onclick='window.location.href = "subjects_edit.html?mode=`+d.name+`";'>Edit</label> | <label  class='iconHover' onclick="deleteSub(this)">Delete</label></td>
                  </tr>`;
        $("#subjectTableBody").append(html);
    });
}

var deleteSub = function(i)
{
    var name = $(i).parent().parent().children()[0].innerHTML;
    deleteSubject(name);
    location.reload();
}


var load = function(){
    var test = $("#subjectTableBody");
    if(document.getElementById("subjectTable")){
        getAllSubjects();
    }
}

load();