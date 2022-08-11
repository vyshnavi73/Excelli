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

    var data = {"OkPercent": 94.58333333333333, "KoPercent": 5.416666666666667};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.40625, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8, 500, 1500, "GetRequestedOTP"], "isController": false}, {"data": [0.21666666666666667, 500, 1500, "UserName"], "isController": false}, {"data": [0.16666666666666666, 500, 1500, "ResetOTP"], "isController": false}, {"data": [0.2, 500, 1500, "CreateAccount"], "isController": false}, {"data": [1.0, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.0, 500, 1500, "Initv1"], "isController": false}, {"data": [0.23333333333333334, 500, 1500, "VerifyOTP"], "isController": false}, {"data": [0.6333333333333333, 500, 1500, "CreatedAccount-GetRequestedOTP"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 240, 13, 5.416666666666667, 15707.9125, 3, 63398, 1793.0, 53502.8, 60350.899999999965, 63018.23, 0.71649490691537, 0.2778808412993635, 0.34140795727302037], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetRequestedOTP", 30, 1, 3.3333333333333335, 7190.800000000001, 5, 54814, 84.0, 49769.90000000001, 53263.0, 54814.0, 0.10941158449856671, 0.02570032531711124, 0.0638269858658468], "isController": false}, {"data": ["UserName", 30, 8, 26.666666666666668, 9402.999999999998, 3, 57002, 1539.5, 48168.80000000001, 52441.399999999994, 57002.0, 0.11260289089155216, 0.07767840051346918, 0.05242339015400322], "isController": false}, {"data": ["ResetOTP", 30, 1, 3.3333333333333335, 25601.899999999994, 71, 62711, 24444.0, 56426.3, 61992.7, 62711.0, 0.1060842875025637, 0.02491875711648762, 0.06250754192981464], "isController": false}, {"data": ["CreateAccount", 30, 1, 3.3333333333333335, 35669.600000000006, 149, 63398, 39308.5, 62761.8, 63233.55, 63398.0, 0.14834961058227222, 0.03689423909012239, 0.09503646927926815], "isController": false}, {"data": ["RegisterDevice", 30, 0, 0.0, 20.76666666666667, 5, 41, 22.0, 31.400000000000013, 36.599999999999994, 41.0, 0.20702505003105376, 0.10108645021047546, 0.0960321276999517], "isController": false}, {"data": ["Initv1", 30, 1, 3.3333333333333335, 13388.966666666665, 1211, 60796, 2046.5, 41745.40000000001, 56224.399999999994, 60796.0, 0.10862087693254643, 0.07239270294000506, 0.0], "isController": false}, {"data": ["VerifyOTP", 30, 1, 3.3333333333333335, 31977.233333333337, 33, 62002, 44259.0, 57026.1, 59473.1, 62002.0, 0.12181603342631958, 0.03729822950546751, 0.06899736268287632], "isController": false}, {"data": ["CreatedAccount-GetRequestedOTP", 30, 0, 0.0, 2411.033333333333, 4, 13090, 80.5, 7556.800000000001, 10397.199999999997, 13090.0, 0.14846193436003008, 0.034650783507858586, 0.07466591425333545], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 10.10.78.56:4000 failed to respond", 8, 61.53846153846154, 3.3333333333333335], "isController": false}, {"data": ["422/Unprocessable Entity", 2, 15.384615384615385, 0.8333333333333334], "isController": false}, {"data": ["403/Forbidden", 3, 23.076923076923077, 1.25], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 240, 13, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 10.10.78.56:4000 failed to respond", 8, "403/Forbidden", 3, "422/Unprocessable Entity", 2, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GetRequestedOTP", 30, 1, "403/Forbidden", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["UserName", 30, 8, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 10.10.78.56:4000 failed to respond", 7, "403/Forbidden", 1, null, null, null, null, null, null], "isController": false}, {"data": ["ResetOTP", 30, 1, "403/Forbidden", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["CreateAccount", 30, 1, "422/Unprocessable Entity", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Initv1", 30, 1, "422/Unprocessable Entity", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["VerifyOTP", 30, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 10.10.78.56:4000 failed to respond", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
