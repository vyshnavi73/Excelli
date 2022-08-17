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

    var data = {"OkPercent": 71.0, "KoPercent": 29.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.20875, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.285, 500, 1500, "GetRequestedOTP"], "isController": false}, {"data": [0.155, 500, 1500, "UserName"], "isController": false}, {"data": [0.32, 500, 1500, "ResetOTP"], "isController": false}, {"data": [0.01, 500, 1500, "CreateAccount"], "isController": false}, {"data": [0.335, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.04, 500, 1500, "Initv1"], "isController": false}, {"data": [0.295, 500, 1500, "VerifyOTP"], "isController": false}, {"data": [0.23, 500, 1500, "CreatedAccount-GetRequestedOTP"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 800, 232, 29.0, 13839.917500000001, 3, 49370, 3565.0, 39479.7, 41532.65, 45376.95, 4.011774558328695, 1.3804676882901314, 1.8638395095856337], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetRequestedOTP", 100, 38, 38.0, 15130.040000000006, 3, 40617, 12623.5, 37967.5, 39517.85, 40611.7, 0.7040666891968007, 0.1917481623859412, 0.3426412049749352], "isController": false}, {"data": ["UserName", 100, 43, 43.0, 5726.57, 3, 44024, 1271.5, 22648.200000000015, 29133.299999999996, 43892.26999999993, 0.7053131237612938, 0.21279930623637863, 0.3625337007426947], "isController": false}, {"data": ["ResetOTP", 100, 49, 49.0, 9843.37, 3, 38010, 995.5, 29887.7, 30670.3, 38005.2, 0.7036208328056177, 0.1923276084983324, 0.3465470027511574], "isController": false}, {"data": ["CreateAccount", 100, 26, 26.0, 4768.459999999999, 472, 38206, 3671.5, 4632.9, 4735.85, 38169.93999999998, 1.3023037753786448, 0.3652427941904228, 0.84446260434709], "isController": false}, {"data": ["RegisterDevice", 100, 0, 0.0, 20135.250000000004, 26, 40663, 19260.5, 39939.1, 40288.65, 40660.68, 2.388630120625821, 1.2223068195389943, 1.1266683088498746], "isController": false}, {"data": ["Initv1", 100, 34, 34.0, 16283.839999999998, 405, 49370, 5438.5, 44228.3, 45171.549999999996, 49365.119999999995, 0.7440365470751923, 0.42726879994345324, 0.0], "isController": false}, {"data": ["VerifyOTP", 100, 30, 30.0, 15885.469999999998, 10, 45423, 1991.5, 43875.5, 45370.35, 45422.76, 0.8989006445117621, 0.25216621010004764, 0.5327741984053502], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 100, 12, 12.0, 22946.339999999997, 5, 43668, 33453.5, 39220.4, 39785.2, 43666.75, 0.9523446725839015, 0.24615877728467486, 0.48640260132947316], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 53, 22.844827586206897, 6.625], "isController": false}, {"data": ["422/Unprocessable Entity", 87, 37.5, 10.875], "isController": false}, {"data": ["403/Forbidden", 92, 39.6551724137931, 11.5], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 800, 232, "403/Forbidden", 92, "422/Unprocessable Entity", 87, "502/Bad Gateway", 53, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GetRequestedOTP", 100, 38, "403/Forbidden", 33, "502/Bad Gateway", 5, null, null, null, null, null, null], "isController": false}, {"data": ["UserName", 100, 43, "403/Forbidden", 30, "502/Bad Gateway", 13, null, null, null, null, null, null], "isController": false}, {"data": ["ResetOTP", 100, 49, "403/Forbidden", 29, "502/Bad Gateway", 18, "422/Unprocessable Entity", 2, null, null, null, null], "isController": false}, {"data": ["CreateAccount", 100, 26, "422/Unprocessable Entity", 26, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Initv1", 100, 34, "422/Unprocessable Entity", 32, "502/Bad Gateway", 2, null, null, null, null, null, null], "isController": false}, {"data": ["VerifyOTP", 100, 30, "422/Unprocessable Entity", 27, "502/Bad Gateway", 3, null, null, null, null, null, null], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 100, 12, "502/Bad Gateway", 12, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
