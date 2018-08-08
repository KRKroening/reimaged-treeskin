var DownloadHistory = (function($,moment){

    var downloadHistory = {};

    var gatherCriteria = function(){
        var criteria = {};
        criteria.for = $("#forInput")[0].selectedOptions[0].value;
        criteria.fromDate = $("#datepickerFrom").val()
        criteria.toDate = $("#datepickerTo").val()
        criteria.provider = $("#provDDSearch")[0].selectedOptions[0].value;

        return criteria;        
    }

    var validateCriteria = function(criteria){
        var errorList = [];

        if (criteria.for === "") errorList.push("Must select a subject.");
        if(criteria.fromDate === "") errorList.push("Must select a From Date.")
        if(criteria.toDate === "") errorList.push("Must select a To Date.")
        if(moment(criteria.fromDate) > moment(criteria.toDate)) errorList.push("From date cannot be more recent than the To Date.")

        return errorList;
    }


    var load = function(){
        flatpickr('#datepickerFrom',{
            defaultDate : new Date(new Date().setDate(new Date().getDate()-30))
        });
        flatpickr('#datepickerTo',{
            defaultDate : "today"
        });
        $("#errors").hide()                    

        $("#download").on("click", () => {
            $("#errors").empty()
            $("#errors").hide();           
            var criteria = gatherCriteria();
            var validation = validateCriteria(criteria);
            if(validation.length < 1){
                api_requestDownload(criteria);
            }else{
                $("#errors").show()                            
                $("#errors").append("Errors in requesting hisory: \n")                
                validation.forEach( v => {
                    $("#errors").append(v + "\n")
                })
            }
        })
    }

    return {
        load: load
    }


})(jQuery, moment);