
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

// USER SESSION

var GET_USER_SESSION = function(){
    var user = sessionStorage.getItem("USER_SESSION");
    return JSON.parse(user);
}
var SET_USER_SESSION = function(){
    var user = GET_USER_SESSION()
    return user_getUser(user.username).then(function(u){
        sessionStorage.setItem("USER_SESSION", JSON.stringify(u[0]));
    })
}

//

getAllVisitTypes = function(){
    return callAPI(url+"types/")
}

// Subjects

getAllSubjects = function(){
    return callAPI(url+"subject/")
}

getSubjectById = function(id){
    return callAPI(url+"subject/one/" + id)    
}

var getSubjectForUser = function(subList){
    var param = subList.join(",");
    if(param == "") param = "null"
    return callAPI(url+"subject/user/" + param)    
}


saveSubject = function(collection){

    $.ajax({
        method : 'POST',
        url : url + "subject/",
        data : collection
    }).
    done(function(){
        SET_USER_SESSION().then(location.href = "subjects_list.html");
    }).
    catch(function(err){

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
        url : url + "subject/" + id ,
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
        url : url + "subject/" + id,
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
    return callAPI(url+"provider/")
}

getAllProvidersById = function(id){
    return callAPI(url + "provider/" + id)
}

getProvidersForUser = function(user){
    return callAPI(url + "provider/user/" + user);
}

saveProvider = function(collection){
    $.ajax({
        method : 'POST',
        url : url + "provider",
        data : collection,
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
        url : url + "provider/" + id,
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
        url : url + "provider/" + id ,
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
    var strToSend= {"entry" : collection.entry,
                    "provider" : collection.provider,
                    "date" : collection.date,
                    "type" : collection.type,
                    "subject" : collection.subject
                }
    $.ajax({
        method : 'POST',
        url : url + "entry/",
        data: strToSend,        
        success : function(data){        
            location.href = "main.html";
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

getEntries = function(collection){
    collection.provider == "Any"? collection.provider = "" : collection.provider = collection.provider

    var strToSend= "provider=" + collection.provider +
                    "&contains=" + collection.contains +
                    "&subject=" + collection.subject +
                    "&fromDate=" + collection.dateFrom +
                    "&type=" + collection.type +                    
                    "&toDate=" + collection.dateTo;
    return callAPI(url+"entry?"+strToSend)
}

updateEntry = function(id,collection){
    $.ajax({
        method : 'PUT',
        url : url + "entry/" + id,
        data: collection,
        success : function(data){            
                location.reload();
        },
        fail : function (){
            console.log("error occred");

        }
    });
}


var resolveAlert = function(alert_id){
    return callAPI(url+"alert/resolve/" + alert_id)
}

var api_getAlertById = function(id){
    return callAPI(url + "alert/" + id);
}

var api_getAlertByUser = function(user){
    return callAPI(url + "alert/user/" + user);
}

var api_saveAlert = function(collection){
        $.ajax({
        method : 'POST',
        url : url + "alert",
        data : collection,
        success : function(data){
            location.href = "alerts_list.html";
        },
        fail : function (){
            console.log("error occred");
        }
    });
}

api_updateAlert = function(id,collection){
    $.ajax({
        method : 'PUT',
        url : url + "alert/" + id,
        data: collection,
        success : function(data){            
            location.reload();
        },
        fail : function (){
            console.log("error occred");

        }
    });
}

var api_requestDownload = function(criteria){
    console.table(criteria)
}


var user_registerUser = function( user ){
    return new Promise(function(reject, resolve){
        $.ajax({
            method : 'POST',
            url : url+"user/register",
            data: user
        }).done(function(data){
            resolve(data);
        }).fail(function(err){
            resolve(err);
        });
    })
}

var user_verifyLogin = function(username, pass){
    return callAPI(url+"user/"+ username +"/" + pass)    
}

var user_getUser = function(username){
    return callAPI(url + "user/"+username)
}