/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5111111111111111, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "List All the Recent Stories for the user V1"], "isController": false}, {"data": [0.75, 500, 1500, "List all the Flicks feed for a user V2"], "isController": false}, {"data": [0.2, 500, 1500, "findPlace"], "isController": false}, {"data": [0.4, 500, 1500, "Get Feed on Story V1"], "isController": false}, {"data": [0.75, 500, 1500, "List all the Recent Stories for User V2"], "isController": false}, {"data": [1.0, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.4, 500, 1500, "login"], "isController": false}, {"data": [0.65, 500, 1500, "List all the flicks feed for a user V1"], "isController": false}, {"data": [0.7, 500, 1500, "createStory"], "isController": false}, {"data": [0.2, 500, 1500, "storyDetails"], "isController": false}, {"data": [0.35, 500, 1500, "getStory"], "isController": false}, {"data": [0.75, 500, 1500, "List all the Explore feed for the user V2"], "isController": false}, {"data": [0.45, 500, 1500, "List All the Explore Feed for the user v1"], "isController": false}, {"data": [0.45, 500, 1500, "userStories"], "isController": false}, {"data": [0.25, 500, 1500, "AllStoriesByAUser"], "isController": false}, {"data": [0.45, 500, 1500, "Get Feed on Story V2"], "isController": false}, {"data": [0.65, 500, 1500, "delete story"], "isController": false}, {"data": [0.3, 500, 1500, "story"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 180, 0, 0.0, 1681.0833333333333, 20, 10345, 908.5, 5035.300000000002, 6187.199999999997, 9899.499999999998, 1.665741254858412, 3.8550450849065334, 1.3380514875994818], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["List All the Recent Stories for the user V1", 10, 0, 0.0, 1645.1, 184, 5944, 1121.0, 5627.500000000001, 5944.0, 5944.0, 0.15749767690926558, 0.04229673940434379, 0.09597514686658372], "isController": false}, {"data": ["List all the Flicks feed for a user V2", 10, 0, 0.0, 934.1999999999999, 205, 5284, 356.0, 4854.4000000000015, 5284.0, 5284.0, 0.15981078403170645, 0.04479071779013648, 0.09691650086297823], "isController": false}, {"data": ["findPlace", 10, 0, 0.0, 2269.5, 1203, 4710, 1618.0, 4667.3, 4710.0, 4710.0, 0.19409184426070417, 0.047764789798532666, 0.12017014576297505], "isController": false}, {"data": ["Get Feed on Story V1", 10, 0, 0.0, 1379.0, 185, 3569, 1064.5, 3521.7000000000003, 3569.0, 3569.0, 0.16567537566891433, 0.04449289873921039, 0.10807729584651833], "isController": false}, {"data": ["List all the Recent Stories for User V2", 10, 0, 0.0, 743.4, 173, 2601, 326.0, 2474.8, 2601.0, 2601.0, 0.15926610180289227, 0.04277165819901892, 0.09705278078613748], "isController": false}, {"data": ["RegisterDevice", 10, 0, 0.0, 55.3, 20, 327, 25.5, 298.2000000000001, 327.0, 327.0, 0.22316945256533288, 0.11419999330491643, 0.10526449764556228], "isController": false}, {"data": ["login", 10, 0, 0.0, 1166.6999999999998, 607, 1853, 1081.5, 1842.3, 1853.0, 1853.0, 0.2160433815110074, 0.15907881802665977, 0.13840279128048913], "isController": false}, {"data": ["List all the flicks feed for a user V1", 10, 0, 0.0, 644.9000000000001, 173, 1684, 475.5, 1679.7, 1684.0, 1684.0, 0.15944894444798774, 2.522220705242681, 0.09669706494355507], "isController": false}, {"data": ["createStory", 10, 0, 0.0, 991.8, 226, 4129, 299.0, 3912.7000000000007, 4129.0, 4129.0, 0.2115014487849242, 0.6076535764894989, 0.7821835806137772], "isController": false}, {"data": ["storyDetails", 10, 0, 0.0, 4147.6, 554, 9344, 5072.5, 9050.400000000001, 9344.0, 9344.0, 0.16299121477352368, 0.4608003581731945, 0.10823635356054308], "isController": false}, {"data": ["getStory", 10, 0, 0.0, 2007.3, 505, 5362, 1316.0, 5205.700000000001, 5362.0, 5362.0, 0.20930135208673448, 0.5917259905186487, 0.13898917912009712], "isController": false}, {"data": ["List all the Explore feed for the user V2", 10, 0, 0.0, 1035.5, 180, 4182, 334.0, 4044.1000000000004, 4182.0, 4182.0, 0.15618167051914789, 0.05158265719685137, 0.10066396732679452], "isController": false}, {"data": ["List All the Explore Feed for the user v1", 10, 0, 0.0, 1804.9, 130, 4723, 1335.5, 4653.5, 4723.0, 4723.0, 0.15634038428466457, 0.04965028610290324, 0.10076626330847521], "isController": false}, {"data": ["userStories", 10, 0, 0.0, 1922.9, 471, 6406, 1182.0, 6294.6, 6406.0, 6406.0, 0.1800309653260361, 0.7242554313091852, 0.11603558312029669], "isController": false}, {"data": ["AllStoriesByAUser", 10, 0, 0.0, 2123.6000000000004, 515, 5646, 1355.0, 5607.2, 5646.0, 5646.0, 0.1636125654450262, 0.6582050423347513, 0.10545341132198953], "isController": false}, {"data": ["Get Feed on Story V2", 10, 0, 0.0, 3610.2, 176, 10345, 2254.0, 10165.400000000001, 10345.0, 10345.0, 0.16359382924076105, 0.04393388968868094, 0.1067194120437777], "isController": false}, {"data": ["delete story", 10, 0, 0.0, 1725.3, 139, 9795, 332.0, 9081.600000000002, 9795.0, 9795.0, 0.16112659716739444, 0.4740961301419525, 0.11643914248424987], "isController": false}, {"data": ["story", 10, 0, 0.0, 2052.3, 553, 5888, 1406.5, 5647.700000000001, 5888.0, 5888.0, 0.19701716019465296, 0.5569967566050004, 0.13083170794176174], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 180, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
