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
        // var jsData = JSON.parse(data)[0]; 
        $("#nameInput").val(data.name);
        // $("#typeInput").val(data.type);
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
                updateProvider(provid,collection);
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