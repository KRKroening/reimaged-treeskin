var Test = (function(){

    var test = {};

    var templateRow = doT.template('{{~it :value:index}}\
        {{? value.additional_attributes && value.additional_attributes.hasOwnProperty("enabled") && value.additional_attributes.enabled == false}}\
        <tr style="color:lightgrey">\
        {{??}}\
        <tr>\
        {{?}}\
        <td>{{=value.id}}</td>\
        <td>{{=value.name}}</td>\
        <td>{{=value.location.latitude}}</td>\
        <td>{{=value.location.longitude}}</td>\
        <td>{{=DateUtil.parseCollectionDate(value.audit.created_date)}}</td>\
        <td><div>{{=value.devicesWithLinks }}</div>\
        </td>\
        <td><div style="display:inline;">\
            <a title="Edit Station: {{=value.id}}" href="station_edit.php?mode=edit&id={{=value.id}}"><i class="zmdi zmdi-edit p-l-15"></i></a>\
            {{? value.additional_attributes && value.additional_attributes.hasOwnProperty("enabled") && value.additional_attributes.enabled == false}}\
            <i title="Station is decomissioned" class="zmdi zmdi-power p-l-15"></i>\
            {{??}}\
            <a title="Decomission Station: {{=value.id}}" class="pointer" onClick="PageStationList.decomissionStation(\'{{=value.id}}\')"><i class="zmdi zmdi-power p-l-15"></i></a>\
            {{?}}\
        </div></td>\
        </tr>{{~}}');

    var tmplActions = doT.template('<div style="display:inline;">\
                        <a title="Edit Station: {{=it.id}}" href="station_edit.php?mode=edit&id={{=it.id}}">Testing</a>\
                        <a title="Decomission Station: {{=it.id}}" class="pointer" onClick="PageStationList.decomissionStation(\'{{=it.id}}\')"><i class="zmdi zmdi-power p-l-15"></i></a>\
                    </div>')

    var tooltip = doT.template('\
        <div class="device-tooltip"><strong>TEST</strong>\
            <span>Created: NOW</span>\
            <span>Type: Blah</span>\
        </div>\
        ');
                


    Array.prototype.compare = function(testArr) {
        if (this.length != testArr.length) return false;
        for (var i = 0; i < testArr.length; i++) {
            if (this[i].compare) { //To test values in nested arrays
                if (!this[i].compare(testArr[i])) return false;
            }
            else if (this[i] !== testArr[i]) return false;
        }
        return true;
    }

    var setMouseOver = function(){    
        $("tr td:nth-child(6) a[href]").on("mouseover", function (e) {
            var deviceid = e.target.textContent
                data = {
                    name: "Device information unavailable.",
                    audit: { created_date: "-" },
                    type: "-"
                }

                var tip = tooltip(data)
                $(tip).insertAfter($(e.currentTarget))
            // If you move too fast over the hover tags, the mouse leave doesn't reliably fire so you end up with all the tooltips staying up.
            setTimeout(function () {
                if (!$(e.target).is(":hover")) {
                    var next = $(e.target).next();
                    // It will delete the next icon depending on the order fired. Safty check
                    if (next[0] && next[0].tagName === "DIV") next.remove();
                }
            }, 250)
        })
    }

    // ({
    //     "draw": 2,
    //     "columns": [
    //       {
    //         "data": "name",
    //         "name": "",
    //         "searchable": true,
    //         "orderable": true,
    //         "search": {
    //           "value": "",
    //           "regex": false
    //         }
    //       },
    //       {
    //         "data": "comp",
    //         "name": "",
    //         "searchable": false,
    //         "orderable": false,
    //         "search": {
    //           "value": "",
    //           "regex": false
    //         }
    //       },
    //       {
    //         "data": "pPhone",
    //         "name": "",
    //         "searchable": false,
    //         "orderable": false,
    //         "search": {
    //           "value": "",
    //           "regex": false
    //         }
    //       },
    //       {
    //         "data": "sPhone",
    //         "name": "",
    //         "searchable": false,
    //         "orderable": false,
    //         "search": {
    //           "value": "",
    //           "regex": false
    //         }
    //       },
    //       {
    //         "data": "type",
    //         "name": "",
    //         "searchable": false,
    //         "orderable": false,
    //         "search": {
    //           "value": "",
    //           "regex": false
    //         }
    //       },
    //       {
    //         "data": "actions",
    //         "name": "",
    //         "searchable": false,
    //         "orderable": false,
    //         "search": {
    //           "value": "",
    //           "regex": false
    //         }
    //       }
    //     ],
    //     "order": [
    //       {
    //         "column": 0,
    //         "dir": "desc"
    //       }
    //     ],
    //     "start": 0,
    //     "length": 10,
    //     "search": {
    //       "value": "",
    //       "regex": false
    //     }
    //   })




    var transformOptions = function(opts){
        var options = {}
        options.order = {
            value : opts.order[0].column,
            column : opts.columns[opts.order[0].column].data
        } 
        options.start = opts.start
        options.length = opts.length
        options.search = {
            value : opts.search.value
        }
        searchableColumns = opts.columns.filter(function(f){
            if(f.searchable) return f.data
        })
        options.search.columns = searchableColumns

        console.log(options)
    }

    var draw = 0;
    var tableData = [];

    async function getData(a,b,c,d){
        transformOptions(a)
        if(b){
            var promise = await getAllProviders();
            console.log("fetch")
            promise = promise.map(p => {
                p.actions = tmplActions(p)
                return p
            })

            b({
                aaData : promise,
                "recordsFiltered": 50,
            })
            setMouseOver()
        }
    
    }

    var renderTable = function(){
        $('#alertTable').dataTable( {
            processing : true,
            serverSide: true,
            "aoColumns": [
                { "mData": "name" , "bSortable": true, "bSearchable": true},
                { "mData": "comp" , "bSortable": false, "bSearchable": false},
                { "mData": "pPhone" ,  "bSortable": false, "bSearchable": false},
                { "mData": "sPhone" ,  "bSortable": false, "bSearchable": false},
                { "mData": "type",  "bSortable": false, "bSearchable": false },
                { "mData": "actions" , "bSortable": false, "bSearchable": false},
            ],
            ajax: getData,
            fnInfoCallback: function ( oSettings, iStart, iEnd, iMax, iTotal, sPre ) {
                return "Showing "+ iStart +" to "+iEnd +" of "+ iTotal +" entries"
            },
            createdRow: function( row, data, dataIndex ) {
                // Set the data-status attribute, and add a class
                if(data.type == "Vet")
                $( row ).addClass('warning ');
            }

        } );

        var dtable = $("#alertTable").dataTable().api();
        
        $(".dataTables_filter input")
        .unbind() // Unbind previous default bindings
        .bind("input", function(e) { // Bind our desired behavior
            // If the length is 3 or more characters, or the user pressed ENTER, search
            if(this.value.length >= 3 || e.keyCode == 13) {
                // Call the API search function
                dtable.search(this.value).draw();
            }
            // Ensure we clear the search if they backspace far enough
            if(this.value == "") {
                dtable.search("").draw();
            }
            return;
        });
    }


    test.load = function () {
        renderTable()
    };
    



    return test

})();