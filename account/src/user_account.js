var UserAccount = (function () {


    var setNewPassword = function () {
        $("#errors").hide()
        $("#errors").empty()

        var current = $("#c_pass").val()
        var newP = $("#n_pass").val()
        var confirm = $("#cf_pass").val()

        var validated = validateNewPassword();
        if (validated.length < 1) {
            var user = {
                user_id : USER_SESSION.id,
                new_password : newP,
                current_password : current
            }
            var userPromise = user_updateUser ( user )
            $.when().then(function(res){
                Array.from($("input")).forEach(function (i) {
                    $(i).empty();
                    if(res=="ok")$("#msg").append("Password updated!")
                    else $("#errors").append(res)
                });
    
            })
        } else {
            $("#errors").show()

            $("#errors").append("Errors in submitting the Subject: \n")
            validated.forEach(v => {
                $("#errors").append(v + "\n")
            })
        }
        
    }

    var validateNewPassword = function () {
        $("#errors").empty()
        Array.from($("input")).forEach(function (i) {
            $(i).css("border", "1px #ccc solid");
        });
        var flag = [];
        if ($("#c_pass").val() == "") {
            $("#c_pass").css("border", "2px red solid");
            flag.push("Current password is required.");
        }
        if ($("#n_pass").val() == "") {
            $("#n_pass").css("border", "2px red solid");
            flag.push("New password is required.");
        }
        if ($("#cf_pass").val() == "") {
            $("#cf_pass").css("border", "2px red solid");
            flag.push("Confirm new password is required.");
        }
        if ($("#n_pass").val().length < 8) {
            $("#n_pass").css("border", "2px red solid");
            flag.push("New password must be longer than 8 characters");
        }
        if ($("#n_pass").val() != $("#cf_pass").val()) {
            $("#n_pass").css("border", "2px red solid");
            $("#cf_pass").css("border", "2px red solid");
            flag.push("New password does not match confirmation.");
        }
        return flag;
    }

    var load = function () {
        USER_SESSION = GET_USER_SESSION();
        if (!USER_SESSION) location.href = "./account/login.html";
        else {
            $("body").show();

        }

        $(".changepwd button").on("click", setNewPassword);
    }

    return {
        load: load
    }

})()