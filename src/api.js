
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

getAllSubjectsByName = function(name){
    $.ajax({
        method : 'GET',
        url : url + "Subjects/get.php?name=" + name,
        success : function(data){
            // console.log(data);
            loadToForm(data);
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

saveSubject = function(collection){
    var strToSend= "name=" + collection.name +
                    "&age=" + collection.age +
                    "&gender=" + collection.gender +
                    "&breed=" + collection.breed +
                    "&colour=" + collection.colour;

    $.ajax({
        method : 'GET',
        url : url + "Subjects/insert.php?" + strToSend,
        success : function(data){
            console.log(data);
            if(data.includes("Success"))
                {
                    location.href = "subjects_list.html";
                }
                else{
                    $("#errorAlert").text("A problem occured.");
                }
        },
        fail : function (){
            console.log("error occred");

        }
    });
}

deleteSubject = function(name){
    $.ajax({
        method : 'DELETE',
        url : url + "Subjects/delete.php?name=" + name,
        success : function(data){
            console.log(data);
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

 ////// Providers /////

getAllProvidersA = function(){
    $.ajax({
        method : 'GET',
        url : url + "Providers/get.php",
        success : function(data){
            // console.log(data);
            loadProviderTable(data);
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

getAllProvidersB = function(){
    $.ajax({
        method : 'GET',
        url : url + "Providers/get.php",
        success : function(data){
            // console.log(data);
            populateProviderDD(data);
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

saveProvider = function(collection){
    var strToSend= "name=" + collection.name +
                    "&type=" + collection.type +
                    "&pPhone=" + collection.pPhone +
                    "&sPhone=" + collection.sPhone +
                    "&comp=" + collection.comp;

    $.ajax({
        method : 'GET',
        url : url + "Providers/save.php?" + strToSend,
        success : function(data){
            console.log(data);
            if(data.includes("Success"))
                {
                    location.href = "providers_list.html";
                }
                else{
                    $("#errorAlert").text("A problem occured.");
                }
        },
        fail : function (){
            console.log("error occred");

        }
    });
}

deleteProvider = function(name){
    $.ajax({
        method : 'DELETE',
        url : url + "Providers/delete.php?name=" + name,
        success : function(data){
            console.log(data);
        },
        fail : function (){
            console.log("error occured");
        }
    });
}

getAllProvidersByName = function(name){
    $.ajax({
        method : 'GET',
        url : url + "Providers/get.php?name=" + name,
        success : function(data){
            // console.log(data);
            loadToForm(data);
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

updateProvider = function(collection){
    var strToSend= "name=" + collection.name +
                    "&type=" + collection.type +
                    "&pPhone=" + collection.pPhone +
                    "&sPhone=" + collection.sPhone +
                    "&comp=" + collection.comp;
    $.ajax({
        method : 'GET',
        url : url + "Providers/update.php?"+strToSend,
        success : function(data){
            // console.log(data);
            location.href = "providers_list.html";
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

//  Entries

saveEntry = function(collection){
    $.ajax({
        method : 'POST',
        url : url + "Entries/save.php",
        data: JSON.stringify(collection),
        dataType: "xml/html/script/json", // expected format for response
        contentType: "application/json",
        success : function(data){
            console.log(data);
            if(data.includes("Success"))
                {
                    location.href = "main.html";
                }
                else{
                    $("#errorAlert").text("A problem occured.");
                }
        },
        fail : function (){
            console.log("error occred");

        }
    });
}

getEntries = function(collection){
    var strToSend= "provider=" + collection.provider +
                    "&subject=" + collection.subject +
                    "&fromDate=" + collection.fromDate +
                    "&type=" + collection.type +                    
                    "&todate=" + collection.todate;
    $.ajax({
        method : 'GET',
        url : url + "Entries/get.php?"+strToSend,
        success : function(data){
            // console.log(data);
            populateEntrySearch(data);
        },
        fail : function (){
            console.log("error occred");
        }
    });
}