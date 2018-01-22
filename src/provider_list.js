var ProviderList = function(){
    var providerList = {};

    var loadProviderTable = function(data){
        data = JSON.parse(data);
        _.each(data, function(d){
            var html = `<tr><td>` + d.name +`</td>
                    <td>` + d.type +`</td>
                    <td>`+d.pPhone+`</td>
                    <td>`+d.sPhone+`</td>
                    <td>`+d.comp+`</td>
                    <td><label class='iconHover' onclick='window.location.href = "providers_edit.html?mode=`+d.name+`";'>Edit</label> | <label  class='iconHover' onclick="ProviderList.deleteProv(this)">Delete</label></td>
                    </tr>`;
            $("#providerTableBody").append(html);
        });
    }

    var deleteProv = function(i)
    {
        var name = $(i).parent().parent().children()[0].innerHTML;
        deleteProvider(name);
        location.reload();
    }


    var load = function(){
        var test = $("#providerTableBody");
        if(document.getElementById("providerTable")){
            getAllProviders();
        }
    }
    return providerList = {
        load : load,
        loadProviderTable : loadProviderTable,
        deleteProv : deleteProv
    }
}();