var Api = function(main){
    var api = {};

    var apikey = "c6ddf72b-6b5c-4a70-94b5-a7a36eeb2e9c";
    var baseURL = "https://cloud.mongodb.com/api/atlas/v1.0/groups/Treeskin/clusters/TS-01";
    var url = "http://localhost:8080/reimaged-treeskin-connector/";

    api.getAllVisitTypes = function(){
        $.ajax({
            method : 'GET',
            url : url + "Types/get.php",
            success : function(data){
                console.log(data);
                Main.populateVisitType(data);
            },
            fail : function (){
                console.log("error occured");
            }
        });
    }
    return api;
}(Main);