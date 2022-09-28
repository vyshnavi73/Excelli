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

    var data = {"OkPercent": 26.444444444444443, "KoPercent": 73.55555555555556};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.15888888888888889, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.03, 500, 1500, "UserName"], "isController": false}, {"data": [0.0, 500, 1500, "Init V2"], "isController": false}, {"data": [0.16, 500, 1500, "ResetOTP"], "isController": false}, {"data": [0.02, 500, 1500, "CreateAccount"], "isController": false}, {"data": [0.0, 500, 1500, "EmailVerify"], "isController": false}, {"data": [0.74, 500, 1500, "Register Device"], "isController": false}, {"data": [0.06, 500, 1500, "VerifyOTP"], "isController": false}, {"data": [0.04, 500, 1500, "Get Requested OTP2"], "isController": false}, {"data": [0.38, 500, 1500, "Get Requested OTP1"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 450, 331, 73.55555555555556, 7078.426666666674, 5, 24990, 2802.0, 17558.0, 20522.05, 22187.77, 5.445766219307056, 1.7314298426476107, 2.6829380362567012], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["UserName", 50, 46, 92.0, 7076.960000000002, 16, 18918, 6853.0, 14823.4, 16883.149999999994, 18918.0, 0.7005941038000224, 0.216390530419796, 0.3769798351502074], "isController": false}, {"data": ["Init V2", 50, 46, 92.0, 10147.98, 1160, 24990, 9498.5, 18658.999999999996, 22856.999999999993, 24990.0, 0.8396869646995601, 0.261008164906123, 0.0], "isController": false}, {"data": ["ResetOTP", 50, 22, 44.0, 6659.04, 10, 21788, 1903.0, 14511.6, 15148.649999999994, 21788.0, 0.7080849135428321, 0.1955807977992721, 0.36579777271890446], "isController": false}, {"data": ["CreateAccount", 50, 48, 96.0, 14590.2, 677, 18540, 16609.0, 17576.7, 17727.649999999998, 18540.0, 2.404539771087814, 0.6999934626574973, 1.5591937578147541], "isController": false}, {"data": ["EmailVerify", 50, 48, 96.0, 1643.26, 5, 13766, 1399.5, 2547.5, 6212.549999999979, 13766.0, 0.713205717057028, 0.23520465883804526, 0.4236330520925456], "isController": false}, {"data": ["Register Device", 50, 0, 0.0, 1257.6799999999998, 36, 15829, 435.0, 1002.6999999999998, 13464.799999999997, 15829.0, 2.9139227227693922, 1.49110889329215, 1.4939545209511045], "isController": false}, {"data": ["VerifyOTP", 50, 47, 94.0, 14316.380000000003, 20, 22281, 11981.5, 21847.1, 22180.85, 22281.0, 1.2755102040816326, 0.34598214285714285, 0.7550422512755102], "isController": false}, {"data": ["Get Requested OTP2", 50, 47, 94.0, 1084.6399999999999, 16, 14348, 267.0, 2034.599999999999, 7670.599999999953, 14348.0, 0.729682004582403, 0.22169791529851293, 0.3805177641084016], "isController": false}, {"data": ["Get Requested OTP1", 50, 27, 54.0, 6929.699999999999, 29, 21815, 9166.0, 14126.699999999999, 21337.499999999996, 21815.0, 1.4590446175844058, 0.376216934401354, 0.7451956396451603], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 13,302 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,133 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,591 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["502/Bad Gateway", 27, 8.157099697885196, 6.0], "isController": false}, {"data": ["The operation lasted too long: It took 13,600 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,461 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 21,749 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 15,246 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 8,518 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,577 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 5,827 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 7,845 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 5,793 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 13,170 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 18,918 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,158 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 14,057 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 14,843 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 9,035 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,426 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 11,951 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,283 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 11,613 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 14,001 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 14,904 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,559 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 13,954 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 14,647 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,504 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 8,073 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["Assertion failed", 26, 7.854984894259819, 5.777777777777778], "isController": false}, {"data": ["The operation lasted too long: It took 13,866 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,201 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,394 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 15,803 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 13,416 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 7,668 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,435 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,574 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,527 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,506 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 16,720 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 9,446 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 7,974 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["422/Unprocessable Entity", 202, 61.027190332326285, 44.888888888888886], "isController": false}, {"data": ["The operation lasted too long: It took 12,381 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,361 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 8,247 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,844 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,535 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,349 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 13,621 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 16,304 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 9,313 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,071 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 14,686 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,503 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 13,212 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 8,450 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,391 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 13,940 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 2,581 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,211 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,571 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 9,704 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 12,012 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 6,238 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 9,086 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 2,141 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 6,038 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 12,413 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,744 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 13,601 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 8,383 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,957 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 13,086 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 10,364 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 15,024 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}, {"data": ["The operation lasted too long: It took 17,523 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 0.3021148036253776, 0.2222222222222222], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 450, 331, "422/Unprocessable Entity", 202, "502/Bad Gateway", 27, "Assertion failed", 26, "The operation lasted too long: It took 13,302 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 10,133 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["UserName", 50, 46, "422/Unprocessable Entity", 18, "The operation lasted too long: It took 10,133 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 17,591 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 13,600 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 15,246 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, {"data": ["Init V2", 50, 46, "422/Unprocessable Entity", 46, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["ResetOTP", 50, 22, "422/Unprocessable Entity", 18, "502/Bad Gateway", 4, null, null, null, null, null, null], "isController": false}, {"data": ["CreateAccount", 50, 48, "422/Unprocessable Entity", 24, "The operation lasted too long: It took 13,302 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 17,506 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 16,720 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 17,461 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, {"data": ["EmailVerify", 50, 48, "422/Unprocessable Entity", 48, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["VerifyOTP", 50, 47, "502/Bad Gateway", 22, "The operation lasted too long: It took 9,446 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 7,974 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "422/Unprocessable Entity", 1, "The operation lasted too long: It took 21,749 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, {"data": ["Get Requested OTP2", 50, 47, "422/Unprocessable Entity", 46, "502/Bad Gateway", 1, null, null, null, null, null, null], "isController": false}, {"data": ["Get Requested OTP1", 50, 27, "Assertion failed", 26, "422/Unprocessable Entity", 1, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
