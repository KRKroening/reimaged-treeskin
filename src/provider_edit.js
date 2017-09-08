
var providerModeName = "";

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var loadToForm = function(data){
    var jsData = JSON.parse(data)[0];
    $("#nameInput").val(jsData.name);
    $("#typeInput").val(jsData.type);
    $("#compInput").val(jsData.comp);
    $("#pPhoneInput").val(jsData.pPhone);
    $("#sPhoneInput").val(jsData.sPhone);
}

var clearForm = function(){
    $("#typeInput").val("");
    $("#pPhpneInput").val("");
    $("#compInput").val("");
    $("#sPhoneInput").val("");
    if($("#nameInput").prop("disabled")==false){
        $("#nameInput").val("");
    }
}

var saveForm = function(){
    if(!validateForm()){
        var type = $("#typeInput").val();
        var name = $("#nameInput").val();
        var pPhone = $("#pPhoneInput").val();
        var sPhone = $("#sPhoneInput").val();
        var comp = $("#compInput").val();
        
        var collection = {
            name : name,
            type : type,
            pPhone : pPhone,
            sPhone : sPhone,
            comp: comp
        }
        if($("#nameInput").prop("disabled"))
        {
            updateProvider(collection);
        } else {
            saveProvider(collection);
        }
    }
    else {
        $("p").text = "Please correct these errors.";
    }
}

var validateForm = function()
{
    _.each($("input"),function(i){
        $(i).css("border","1px #ccc solid");
    });
    var flag = false;
    if($("#typeInput").val() == ""){
        $("#typeInput").css("border","2px red solid");
        flag = true;
    }
    if($("#pPhoneInput").val() == ""){
        $("#pPhoneInput").css("border","2px red solid");
        flag = true;
    }
    if($("#sPhoneInput").val() == ""){
        $("#sPhoneInput").css("border","2px red solid");
        flag = true;
    }
    if($("#compInput").val() == ""){
        $("#compInput").css("border","2px red solid");
        flag = true;
    }
    if($("#nameInput").val() == ""){
        $("#nameInput").css("border","2px red solid");
        flag = true;
    }
    return flag;
}


var load = function(){
    var provName = getQueryVariable("mode");
    if(provName != "new")
        {
            $("#nameInput").prop("disabled", true);
            getAllProvidersByName(provName);
        }

    $("#clearBtn").on("click", function()
    {
        clearForm();
    });
    $("#saveBtn").on("click", function()
    {
        saveForm();
    });
}

load();