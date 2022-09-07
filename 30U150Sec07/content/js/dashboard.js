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

    var data = {"OkPercent": 86.66666666666667, "KoPercent": 13.333333333333334};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4614035087719298, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.3, 500, 1500, "List All the Recent Stories for the user V1"], "isController": false}, {"data": [0.43333333333333335, 500, 1500, "List all the Flicks feed for a user V2"], "isController": false}, {"data": [0.2, 500, 1500, "findPlace"], "isController": false}, {"data": [0.36666666666666664, 500, 1500, "Get Feed on Story V1"], "isController": false}, {"data": [0.45, 500, 1500, "List all the Recent Stories for User V2"], "isController": false}, {"data": [1.0, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.5, 500, 1500, "login"], "isController": false}, {"data": [0.75, 500, 1500, "List all the flicks feed for a user V1"], "isController": false}, {"data": [0.4666666666666667, 500, 1500, "createStory"], "isController": false}, {"data": [0.3, 500, 1500, "storyDetails"], "isController": false}, {"data": [0.21666666666666667, 500, 1500, "getStory"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "List all the Explore feed for the user V2"], "isController": false}, {"data": [0.5666666666666667, 500, 1500, "List All the Explore Feed for the user v1"], "isController": false}, {"data": [0.65, 500, 1500, "userStories"], "isController": false}, {"data": [0.43333333333333335, 500, 1500, "AllStoriesByAUser"], "isController": false}, {"data": [0.5833333333333334, 500, 1500, "Get Feed on Story V2"], "isController": false}, {"data": [0.36666666666666664, 500, 1500, "StoryViews"], "isController": false}, {"data": [0.6333333333333333, 500, 1500, "delete story"], "isController": false}, {"data": [0.21666666666666667, 500, 1500, "story"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 570, 76, 13.333333333333334, 16359.594736842086, 4, 60024, 830.5, 58144.0, 60002.0, 60012.0, 1.175076019172293, 1.7410061427356596, 0.9408942882543937], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["List All the Recent Stories for the user V1", 30, 3, 10.0, 29146.333333333336, 165, 60004, 37364.0, 59861.3, 60003.45, 60004.0, 0.08077457431799334, 0.021826488978309334, 0.0492220062250272], "isController": false}, {"data": ["List all the Flicks feed for a user V2", 30, 2, 6.666666666666667, 16269.666666666673, 148, 60002, 7698.5, 47588.50000000001, 60001.45, 60002.0, 0.10521811715686619, 0.02952409407201128, 0.06380903393985732], "isController": false}, {"data": ["findPlace", 30, 10, 33.333333333333336, 24478.366666666665, 930, 60012, 1855.5, 60010.2, 60011.45, 60012.0, 0.11184973361121779, 0.028981897120615024, 0.06925071397413289], "isController": false}, {"data": ["Get Feed on Story V1", 30, 5, 16.666666666666668, 23910.833333333332, 146, 60012, 15817.5, 57878.9, 60006.5, 60012.0, 0.08643540394145442, 0.023645935375129653, 0.056081721072951486], "isController": false}, {"data": ["List all the Recent Stories for User V2", 30, 2, 6.666666666666667, 21878.1, 176, 60003, 10469.0, 57800.200000000004, 60002.45, 60003.0, 0.08377782121812952, 0.022591649445670086, 0.05105210980479768], "isController": false}, {"data": ["RegisterDevice", 30, 0, 0.0, 38.36666666666667, 17, 401, 22.5, 37.800000000000004, 219.49999999999977, 401.0, 0.2071494168743915, 0.10600224066619252, 0.0977081722171202], "isController": false}, {"data": ["login", 30, 0, 0.0, 799.3999999999999, 507, 1236, 776.5, 1110.2, 1170.0, 1236.0, 0.20651485530192473, 0.15206269618911253, 0.13229857917779553], "isController": false}, {"data": ["List all the flicks feed for a user V1", 30, 0, 0.0, 8055.433333333331, 155, 58652, 225.0, 36063.00000000001, 55965.25, 58652.0, 0.10737716946622809, 0.6510789504060647, 0.06511838109231215], "isController": false}, {"data": ["createStory", 30, 3, 10.0, 17055.63333333333, 166, 60024, 1775.5, 59217.30000000002, 60017.95, 60024.0, 0.1505940936996451, 0.42823724750390285, 0.5569334305083554], "isController": false}, {"data": ["storyDetails", 30, 8, 26.666666666666668, 27809.46666666667, 267, 60003, 19700.0, 60002.0, 60002.45, 60003.0, 0.09482298129774731, 0.25451266025083835, 0.06230166193078554], "isController": false}, {"data": ["getStory", 30, 4, 13.333333333333334, 16631.933333333334, 142, 60002, 2693.0, 55267.200000000004, 59294.7, 60002.0, 0.14376422666826405, 0.44854719510003593, 0.09445758955313285], "isController": false}, {"data": ["List all the Explore feed for the user V2", 30, 7, 23.333333333333332, 24387.133333333335, 149, 60013, 26049.5, 60002.0, 60007.5, 60013.0, 0.08845434871063045, 0.02437389524204058, 0.05669198150272144], "isController": false}, {"data": ["List All the Explore Feed for the user v1", 30, 4, 13.333333333333334, 15385.633333333333, 131, 60001, 186.0, 53916.20000000001, 59689.7, 60001.0, 0.08313381218409151, 0.021855099843708436, 0.05328195403947194], "isController": false}, {"data": ["userStories", 30, 4, 13.333333333333334, 6883.966666666667, 124, 60003, 360.5, 39318.600000000035, 60002.45, 60003.0, 0.1121101369985874, 0.3728720386574437, 0.07572908375187784], "isController": false}, {"data": ["AllStoriesByAUser", 30, 6, 20.0, 23495.400000000005, 135, 60012, 7272.0, 60002.9, 60010.9, 60012.0, 0.09469009510041886, 0.024042406959090726, 0.06430419153596803], "isController": false}, {"data": ["Get Feed on Story V2", 30, 3, 10.0, 8377.699999999999, 149, 48043, 307.0, 39326.5, 43624.299999999996, 48043.0, 0.082153517539776, 0.02238362440781006, 0.05330351274748747], "isController": false}, {"data": ["StoryViews", 30, 6, 20.0, 22247.6, 6, 60012, 7012.0, 59661.50000000001, 60007.05, 60012.0, 0.08642121122208235, 0.02341981065832798, 0.0629001257068535], "isController": false}, {"data": ["delete story", 30, 3, 10.0, 6084.699999999999, 4, 43139, 184.0, 28515.400000000012, 41722.2, 43139.0, 0.10863857755889116, 0.3557701230331891, 0.07812641456481197], "isController": false}, {"data": ["story", 30, 6, 20.0, 17896.633333333335, 158, 60011, 4891.5, 60002.0, 60007.15, 60011.0, 0.12545477355413376, 0.36402303401915276, 0.08242770668673943], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["504/Gateway Time-out", 48, 63.1578947368421, 8.421052631578947], "isController": false}, {"data": ["422/Unprocessable Entity", 28, 36.8421052631579, 4.912280701754386], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 570, 76, "504/Gateway Time-out", 48, "422/Unprocessable Entity", 28, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["List All the Recent Stories for the user V1", 30, 3, "504/Gateway Time-out", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["List all the Flicks feed for a user V2", 30, 2, "504/Gateway Time-out", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["findPlace", 30, 10, "504/Gateway Time-out", 10, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Feed on Story V1", 30, 5, "422/Unprocessable Entity", 3, "504/Gateway Time-out", 2, null, null, null, null, null, null], "isController": false}, {"data": ["List all the Recent Stories for User V2", 30, 2, "504/Gateway Time-out", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["createStory", 30, 3, "504/Gateway Time-out", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["storyDetails", 30, 8, "504/Gateway Time-out", 5, "422/Unprocessable Entity", 3, null, null, null, null, null, null], "isController": false}, {"data": ["getStory", 30, 4, "422/Unprocessable Entity", 3, "504/Gateway Time-out", 1, null, null, null, null, null, null], "isController": false}, {"data": ["List all the Explore feed for the user V2", 30, 7, "504/Gateway Time-out", 4, "422/Unprocessable Entity", 3, null, null, null, null, null, null], "isController": false}, {"data": ["List All the Explore Feed for the user v1", 30, 4, "422/Unprocessable Entity", 3, "504/Gateway Time-out", 1, null, null, null, null, null, null], "isController": false}, {"data": ["userStories", 30, 4, "504/Gateway Time-out", 2, "422/Unprocessable Entity", 2, null, null, null, null, null, null], "isController": false}, {"data": ["AllStoriesByAUser", 30, 6, "504/Gateway Time-out", 6, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Feed on Story V2", 30, 3, "422/Unprocessable Entity", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["StoryViews", 30, 6, "504/Gateway Time-out", 3, "422/Unprocessable Entity", 3, null, null, null, null, null, null], "isController": false}, {"data": ["delete story", 30, 3, "422/Unprocessable Entity", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["story", 30, 6, "504/Gateway Time-out", 4, "422/Unprocessable Entity", 2, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
