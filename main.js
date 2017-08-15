var Main = function(){

    main = {};


    var populateVisitType = function () {
        var result = api.getAllVisitTypes();
    $.when(result).then(function(res){
        var typeContainer = $("#typesContainer");
        _.each(res, function(r){
            var objHTML = "<a href=\"#\">"+ r.name +"</a>"
            typeContainer.appendTo(objHTML);
        });
    });

    }

    main.load = function () {
        $('#datePicker').datepicker({
            format: 'mm/dd/yyyy',
            startDate: '-3d'
            });
    };

    return main;
}()