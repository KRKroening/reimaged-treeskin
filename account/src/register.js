var Register = function () {

    var verifyRegister = function () {
        var email = $("input[name='email']").val()
        var username = $("input[name='user']").val()
        var password = $("input[name='pass']").val()
        var c_pass = $("input[name='c_pass']").val()

        try {

            if ([email, username, password, c_pass].includes(undefined)) {
                throw new Error("All field are required.")
            }
            if (password !== c_pass) {
                throw new Error("Passwords do not match.")
            }
        } catch (err) {
            $("#errors").empty()
            $("#errors").append(`<li>${err}</li>`)
        }

        var result = user_registerUser({ email, username, password })
        $.when(result).then(function (res) {
            if (res == "ok") {
                location.href = "login.html";
            } else {
                parseErrorMessages(res);
            }
        }).catch(function(err){ // idk wtf its catching instad of going to then.
            if (err == "ok") {
                location.href = "login.html";
            } else {
                parseErrorMessages(err);
            }
        })
    }

    var parseErrorMessages = function (error) {
        if (error.responseText.includes("11000")) { //Duplicate error
            var dup_key = error.responseText.match(/.*index: (.*)_\d.*/)
            $("#errors").empty()
            $("#errors").append(`<li>That ${dup_key[1]} already exists.</li>`)
        }
    }

    var load = function () {
        $("button").click(function (e) {
            e.preventDefault();
            verifyRegister()
        })
    }

    return {
        load: load
    };

}()