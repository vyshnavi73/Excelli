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

    var data = {"OkPercent": 0.0, "KoPercent": 100.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "GetRequestedOTP"], "isController": false}, {"data": [0.0, 500, 1500, "UserName"], "isController": false}, {"data": [0.0, 500, 1500, "ResetOTP"], "isController": false}, {"data": [0.0, 500, 1500, "CreateAccount"], "isController": false}, {"data": [0.0, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.0, 500, 1500, "Initv1"], "isController": false}, {"data": [0.0, 500, 1500, "VerifyOTP"], "isController": false}, {"data": [0.0, 500, 1500, "CreatedAccount-GetRequestedOTP"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 8, 8, 100.0, 130234.12499999999, 130161, 130441, 130211.0, 130441.0, 130441.0, 130441.0, 0.007333031456871693, 0.018916213470045483, 0.0], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetRequestedOTP", 1, 1, 100.0, 130211.0, 130211, 130211, 130211.0, 130211.0, 130211.0, 130211.0, 0.00767984271682116, 0.02040708206295935, 0.0], "isController": false}, {"data": ["UserName", 1, 1, 100.0, 130209.0, 130209, 130209, 130209.0, 130209.0, 130209.0, 130209.0, 0.007679960678601325, 0.020407395514134966, 0.0], "isController": false}, {"data": ["ResetOTP", 1, 1, 100.0, 130216.0, 130216, 130216, 130216.0, 130216.0, 130216.0, 130216.0, 0.007679547828223874, 0.020406298477145663, 0.0], "isController": false}, {"data": ["CreateAccount", 1, 1, 100.0, 130161.0, 130161, 130161, 130161.0, 130161.0, 130161.0, 130161.0, 0.0076827928488564165, 0.020414921232166316, 0.0], "isController": false}, {"data": ["RegisterDevice", 1, 1, 100.0, 130441.0, 130441, 130441, 130441.0, 130441.0, 130441.0, 130441.0, 0.007666301239640911, 0.020371099290100506, 0.0], "isController": false}, {"data": ["Initv1", 1, 1, 100.0, 130211.0, 130211, 130211, 130211.0, 130211.0, 130211.0, 130211.0, 0.00767984271682116, 0.015637179750558707, 0.0], "isController": false}, {"data": ["VerifyOTP", 1, 1, 100.0, 130211.0, 130211, 130211, 130211.0, 130211.0, 130211.0, 130211.0, 0.00767984271682116, 0.02040708206295935, 0.0], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 1, 1, 100.0, 130213.0, 130213, 130213, 130213.0, 130213.0, 130213.0, 130213.0, 0.007679724758664649, 0.02040676862141261, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection timed out (Connection timed out)", 1, 12.5, 12.5], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 10.10.78.154:4000 [/10.10.78.154] failed: Connection timed out (Connection timed out)", 7, 87.5, 87.5], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 8, 8, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 10.10.78.154:4000 [/10.10.78.154] failed: Connection timed out (Connection timed out)", 7, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection timed out (Connection timed out)", 1, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GetRequestedOTP", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 10.10.78.154:4000 [/10.10.78.154] failed: Connection timed out (Connection timed out)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["UserName", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 10.10.78.154:4000 [/10.10.78.154] failed: Connection timed out (Connection timed out)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["ResetOTP", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 10.10.78.154:4000 [/10.10.78.154] failed: Connection timed out (Connection timed out)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["CreateAccount", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 10.10.78.154:4000 [/10.10.78.154] failed: Connection timed out (Connection timed out)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["RegisterDevice", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 10.10.78.154:4000 [/10.10.78.154] failed: Connection timed out (Connection timed out)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Initv1", 1, 1, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection timed out (Connection timed out)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["VerifyOTP", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 10.10.78.154:4000 [/10.10.78.154] failed: Connection timed out (Connection timed out)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 10.10.78.154:4000 [/10.10.78.154] failed: Connection timed out (Connection timed out)", 1, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
