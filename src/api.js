
var apikey = "c6ddf72b-6b5c-4a70-94b5-a7a36eeb2e9c";
var baseURL = "https://cloud.mongodb.com/api/atlas/v1.0/groups/Treeskin/clusters/TS-01";
var url = "http://localhost:8080/reimaged-treeskin-connector/";


function callAPI(url) {
    return new Promise(function(resolve, reject) {
      $.getJSON(url).then(function(data){
          resolve(data)
      });
    });
}

// getAllVisitTypes = function(){
//     $.ajax({
//         method : 'GET',
//         url : url + "Types/get.php",
//         success : function(data){
//             // console.log(data);
//             Main.populateVisitType(data);
//         },
//         fail : function (){
//             console.log("error occred");
//         }
//     });
// }

getAllVisitTypes = function(){
    // $.ajax({
    //     method : 'GET',
    //     url : url + "Types/get.php",
    //     success : function(data){
    //         // console.log(data);
    //         Main.populateVisitType(data);
    //     },
    //     fail : function (){
    //         console.log("error occred");
    //     }
    // });
    return callAPI(url+"Types/get.php")
}

getAllSubjects = function(){
    // $.ajax({
    //     method : 'GET',
    //     url : url + "Subjects/get.php",
    //     success : function(data){
    //         // console.log(data);
    //         SubjectList.loadSubjectTable(JSON.parse(data));
    //     },
    //     fail : function (){
    //         console.log("error occred");
    //     }
    // });
    return callAPI(url+"Subjects/get.php")
}
getAllSubjectsA = function(){
    // $.ajax({
    //     method : 'GET',
    //     url : url + "Subjects/get.php",
    //     success : function(data){
    //         // console.log(data);
    //         Main.populateSubjectList(data);
    //     },
    //     fail : function (){
    //         console.log("error occred");
    //     }
    // });
    return callAPI(url+"Subjects/get.php")
}

getAllSubjectsByName = function(name){
    // $.ajax({
    //     method : 'GET',
    //     url : url + "Subjects/get.php?name=" + name,
    //     success : function(data){
    //         // console.log(data);
    //         SubjectEdit.loadToForm(data);
    //     },
    //     fail : function (){
    //         console.log("error occred");
    //     }
    // });
    return callAPI(url+"Subjects/get.php?name="+name)    
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

getAllProviders = function(){
    // $.ajax({
    //     method : 'GET',
    //     url : url + "Providers/get.php",
    //     success : function(data){
    //         // console.log(data);
    //         ProviderList.loadProviderTable(data);
    //     },
    //     fail : function (){
    //         console.log("error occred");
    //     }
    // });
    return callAPI(url+"Providers/get.php")
}

getAllProvidersB = function(){
    // $.ajax({
    //     method : 'GET',
    //     url : url + "Providers/get.php",
    //     success : function(data){
    //         // console.log(data);
    //         Main.populateProviderDD(data);
    //     },
    //     fail : function (){
    //         console.log("error occred");
    //     }
    // });
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
    // $.ajax({
    //     method : 'GET',
    //     url : url + "Providers/get.php?name=" + name,
    //     success : function(data){
    //         // console.log(data);
    //         ProviderEdit.loadToForm(data);
    //     },
    //     fail : function (){
    //         console.log("error occred");
    //     }
    // });
    return callAPI(url + "Providers/get.php?name=" + name)
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