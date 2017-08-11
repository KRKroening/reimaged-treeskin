var Main = function(){

    main = {};

    main.load = function () {
        $('#datePicker').datepicker({
            format: 'mm/dd/yyyy',
            startDate: '-3d'
            });
    };

    return main;
}()