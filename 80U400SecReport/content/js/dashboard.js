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

    var data = {"OkPercent": 65.78125, "KoPercent": 34.21875};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.16953125, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.25, 500, 1500, "GetRequestedOTP"], "isController": false}, {"data": [0.05, 500, 1500, "UserName"], "isController": false}, {"data": [0.1375, 500, 1500, "ResetOTP"], "isController": false}, {"data": [0.025, 500, 1500, "CreateAccount"], "isController": false}, {"data": [0.3875, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.03125, 500, 1500, "Initv1"], "isController": false}, {"data": [0.33125, 500, 1500, "VerifyOTP"], "isController": false}, {"data": [0.14375, 500, 1500, "CreatedAccount-GetRequestedOTP"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 640, 219, 34.21875, 10629.304687499993, 2, 35771, 4749.0, 28252.6, 31128.749999999993, 32446.370000000003, 3.6269870505227964, 1.2342304429599613, 1.7097079903516477], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetRequestedOTP", 80, 46, 57.5, 8936.212499999998, 2, 31675, 95.0, 29658.4, 30656.8, 31675.0, 0.9453582907922102, 0.25262253837563814, 0.476983572184014], "isController": false}, {"data": ["UserName", 80, 70, 87.5, 5931.874999999998, 3, 28677, 10001.5, 10011.8, 10025.8, 28677.0, 0.8361815768294085, 0.23651322408098419, 0.4447624493064919], "isController": false}, {"data": ["ResetOTP", 80, 61, 76.25, 6659.137500000001, 2, 31135, 94.5, 21655.400000000005, 28611.55000000001, 31135.0, 0.9240436148586213, 0.25058140752055996, 0.47164350180766035], "isController": false}, {"data": ["CreateAccount", 80, 8, 10.0, 6319.037500000001, 226, 29407, 3703.0, 19996.8, 20178.7, 29407.0, 1.428545918822878, 0.3917689527865574, 0.9263227442367101], "isController": false}, {"data": ["RegisterDevice", 80, 0, 0.0, 12020.5, 173, 28258, 1235.5, 27691.0, 27869.45, 28258.0, 2.788330835453627, 1.4268411697047856, 1.3151990171133805], "isController": false}, {"data": ["Initv1", 80, 23, 28.75, 11460.849999999999, 15, 35771, 4831.0, 32258.9, 32866.45, 35771.0, 0.8807759636239527, 0.5142733873542591, 0.0], "isController": false}, {"data": ["VerifyOTP", 80, 10, 12.5, 14745.624999999998, 9, 32099, 15299.5, 32022.9, 32087.15, 32099.0, 0.8666637777874073, 0.2376554578151406, 0.5142430775230749], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 80, 1, 1.25, 18961.2, 7, 32091, 22288.0, 27990.500000000004, 30954.800000000003, 32091.0, 1.290634831007502, 0.33170197426796805, 0.6591816568524643], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 131, 59.817351598173516, 20.46875], "isController": false}, {"data": ["504/Gateway Time-out", 55, 25.114155251141554, 8.59375], "isController": false}, {"data": ["422/Unprocessable Entity", 23, 10.502283105022832, 3.59375], "isController": false}, {"data": ["403/Forbidden", 10, 4.566210045662101, 1.5625], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 640, 219, "502/Bad Gateway", 131, "504/Gateway Time-out", 55, "422/Unprocessable Entity", 23, "403/Forbidden", 10, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GetRequestedOTP", 80, 46, "502/Bad Gateway", 39, "403/Forbidden", 6, "504/Gateway Time-out", 1, null, null, null, null], "isController": false}, {"data": ["UserName", 80, 70, "504/Gateway Time-out", 39, "502/Bad Gateway", 30, "403/Forbidden", 1, null, null, null, null], "isController": false}, {"data": ["ResetOTP", 80, 61, "502/Bad Gateway", 43, "504/Gateway Time-out", 15, "403/Forbidden", 3, null, null, null, null], "isController": false}, {"data": ["CreateAccount", 80, 8, "422/Unprocessable Entity", 8, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Initv1", 80, 23, "502/Bad Gateway", 16, "422/Unprocessable Entity", 7, null, null, null, null, null, null], "isController": false}, {"data": ["VerifyOTP", 80, 10, "422/Unprocessable Entity", 8, "502/Bad Gateway", 2, null, null, null, null, null, null], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 80, 1, "502/Bad Gateway", 1, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
