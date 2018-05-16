
var apikey = "c6ddf72b-6b5c-4a70-94b5-a7a36eeb2e9c";
var baseURL = "https://cloud.mongodb.com/api/atlas/v1.0/groups/Treeskin/clusters/TS-01";
var url = "http://localhost:3000/";


function callAPI(url) {
    return new Promise(function(resolve, reject) {
      $.getJSON(url).then(function(data){
          resolve(data)
      });
    });
}

getAllVisitTypes = function(){
    return callAPI(url+"Types/")
}

// Subjects

getAllSubjects = function(){
    return callAPI(url+"Subjects/")
}

getSubjectById = function(id){
    return callAPI(url+"Subjects/" + id)    
}


saveSubject = function(collection){
    var strToSend= {"name" : collection.name,
                    "age" : collection.age,
                    "gender" : collection.gender,
                    "breed" : collection.breed,
                    "colour" : collection.colour
                }

    $.ajax({
        method : 'POST',
        url : url + "Subjects/",
        data : strToSend,
        success : function(data){
            location.href = "subjects_list.html";            
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

updateSubject = function(id,collection){
    var strToSend= {"name" : collection.name,
                    "age" : collection.age,
                    "gender" : collection.gender,
                    "breed" : collection.breed,
                    "colour" : collection.colour
                }
    $.ajax({
        method : 'PUT',
        url : url + "Subjects/" + id ,
        data : strToSend,
        success : function(data){
            // console.log(data);
            location.href = "subjects_list.html";
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

deleteSubject = function(id){
    $.ajax({
        method : 'DELETE',
        url : url + "Subjects/" + id,
        success : function(data){
            console.log(data);
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

 ////// Providers /////

getAllProviders = function(){
    return callAPI(url+"Providers/")
}

getAllProvidersById = function(id){
    return callAPI(url + "Providers/" + id)
}

saveProvider = function(collection){
    var strToSend= {"name" : collection.name,
                    "type" : collection.type,
                    "pPhone" : collection.pPhone,
                    "sPhone" : collection.sPhone,
                    "comp" : collection.comp
                }

    $.ajax({
        method : 'POST',
        url : url + "Providers",
        data : strToSend,
        success : function(data){
            location.href = "providers_list.html";
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

deleteProvider = function(id){
    $.ajax({
        method : 'DELETE',
        url : url + "Providers/" + id,
        success : function(data){
            console.log(data);
        },
        fail : function (){
            console.log("error occured");
        }
    });
}

updateProvider = function(id,collection){
    var strToSend= {"name" : collection.name,
                    "type" : collection.type,
                    "pPhone" : collection.pPhone,
                    "sPhone" : collection.sPhone,
                    "comp" : collection.comp
                }
    $.ajax({
        method : 'PUT',
        url : url + "Providers/" + id ,
        data : strToSend,
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
                    "&fromDate=" + collection.dateFrom +
                    "&type=" + collection.type +                    
                    "&toDate=" + collection.dateTo;
    // $.ajax({
    //     method : 'GET',
    //     url : url + "Entries/get.php?"+strToSend,
    //     success : function(data){
    //         // console.log(data);
    //         Main.populateEntrySearch(data);
    //     },
    //     fail : function (){
    //         console.log("error occred");
    //     }
    // });
    return callAPI("Entries/get.php?"+strToSend)
}

updateEntry = function(collection){
    $.ajax({
        method : 'POST',
        url : url + "Entries/update.php",
        data: JSON.stringify(collection),
        dataType: "xml/html/script/json", // expected format for response
        contentType: "application/json",
        success : function(data){
            console.log(data);
            if(data.includes("Success"))
                {
                    location.reload();
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