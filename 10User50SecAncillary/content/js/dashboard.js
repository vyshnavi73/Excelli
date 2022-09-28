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

    var data = {"OkPercent": 85.55555555555556, "KoPercent": 14.444444444444445};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6722222222222223, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.45, 500, 1500, "UserName"], "isController": false}, {"data": [0.0, 500, 1500, "Init V2"], "isController": false}, {"data": [1.0, 500, 1500, "ResetOTP"], "isController": false}, {"data": [0.7, 500, 1500, "CreateAccount"], "isController": false}, {"data": [0.0, 500, 1500, "EmailVerify"], "isController": false}, {"data": [1.0, 500, 1500, "Register Device"], "isController": false}, {"data": [0.9, 500, 1500, "VerifyOTP"], "isController": false}, {"data": [1.0, 500, 1500, "Get Requested OTP2"], "isController": false}, {"data": [1.0, 500, 1500, "Get Requested OTP1"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 90, 13, 14.444444444444445, 626.2111111111109, 10, 4765, 300.0, 1600.8000000000002, 2255.6500000000005, 4765.0, 1.8090815895796901, 0.5503408359967035, 0.8900540086232889], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["UserName", 10, 0, 0.0, 1234.3999999999999, 910, 1605, 1247.5, 1590.3, 1605.0, 1605.0, 0.23873755580490366, 0.07399931661374651, 0.12846132153174017], "isController": false}, {"data": ["Init V2", 10, 1, 10.0, 2370.3999999999996, 1053, 4765, 2099.0, 4596.1, 4765.0, 4765.0, 0.21700447029208803, 0.06010006618636344, 0.0], "isController": false}, {"data": ["ResetOTP", 10, 0, 0.0, 254.20000000000002, 107, 416, 225.0, 409.70000000000005, 416.0, 416.0, 0.24602666929095116, 0.0631884902573439, 0.1270977617723761], "isController": false}, {"data": ["CreateAccount", 10, 1, 10.0, 662.2, 401, 1419, 598.0, 1358.1000000000004, 1419.0, 1419.0, 0.22326412145568209, 0.061484845947756196, 0.14477282875641884], "isController": false}, {"data": ["EmailVerify", 10, 10, 100.0, 616.5, 10, 1035, 592.0, 1034.9, 1035.0, 1035.0, 0.23822002001048168, 0.07690970567916527, 0.14228062913907286], "isController": false}, {"data": ["Register Device", 10, 0, 0.0, 80.10000000000001, 24, 469, 30.5, 429.40000000000015, 469.0, 469.0, 0.22281639928698752, 0.11401932932263814, 0.11423692346256684], "isController": false}, {"data": ["VerifyOTP", 10, 1, 10.0, 45.5, 16, 150, 28.5, 142.8, 150.0, 150.0, 0.22535211267605634, 0.06095950704225352, 0.13371478873239437], "isController": false}, {"data": ["Get Requested OTP2", 10, 0, 0.0, 127.4, 22, 301, 56.5, 297.0, 301.0, 301.0, 0.24050602467591814, 0.061770590322037564, 0.1228365731499074], "isController": false}, {"data": ["Get Requested OTP1", 10, 0, 0.0, 245.2, 21, 345, 259.5, 340.90000000000003, 345.0, 345.0, 0.224069551188689, 0.05754911324475118, 0.11444177272625423], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 1, 7.6923076923076925, 1.1111111111111112], "isController": false}, {"data": ["422/Unprocessable Entity", 12, 92.3076923076923, 13.333333333333334], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 90, 13, "422/Unprocessable Entity", 12, "502/Bad Gateway", 1, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Init V2", 10, 1, "422/Unprocessable Entity", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["CreateAccount", 10, 1, "422/Unprocessable Entity", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["EmailVerify", 10, 10, "422/Unprocessable Entity", 10, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["VerifyOTP", 10, 1, "502/Bad Gateway", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
