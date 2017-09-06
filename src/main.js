var Main = function($,api,_){

    main = {};


    var populateVisitType = function (data) {
        var typeContainer = $("#typesContainer");
        _.each(data, function(r){
            var objHTML = "<a href=\"#\">"+ r.name +"</a>"
            typeContainer.appendTo(objHTML);
        });
    };

    main.load = function () {
        // $('#datePicker').datepicker({
        //     format: 'mm/dd/yyyy',
        //     startDate: '-3d'
        //     });

        api.getAllVisitTypes();
    };

    return main;
}(jQuery,Api,_)