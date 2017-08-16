var Api = function(){
    var api = {};
    /**
     * Connect to node red? Or build own api calls. Ajax?
     * W/o Node red wont have to worry about portability.
     */
    var apikey = "c6ddf72b-6b5c-4a70-94b5-a7a36eeb2e9c";
    var baseURL = "https://cloud.mongodb.com/api/atlas/v1.0/groups/Treeskin/clusters/TS-01";

    api.getAllVisitTypes = function(){
        $.ajax({
            method : 'GET',
            url : baseURL,
            username : "kimberlykroening@hotmail.com",
            password: apikey,
            dateType: "json",
            crossDomain : true,
            success : function(data){
                console.log(data);
                return data;
            },
            fail : function (){
                console.log("error occured");
            }
        });
    }
    return api;
}();