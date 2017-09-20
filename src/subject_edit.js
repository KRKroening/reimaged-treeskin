var SubjectEdit = function(){
    
    var subjectEdit = {};
    var subjectModeName = "";

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
        $("#ageInput").val(jsData.age);
        $("#genderInput").val(jsData.gender);
        $("#breedInput").val(jsData.breed);
        $("#colourInput").val(jsData.colour);
    }

    var clearForm = function(){
        $("#ageInput").val("");
        $("#genderInput").val("");
        $("#breedInput").val("");
        $("#colourInput").val("");
        if($("#nameInput").prop("disabled")==false){
            $("#nameInput").val("");
        }
    }

    var saveForm = function(){
        if(!validateForm()){
            var age = $("#ageInput").val();
            var gender = $("#genderInput").val();
            var breed = $("#breedInput").val();
            var colour = $("#colourInput").val();
            var name = $("#nameInput").val();
            
            var collection = {
                age : age,
                gender : gender,
                breed : breed,
                colour : colour,
                name: name
            }

            saveSubject(collection);
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
        if($("#ageInput").val() == ""){
            $("#ageInput").css("border","2px red solid");
            flag = true;
        }
        if($("#genderInput").val() == ""){
            $("#genderInput").css("border","2px red solid");
            flag = true;
        }
        if($("#breedInput").val() == ""){
            $("#breedInput").css("border","2px red solid");
            flag = true;
        }
        if($("#colourInput").val() == ""){
            $("#colourInput").css("border","2px red solid");
            flag = true;
        }
        if($("#nameInput").val() == ""){
            $("#nameInput").css("border","2px red solid");
            flag = true;
        }
        return flag;
    }


    var load = function(){
        var subName = getQueryVariable("mode");
        if(subName != "new")
            {
                $("#nameInput").prop("disabled", true);
                getAllSubjectsByName(subName);
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

    return subjectEdit = {
        load: load,
        loadToForm : loadToForm
    }
}();