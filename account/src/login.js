var Login = function(){

    var setSession = function(user){
        var userObj = user_getUser(user);
        $.when(userObj).then(function(u){
            // Window.setSession({USER_SESSION : u})
            sessionStorage.setItem('USER_SESSION', JSON.stringify(u[0]));
            location.href = "../main.html";
        }).catch(function(err){
            $("#errors").empty();
            $("#errors").append("<li>There was an error logging in.</li>");   
        });
    }

    var verfiyLogin = function(e){
        e.preventDefault();

        var name = $("input[name='username']").val();
        var pass = $("input[name='pass']").val();

        if(name !== "" && pass !== ""){
            var result = user_verifyLogin(name,pass);
            $.when(result).then(function(res){
                if(res){
                    setSession(name);
                }else {
                    $("#errors").empty();
                    $("#errors").append("<li>Log in credentials invalid.</li>");               
                }
            })
        }
    }


    var load = function(){
        $(".login100-form-btn").click(verfiyLogin);
        $(".txt2").click(function(){
            event.preventDefault();
            location.href = "register.html";
        })
    }

    return {
        load: load
    };
}()