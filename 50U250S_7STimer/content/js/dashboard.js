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

    var data = {"OkPercent": 45.5, "KoPercent": 54.5};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.26125, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "GetRequestedOTP"], "isController": false}, {"data": [0.0, 500, 1500, "UserName"], "isController": false}, {"data": [0.0, 500, 1500, "ResetOTP"], "isController": false}, {"data": [0.5, 500, 1500, "CreateAccount"], "isController": false}, {"data": [0.68, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.0, 500, 1500, "Initv1"], "isController": false}, {"data": [0.41, 500, 1500, "VerifyOTP"], "isController": false}, {"data": [0.5, 500, 1500, "CreatedAccount-GetRequestedOTP"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 400, 218, 54.5, 11096.307500000003, 7, 60085, 113.5, 44231.700000000055, 55685.95, 60039.89, 1.079636702249693, 0.9511715323418669, 0.4065665106816556], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetRequestedOTP", 50, 50, 100.0, 14856.059999999996, 26, 58688, 3920.5, 40890.9, 55999.75, 58688.0, 0.15949726462191174, 0.12632681787007352, 0.04174342472526596], "isController": false}, {"data": ["UserName", 50, 50, 100.0, 11915.379999999997, 19, 60026, 102.0, 51070.69999999998, 58279.49999999999, 60026.0, 0.16391292945187516, 0.13109512789306318, 0.04738108116968266], "isController": false}, {"data": ["ResetOTP", 50, 50, 100.0, 9861.040000000003, 18, 60046, 104.0, 43850.29999999999, 54026.99999999999, 60046.0, 0.16101348326908893, 0.1286000853773995, 0.04308368595286169], "isController": false}, {"data": ["CreateAccount", 50, 5, 10.0, 12359.54, 96, 59706, 503.5, 49142.899999999994, 55419.19999999998, 59706.0, 0.1608813725111652, 0.12409546962077042, 0.10271898569121073], "isController": false}, {"data": ["RegisterDevice", 50, 2, 4.0, 9150.54, 47, 60085, 97.0, 35224.6, 59903.6, 60085.0, 0.1726191503685419, 0.17404190977197012, 0.08142094690234936], "isController": false}, {"data": ["Initv1", 50, 50, 100.0, 11.84, 7, 33, 11.0, 15.899999999999999, 24.499999999999957, 33.0, 0.15952627078627307, 0.21374027687379557, 0.0], "isController": false}, {"data": ["VerifyOTP", 50, 7, 14.0, 15684.98, 63, 60050, 669.0, 52148.299999999996, 57136.14999999999, 60050.0, 0.15947081205726915, 0.12333136220765015, 0.09302256392387502], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 50, 4, 8.0, 14931.079999999996, 22, 60029, 204.0, 57826.1, 59957.85, 60029.0, 0.16095284081764044, 0.1230911999034283, 0.080602164815709], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 1, 0.45871559633027525, 0.25], "isController": false}, {"data": ["504/Gateway Timeout", 7, 3.2110091743119265, 1.75], "isController": false}, {"data": ["422/Unprocessable Entity", 6, 2.7522935779816513, 1.5], "isController": false}, {"data": ["403/Forbidden", 154, 70.64220183486239, 38.5], "isController": false}, {"data": ["Non HTTP response code: java.io.FileNotFoundException/Non HTTP response message: C:\\\\Users\\\\b2bte\\\\Downloads\\\\1.png (No such file or directory)", 50, 22.93577981651376, 12.5], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 400, 218, "403/Forbidden", 154, "Non HTTP response code: java.io.FileNotFoundException/Non HTTP response message: C:\\\\Users\\\\b2bte\\\\Downloads\\\\1.png (No such file or directory)", 50, "504/Gateway Timeout", 7, "422/Unprocessable Entity", 6, "502/Bad Gateway", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GetRequestedOTP", 50, 50, "403/Forbidden", 50, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["UserName", 50, 50, "403/Forbidden", 49, "504/Gateway Timeout", 1, null, null, null, null, null, null], "isController": false}, {"data": ["ResetOTP", 50, 50, "403/Forbidden", 49, "504/Gateway Timeout", 1, null, null, null, null, null, null], "isController": false}, {"data": ["CreateAccount", 50, 5, "422/Unprocessable Entity", 2, "403/Forbidden", 2, "502/Bad Gateway", 1, null, null, null, null], "isController": false}, {"data": ["RegisterDevice", 50, 2, "504/Gateway Timeout", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Initv1", 50, 50, "Non HTTP response code: java.io.FileNotFoundException/Non HTTP response message: C:\\\\Users\\\\b2bte\\\\Downloads\\\\1.png (No such file or directory)", 50, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["VerifyOTP", 50, 7, "422/Unprocessable Entity", 4, "403/Forbidden", 2, "504/Gateway Timeout", 1, null, null, null, null], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 50, 4, "504/Gateway Timeout", 2, "403/Forbidden", 2, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
