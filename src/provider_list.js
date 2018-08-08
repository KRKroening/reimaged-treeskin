var ProviderList = function(){
    var providerList = {};

    var loadProviderTable = function(data){ 
        _.each(data, function(d){
            var html = `<tr><td data-id=`+ d.id +`>` + d.name +`</td>
                    <td>` + d.type +`</td>
                    <td>`+d.pPhone+`</td>
                    <td>`+d.sPhone+`</td>
                    <td>`+d.comp+`</td>
                    <td><label class='iconHover' onclick='window.location.href = "providers_edit.html?mode=`+d.id+`";'>Edit</label> | <label  class='iconHover' onclick="ProviderList.deleteProv(this)">Delete</label></td>
                    </tr>`;
            $("#providerTableBody").append(html);
        });
    }

    var deleteProv = function(i)
    {
        var id = $(i).parent().parent().children()[0].dataset["id"];
        deleteProvider(id);
        location.reload();
    }

    var load = function(){        
        if(document.getElementById("providerTable")){
            $.when(getAllProviders()).then(function(data){
                loadProviderTable(data)
            });
        }
    }
    return providerList = {
        load : load,
        loadProviderTable : loadProviderTable,
        deleteProv : deleteProv
    }
}();