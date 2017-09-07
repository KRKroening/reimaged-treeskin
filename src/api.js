
var apikey = "c6ddf72b-6b5c-4a70-94b5-a7a36eeb2e9c";
var baseURL = "https://cloud.mongodb.com/api/atlas/v1.0/groups/Treeskin/clusters/TS-01";
var url = "http://localhost:8080/reimaged-treeskin-connector/";

getAllVisitTypes = function(){
    $.ajax({
        method : 'GET',
        url : url + "Types/get.php",
        success : function(data){
            // console.log(data);
            populateVisitType(data);
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

getAllSubjects = function(){
    $.ajax({
        method : 'GET',
        url : url + "Subjects/get.php",
        success : function(data){
            // console.log(data);
            loadSubjectTable(JSON.parse(data));
        },
        fail : function (){
            console.log("error occred");
        }
    });
}
getAllSubjectsA = function(){
    $.ajax({
        method : 'GET',
        url : url + "Subjects/get.php",
        success : function(data){
            // console.log(data);
            populateSubjectList(data);
        },
        fail : function (){
            console.log("error occred");
        }
    });
}
