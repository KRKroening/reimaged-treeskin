var SubjectEdit = function () {

    var subjectEdit = {};
    var subjectModeName = "";
    var id = "";

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }

    var loadToForm = function (data) {
        data = data[0]
        $("#nameInput").val(data.name);
        $("#ageInput").val(data.age);
        $("#genderInput").val(data.gender);
        $("#breedInput").val(data.breed);
        $("#colourInput").val(data.colour);
    }

    var clearForm = function () {
        $("#ageInput").val("");
        $("#genderInput").val("");
        $("#breedInput").val("");
        $("#colourInput").val("");
        if ($("#nameInput").prop("disabled") == false) {
            $("#nameInput").val("");
        }
    }

    var saveForm = function () {
        var validated = validateForm()
        if (validated.length < 1) {
            var age = $("#ageInput").val();
            var gender = $("#genderInput").val();
            var breed = $("#breedInput").val();
            var colour = $("#colourInput").val();
            var name = $("#nameInput").val();

            var collection = {
                age: age,
                gender: gender,
                breed: breed,
                colour: colour,
                name: name
            }

            if ($("#nameInput").prop("disabled")) {                
                updateSubject(id, collection);
            } else {
                collection.id = "S" + Math.random().toString(36).replace(/\./g, "a");
                collection.user = USER_SESSION.id;
                saveSubject(collection);
            }
        }
        else {
            $("#errors").show()

            $("#errors").append("Errors in submitting the Subject: \n")
            validated.forEach(v => {
                $("#errors").append(v + "\n")
            })
        }
    }

    var validateForm = function () {
        $("#errors").empty()
        _.each($("input"), function (i) {
            $(i).css("border", "1px #ccc solid");
        });
        var flag = [];
        if ($("#ageInput").val() == "") {
            $("#ageInput").css("border", "2px red solid");
            flag.push("Age is required.");
        }
        if (!moment($("#ageInput").val()).isValid()) {
            $("#ageInput").css("border", "2px red solid");
            flag.push("Age must be a date.");
        }
        if (moment($("#ageInput").val()) > moment()) {
            $("#ageInput").css("border", "2px red solid");
            flag.push("Age cannot be before today.");
        }
        if ($("#genderInput").val() == "") {
            $("#genderInput").css("border", "2px red solid");
            flag.push("Gender is required.");
        }
        if ($("#breedInput").val() == "") {
            $("#breedInput").css("border", "2px red solid");
            flag.push("Breed is required.");
        }
        if ($("#colourInput").val() == "") {
            $("#colourInput").css("border", "2px red solid");
            flag.push("Colour is required.");
        }
        if ($("#nameInput").val() == "") {
            $("#nameInput").css("border", "2px red solid");
            flag.push("Name is required.");
        }
        return flag;
    }


    var load = function () {
        USER_SESSION = GET_USER_SESSION();
        if (!USER_SESSION) location.href = "./account/login.html";
        else {
            $("body").show();
            $("#errors").hide()
            flatpickr('#ageInput', {
                defaultDate: "today"
            });
            id = getQueryVariable("mode");
            if (id != "new") {
                $("#nameInput").prop("disabled", true);
                $.when(getSubjectById(id)).then(function (data) {
                    loadToForm(data);
                });
            }

            $("#clearBtn").on("click", function () {
                clearForm();
            });
            $("#saveBtn").on("click", function () {
                saveForm();
            });
        }
    }

    return subjectEdit = {
        load: load,
        loadToForm: loadToForm
    }
}();