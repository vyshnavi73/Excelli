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

    var data = {"OkPercent": 73.5, "KoPercent": 26.5};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3925, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "GetRequestedOTP"], "isController": false}, {"data": [0.21, 500, 1500, "UserName"], "isController": false}, {"data": [0.0, 500, 1500, "ResetOTP"], "isController": false}, {"data": [0.0, 500, 1500, "CreateAccount"], "isController": false}, {"data": [1.0, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.0, 500, 1500, "Initv1"], "isController": false}, {"data": [0.02, 500, 1500, "VerifyOTP"], "isController": false}, {"data": [0.91, 500, 1500, "CreatedAccount-GetRequestedOTP"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 400, 106, 26.5, 22839.2125, 4, 64120, 1989.0, 60078.9, 60088.95, 63300.9, 0.9121653208427496, 0.7317587958391579, 0.31096464048144085], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetRequestedOTP", 50, 0, 0.0, 18.859999999999992, 4, 102, 8.0, 76.79999999999994, 93.59999999999997, 102.0, 0.12233882471537871, 0.028553690534155775, 0.07287762019177833], "isController": false}, {"data": ["UserName", 50, 0, 0.0, 1716.1599999999996, 570, 2687, 1731.0, 2424.9, 2539.4499999999994, 2687.0, 0.12076186243774725, 0.034464303397272716, 0.0752403010110183], "isController": false}, {"data": ["ResetOTP", 50, 34, 68.0, 52619.29999999999, 10599, 60091, 60003.0, 60086.9, 60087.45, 60091.0, 0.11798212806724037, 0.17099112951370127, 0.02271155965294377], "isController": false}, {"data": ["CreateAccount", 50, 33, 66.0, 50103.999999999985, 2361, 60094, 60002.0, 60004.0, 60009.15, 60094.0, 0.16411629937438865, 0.23274704323972142, 0.035801073197510684], "isController": false}, {"data": ["RegisterDevice", 50, 0, 0.0, 59.360000000000014, 15, 100, 61.5, 68.0, 70.89999999999999, 100.0, 0.20419414779572417, 0.09970417372838095, 0.09491837338941865], "isController": false}, {"data": ["Initv1", 50, 0, 0.0, 25000.719999999998, 1678, 64120, 3151.0, 63282.7, 63512.9, 64120.0, 0.12136246356092031, 0.08237003142074183, 0.0], "isController": false}, {"data": ["VerifyOTP", 50, 39, 78.0, 52974.44, 95, 60089, 60003.5, 60087.0, 60088.0, 60089.0, 0.1383160299979806, 0.22560911353947954, 0.017859517076497064], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 50, 0, 0.0, 220.8600000000001, 4, 1003, 91.5, 779.4999999999999, 843.4499999999996, 1003.0, 0.16539587502687683, 0.038603138800218324, 0.08334401515026216], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 10.10.78.197:4000 failed to respond", 106, 100.0, 26.5], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 400, 106, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 10.10.78.197:4000 failed to respond", 106, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["ResetOTP", 50, 34, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 10.10.78.197:4000 failed to respond", 34, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["CreateAccount", 50, 33, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 10.10.78.197:4000 failed to respond", 33, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["VerifyOTP", 50, 39, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 10.10.78.197:4000 failed to respond", 39, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
