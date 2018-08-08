var ProviderEdit = function() {

    var providerEdit = {};
    var provid = ""   
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

    function setSelectedValue(selectObj, valueToSet) {
        for (var i = 0; i < selectObj.options.length; i++) {
            if (selectObj.options[i].text== valueToSet) {
                selectObj.options[i].selected = true;
                return;
            }
        }
    }

    var loadToForm = function(data){
        data = data[0]
        $("#nameInput").val(data.name);        
        setSelectedValue($("#typeInput")[0],data.type )
        $("#compInput").val(data.comp);
        $("#pPhoneInput").val(data.pPhone);
        $("#sPhoneInput").val(data.sPhone);
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
        $("#errors").hide()
        $("#errors").empty()         
        
        var validated = validateForm()
        if(validated.length< 1){
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
                updateProvider(provid,collection);
            } else {
                collection.id = "P" + Math.random().toString(36).replace(/\./g,"a");
                saveProvider(collection);
            }
        }
        else {
            $("#errors").show() 
                
            $("#errors").append("Errors in submitting the Subject: \n")                
            validated.forEach( v => {
                $("#errors").append(v + "\n")
            })
        }
    }

    var validateForm = function(){
        $("#errors").empty()
        _.each($("input"),function(i){
            $(i).css("border","1px #ccc solid");
        });
        var flag = [];
        if($("#typeInput").val() == ""){
            $("#typeInput").css("border","2px red solid");
            flag.push("Type is required.");
        }
        if($("#pPhoneInput").val() == ""){
            $("#pPhoneInput").css("border","2px red solid");
            flag.push("Primary Phone number is required.");
        }
        if(!/(\(\d{3}\).?\d{3}-\d{4}|\b\d{11}\b|\b\d{10}\b|\d-\d{3}-\d{3}-\d{4}|\d{3}-\d{3}-\d{4})/.test($("#pPhoneInput").val())){
            $("#pPhoneInput").css("border","2px red solid");
            flag.push("Phone number is not real or not in a recognized format.");
        }
        if($("#sPhoneInput").val() !== "" &&
                !/(\(\d{3}\)\d{3}-\d{4}|\b\d{11}\b|\b\d{10}\b|\d-\d{3}-\d{3}-\d{4}|\d{3}-\d{3}-\d{4})/.test($("#sPhoneInput").val())){
            $("#sPhoneInput").css("border","2px red solid");
            flag.push("Phone number is not real or not in a recognized format.");
        }
        if($("#compInput").val() == ""){
            $("#compInput").css("border","2px red solid");
            flag.push("Company must be included.");
        }
        if($("#nameInput").val() == ""){
            $("#nameInput").css("border","2px red solid");
            flag.push("Name is required.");
        }
        return flag;
    }


    var load = function(){
        provid = getQueryVariable("mode");
        if(provid != "new")
            {
                $("#nameInput").prop("disabled", true);
                $.when(getAllProvidersById(provid)).then(function(data){
                    loadToForm(data)
                });
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

    return providerEdit = {
        load : load,
        loadToForm : loadToForm
    }
}();