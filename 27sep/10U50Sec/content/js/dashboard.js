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

    var data = {"OkPercent": 95.65217391304348, "KoPercent": 4.3478260869565215};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.908695652173913, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Disconnect Sampler l1o1adtrial555202"], "isController": false}, {"data": [1.0, 500, 1500, "Disconnect Sampler l1o1adtrial555203"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555212-1"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555212-0"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555212-3"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555212-2"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555212-4"], "isController": false}, {"data": [1.0, 500, 1500, "Log-In Sampler l1o1adtrial555202"], "isController": false}, {"data": [1.0, 500, 1500, "Log-In Sampler l1o1adtrial555204"], "isController": false}, {"data": [1.0, 500, 1500, "Log-In Sampler l1o1adtrial555203"], "isController": false}, {"data": [1.0, 500, 1500, "Log-In Sampler l1o1adtrial555206"], "isController": false}, {"data": [1.0, 500, 1500, "Log-In Sampler l1o1adtrial555205"], "isController": false}, {"data": [1.0, 500, 1500, "Get Contacts List Sampler l1o1adtrial555206"], "isController": false}, {"data": [1.0, 500, 1500, "Get Contacts List Sampler l1o1adtrial555205"], "isController": false}, {"data": [1.0, 500, 1500, "Set Presence Sampler l1o1adtrial555205"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-11"], "isController": false}, {"data": [1.0, 500, 1500, "Get Contacts List Sampler l1o1adtrial555204"], "isController": false}, {"data": [1.0, 500, 1500, "Set Presence Sampler l1o1adtrial555204"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-10"], "isController": false}, {"data": [1.0, 500, 1500, "Get Contacts List Sampler l1o1adtrial555203"], "isController": false}, {"data": [1.0, 500, 1500, "Set Presence Sampler l1o1adtrial555203"], "isController": false}, {"data": [0.5, 500, 1500, "Get Contacts List Sampler l1o1adtrial555202"], "isController": false}, {"data": [1.0, 500, 1500, "Set Presence Sampler l1o1adtrial555202"], "isController": false}, {"data": [1.0, 500, 1500, "Set Presence Sampler l1o1adtrial555206"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-1"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-0"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-3"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-2"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-5"], "isController": false}, {"data": [1.0, 500, 1500, "Log-In Sampler l1o1adtrial555211"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-4"], "isController": false}, {"data": [1.0, 500, 1500, "Log-In Sampler l1o1adtrial555210"], "isController": false}, {"data": [1.0, 500, 1500, "Log-In Sampler l1o1adtrial555212"], "isController": false}, {"data": [1.0, 500, 1500, "Disconnect Sampler l1o1adtrial555212"], "isController": false}, {"data": [1.0, 500, 1500, "Disconnect Sampler l1o1adtrial555210"], "isController": false}, {"data": [1.0, 500, 1500, "Disconnect Sampler l1o1adtrial555211"], "isController": false}, {"data": [1.0, 500, 1500, "Get Contacts List Sampler l1o1adtrial555212"], "isController": false}, {"data": [1.0, 500, 1500, "Get Contacts List Sampler l1o1adtrial555211"], "isController": false}, {"data": [1.0, 500, 1500, "Get Contacts List Sampler l1o1adtrial555210"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555211-0"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555211-2"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555211-1"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555211-4"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555211-3"], "isController": false}, {"data": [1.0, 500, 1500, "Send Message Sampler l1o1adtrial555212"], "isController": false}, {"data": [1.0, 500, 1500, "Send Message Sampler l1o1adtrial555211"], "isController": false}, {"data": [1.0, 500, 1500, "Connect Sampler l1o1adtrial555204"], "isController": false}, {"data": [1.0, 500, 1500, "Connect Sampler l1o1adtrial555203"], "isController": false}, {"data": [1.0, 500, 1500, "Connect Sampler l1o1adtrial555202"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555209"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555206"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555207"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555211"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555212"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555210"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-0"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-2"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-1"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-4"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-3"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-6"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-5"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-7"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-6"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-9"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-8"], "isController": false}, {"data": [1.0, 500, 1500, "Set Presence Sampler l1o1adtrial555212"], "isController": false}, {"data": [1.0, 500, 1500, "Set Presence Sampler l1o1adtrial555211"], "isController": false}, {"data": [1.0, 500, 1500, "Set Presence Sampler l1o1adtrial555210"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555210-1"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555210-0"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555210-3"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555210-2"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555210-4"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202"], "isController": false}, {"data": [0.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555205"], "isController": false}, {"data": [0.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555204"], "isController": false}, {"data": [0.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555206"], "isController": false}, {"data": [1.0, 500, 1500, "Send Message Sampler l1o1adtrial555203"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-8"], "isController": false}, {"data": [1.0, 500, 1500, "Connect Sampler l1o1adtrial555211"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555212"], "isController": false}, {"data": [1.0, 500, 1500, "Send Message Sampler l1o1adtrial555202"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-7"], "isController": false}, {"data": [1.0, 500, 1500, "Connect Sampler l1o1adtrial555210"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555211"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555202-9"], "isController": false}, {"data": [1.0, 500, 1500, "RegisterDevices API"], "isController": false}, {"data": [1.0, 500, 1500, "Send Message Sampler l1o1adtrial555206"], "isController": false}, {"data": [1.0, 500, 1500, "Send Message Sampler l1o1adtrial555205"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555210"], "isController": false}, {"data": [1.0, 500, 1500, "Send Message Sampler l1o1adtrial555204"], "isController": false}, {"data": [1.0, 500, 1500, "Connect Sampler l1o1adtrial555212"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-12"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-11"], "isController": false}, {"data": [1.0, 500, 1500, "Collect Packages Sampler l1o1adtrial555203-10"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555204"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555205"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555202"], "isController": false}, {"data": [0.5, 500, 1500, "Login  API l1o1adtrial555203"], "isController": false}, {"data": [0.0, 500, 1500, "Connect Sampler l1o1adtrial555207"], "isController": false}, {"data": [1.0, 500, 1500, "Connect Sampler l1o1adtrial555206"], "isController": false}, {"data": [1.0, 500, 1500, "Connect Sampler l1o1adtrial555205"], "isController": false}, {"data": [1.0, 500, 1500, "Send Message Sampler l1o1adtrial555210"], "isController": false}, {"data": [0.0, 500, 1500, "Connect Sampler l1o1adtrial555209"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 115, 5, 4.3478260869565215, 78.03478260869566, 0, 766, 1.0, 440.80000000000143, 682.5999999999999, 758.8000000000002, 6.909903159098861E-8, 4.097356638871903E-8, 6.683406673075411E-9], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Disconnect Sampler l1o1adtrial555202", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Disconnect Sampler l1o1adtrial555203", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555212-1", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555212-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555212-3", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555212-2", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555212-4", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Log-In Sampler l1o1adtrial555202", 1, 0, 0.0, 25.0, 25, 25, 25.0, 25.0, 25.0, 25.0, 40.0, 0.0, 0.0], "isController": false}, {"data": ["Log-In Sampler l1o1adtrial555204", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 0.0, 0.0], "isController": false}, {"data": ["Log-In Sampler l1o1adtrial555203", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 13.0, 76.92307692307693, 0.0, 0.0], "isController": false}, {"data": ["Log-In Sampler l1o1adtrial555206", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 0.0, 0.0], "isController": false}, {"data": ["Log-In Sampler l1o1adtrial555205", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 0.0, 0.0], "isController": false}, {"data": ["Get Contacts List Sampler l1o1adtrial555206", 1, 0, 0.0, 52.0, 52, 52, 52.0, 52.0, 52.0, 52.0, 19.230769230769234, 6.441556490384616, 0.0], "isController": false}, {"data": ["Get Contacts List Sampler l1o1adtrial555205", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 5.431058114035087, 0.0], "isController": false}, {"data": ["Set Presence Sampler l1o1adtrial555205", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-11", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Get Contacts List Sampler l1o1adtrial555204", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 81.0, 12.345679012345679, 4.557291666666667, 0.0], "isController": false}, {"data": ["Set Presence Sampler l1o1adtrial555204", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-10", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Get Contacts List Sampler l1o1adtrial555203", 1, 0, 0.0, 248.0, 248, 248, 248.0, 248.0, 248.0, 248.0, 4.032258064516129, 7.095829133064516, 0.0], "isController": false}, {"data": ["Set Presence Sampler l1o1adtrial555203", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Get Contacts List Sampler l1o1adtrial555202", 1, 0, 0.0, 592.0, 592, 592, 592.0, 592.0, 592.0, 592.0, 1.6891891891891893, 10.242359058277028, 0.0], "isController": false}, {"data": ["Set Presence Sampler l1o1adtrial555202", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Set Presence Sampler l1o1adtrial555206", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-1", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-3", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-2", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-5", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Log-In Sampler l1o1adtrial555211", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 0.0, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-4", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Log-In Sampler l1o1adtrial555210", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 0.0, 0.0], "isController": false}, {"data": ["Log-In Sampler l1o1adtrial555212", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 10.0, 100.0, 0.0, 0.0], "isController": false}, {"data": ["Disconnect Sampler l1o1adtrial555212", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Disconnect Sampler l1o1adtrial555210", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Disconnect Sampler l1o1adtrial555211", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Get Contacts List Sampler l1o1adtrial555212", 1, 0, 0.0, 90.0, 90, 90, 90.0, 90.0, 90.0, 90.0, 11.11111111111111, 4.763454861111112, 0.0], "isController": false}, {"data": ["Get Contacts List Sampler l1o1adtrial555211", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 67.0, 14.925373134328359, 3.0025652985074625, 0.0], "isController": false}, {"data": ["Get Contacts List Sampler l1o1adtrial555210", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 50.0, 20.0, 5.21484375, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555211-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555211-2", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555211-1", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555211-4", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555211-3", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Send Message Sampler l1o1adtrial555212", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Send Message Sampler l1o1adtrial555211", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555204", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 3.125, 0.0], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555203", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 1.953125, 0.0], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555202", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 101.0, 9.900990099009901, 0.1547029702970297, 0.0], "isController": false}, {"data": ["Login  API l1o1adtrial555209", 1, 0, 0.0, 676.0, 676, 676, 676.0, 676.0, 676.0, 676.0, 1.4792899408284024, 1.0892427884615383, 0.9476701183431953], "isController": false}, {"data": ["Login  API l1o1adtrial555206", 1, 0, 0.0, 680.0, 680, 680, 680.0, 680.0, 680.0, 680.0, 1.4705882352941175, 1.0828354779411764, 0.942095588235294], "isController": false}, {"data": ["Login  API l1o1adtrial555207", 1, 0, 0.0, 650.0, 650, 650, 650.0, 650.0, 650.0, 650.0, 1.5384615384615385, 1.1328125, 0.985576923076923], "isController": false}, {"data": ["Login  API l1o1adtrial555211", 1, 0, 0.0, 639.0, 639, 639, 639.0, 639.0, 639.0, 639.0, 1.5649452269170578, 1.1523131846635368, 1.0025430359937402], "isController": false}, {"data": ["Login  API l1o1adtrial555212", 1, 0, 0.0, 693.0, 693, 693, 693.0, 693.0, 693.0, 693.0, 1.443001443001443, 1.062522546897547, 0.9244227994227995], "isController": false}, {"data": ["Login  API l1o1adtrial555210", 1, 0, 0.0, 766.0, 766, 766, 766.0, 766.0, 766.0, 766.0, 1.3054830287206267, 0.9612638707571801, 0.8363250652741514], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-2", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-1", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-4", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-3", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-6", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-5", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-7", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-6", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-9", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-8", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Set Presence Sampler l1o1adtrial555212", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Set Presence Sampler l1o1adtrial555211", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Set Presence Sampler l1o1adtrial555210", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555210-1", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555210-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555210-3", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555210-2", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555210-4", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 1912.109375, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 1362.1826171875, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555205", 1, 1, 100.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 924.8046875, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555204", 1, 1, 100.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 462.40234375, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555206", 1, 1, 100.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 924.8046875, 0.0], "isController": false}, {"data": ["Send Message Sampler l1o1adtrial555203", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-8", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555211", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 2.232142857142857, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555212", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Send Message Sampler l1o1adtrial555202", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-7", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555210", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 3.125, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555211", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555202-9", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["RegisterDevices API", 10, 0, 0.0, 59.3, 23, 340, 26.5, 309.7000000000001, 340.0, 340.0, 0.22308481684736536, 0.11415668362111274, 0.10522457669656003], "isController": false}, {"data": ["Send Message Sampler l1o1adtrial555206", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Send Message Sampler l1o1adtrial555205", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555210", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Send Message Sampler l1o1adtrial555204", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555212", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 3.125, 0.0], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-12", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-11", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555203-10", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Login  API l1o1adtrial555204", 1, 0, 0.0, 712.0, 712, 712, 712.0, 712.0, 712.0, 712.0, 1.4044943820224718, 1.0341687148876404, 0.8997542134831461], "isController": false}, {"data": ["Login  API l1o1adtrial555205", 1, 0, 0.0, 721.0, 721, 721, 721.0, 721.0, 721.0, 721.0, 1.3869625520110958, 1.021259535367545, 0.8885228848821082], "isController": false}, {"data": ["Login  API l1o1adtrial555202", 1, 0, 0.0, 618.0, 618, 618, 618.0, 618.0, 618.0, 618.0, 1.6181229773462784, 1.1914694579288025, 1.0366100323624596], "isController": false}, {"data": ["Login  API l1o1adtrial555203", 1, 0, 0.0, 719.0, 719, 719, 719.0, 719.0, 719.0, 719.0, 1.3908205841446453, 1.0241003129346316, 0.8909944367176634], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555207", 1, 1, 100.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 139.75694444444446, 0.0], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555206", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 3.125, 0.0], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555205", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 1.953125, 0.0], "isController": false}, {"data": ["Send Message Sampler l1o1adtrial555210", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, NaN, NaN], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555209", 1, 1, 100.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 419.2708333333333, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/org.jivesoftware.smack.SmackException$NotConnectedException", 3, 60.0, 2.608695652173913], "isController": false}, {"data": ["500/org.jivesoftware.smack.SmackException$ConnectionException", 2, 40.0, 1.7391304347826086], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 115, 5, "500/org.jivesoftware.smack.SmackException$NotConnectedException", 3, "500/org.jivesoftware.smack.SmackException$ConnectionException", 2, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555205", 1, 1, "500/org.jivesoftware.smack.SmackException$NotConnectedException", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555204", 1, 1, "500/org.jivesoftware.smack.SmackException$NotConnectedException", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Collect Packages Sampler l1o1adtrial555206", 1, 1, "500/org.jivesoftware.smack.SmackException$NotConnectedException", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555207", 1, 1, "500/org.jivesoftware.smack.SmackException$ConnectionException", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Connect Sampler l1o1adtrial555209", 1, 1, "500/org.jivesoftware.smack.SmackException$ConnectionException", 1, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
