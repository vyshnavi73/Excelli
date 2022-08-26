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

    var data = {"OkPercent": 75.13888888888889, "KoPercent": 24.86111111111111};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.43916666666666665, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.4625, 500, 1500, "List All the Recent Stories for the user V1"], "isController": false}, {"data": [0.48, 500, 1500, "List all the Flicks feed for a user V2"], "isController": false}, {"data": [0.0025, 500, 1500, "findPlace"], "isController": false}, {"data": [0.325, 500, 1500, "Get Feed on Story V1"], "isController": false}, {"data": [0.415, 500, 1500, "List all the Recent Stories for User V2"], "isController": false}, {"data": [0.975, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.4025, 500, 1500, "login"], "isController": false}, {"data": [0.6675, 500, 1500, "List all the flicks feed for a user V1"], "isController": false}, {"data": [0.6925, 500, 1500, "createStory"], "isController": false}, {"data": [0.1125, 500, 1500, "storyDetails"], "isController": false}, {"data": [0.2275, 500, 1500, "getStory"], "isController": false}, {"data": [0.3175, 500, 1500, "List all the Explore feed for the user V2"], "isController": false}, {"data": [0.375, 500, 1500, "List All the Explore Feed for the user v1"], "isController": false}, {"data": [0.72, 500, 1500, "userStories"], "isController": false}, {"data": [0.5475, 500, 1500, "AllStoriesByAUser"], "isController": false}, {"data": [0.57, 500, 1500, "Get Feed on Story V2"], "isController": false}, {"data": [0.4575, 500, 1500, "delete story"], "isController": false}, {"data": [0.155, 500, 1500, "story"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3600, 895, 24.86111111111111, 16977.840277777777, 2, 60036, 1008.5, 60002.0, 60003.0, 60011.0, 3.1642815894186427, 2.8418354242312773, 2.5434853182827792], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["List All the Recent Stories for the user V1", 200, 39, 19.5, 15947.96500000001, 150, 60032, 1133.0, 60002.0, 60003.0, 60013.97, 0.18132300517495858, 0.04928214080592636, 0.11049370627849038], "isController": false}, {"data": ["List all the Flicks feed for a user V2", 200, 61, 30.5, 22622.179999999986, 130, 60010, 1215.0, 60002.0, 60002.95, 60007.97, 0.1834222931455089, 0.05168155969707808, 0.11123558988609475], "isController": false}, {"data": ["findPlace", 200, 61, 30.5, 25725.505000000005, 1488, 60024, 5246.0, 60003.0, 60009.95, 60012.98, 0.18838671270837926, 0.04860524364995488, 0.11663786704796138], "isController": false}, {"data": ["Get Feed on Story V1", 200, 83, 41.5, 26903.660000000007, 122, 60010, 11857.0, 60002.0, 60003.0, 60009.99, 0.18123690563356798, 0.0502463391844158, 0.11730487921466423], "isController": false}, {"data": ["List all the Recent Stories for User V2", 200, 56, 28.0, 21738.609999999993, 140, 60013, 1655.0, 60002.0, 60002.95, 60011.99, 0.18204491047941526, 0.0497352384333215, 0.11093361732339367], "isController": false}, {"data": ["RegisterDevice", 200, 0, 0.0, 61.339999999999996, 11, 801, 18.5, 67.9, 504.69999999999993, 739.4100000000005, 0.20107211652531298, 0.1028923721281875, 0.09484163308762321], "isController": false}, {"data": ["login", 200, 0, 0.0, 1177.650000000001, 429, 6638, 942.0, 1909.6000000000001, 2764.199999999997, 4948.200000000012, 0.20089357461990937, 0.14792358912442544, 0.12869744624087942], "isController": false}, {"data": ["List all the flicks feed for a user V1", 200, 13, 6.5, 9193.454999999994, 111, 60015, 392.0, 48718.3, 60001.0, 60009.99, 0.18338310656484014, 0.049278837337350646, 0.11121182536793528], "isController": false}, {"data": ["createStory", 200, 29, 14.5, 10587.130000000001, 131, 60013, 301.0, 60009.0, 60010.0, 60011.99, 0.19704064652976938, 0.5351087100955746, 0.7287040316486686], "isController": false}, {"data": ["storyDetails", 200, 107, 53.5, 35242.425000000025, 108, 60011, 50493.0, 60002.0, 60003.0, 60010.0, 0.18536694777564297, 0.33486611524633875, 0.12120536479751905], "isController": false}, {"data": ["getStory", 200, 67, 33.5, 20785.555, 120, 60011, 1769.0, 60002.0, 60003.0, 60011.0, 0.196973308147013, 0.48472265019460964, 0.12879438301065824], "isController": false}, {"data": ["List all the Explore feed for the user V2", 200, 80, 40.0, 24087.934999999998, 119, 60018, 5622.5, 60002.0, 60009.95, 60012.99, 0.18177786018374106, 0.05079129038649609, 0.11620913037244467], "isController": false}, {"data": ["List All the Explore Feed for the user v1", 200, 70, 35.0, 21576.265, 114, 60014, 4192.0, 60002.0, 60002.0, 60010.99, 0.18059114706078877, 0.048678484777069264, 0.11545047417591746], "isController": false}, {"data": ["userStories", 200, 14, 7.0, 7406.139999999999, 107, 60012, 361.0, 43710.30000000002, 60002.95, 60011.99, 0.18643029790629453, 0.046389101471214694, 0.12631016804827053], "isController": false}, {"data": ["AllStoriesByAUser", 200, 32, 16.0, 15070.844999999996, 104, 60036, 600.5, 60002.0, 60009.0, 60011.0, 0.1813822049546363, 0.04577066578152151, 0.12288998647795663], "isController": false}, {"data": ["Get Feed on Story V2", 200, 50, 25.0, 10801.679999999993, 121, 60033, 403.5, 60002.0, 60009.95, 60012.0, 0.18131955304730174, 0.04995583877291992, 0.11735837243036194], "isController": false}, {"data": ["delete story", 200, 44, 22.0, 12398.535000000003, 2, 60015, 635.5, 59991.9, 60007.75, 60011.99, 0.18700222345643688, 0.5379929787677675, 0.13418505249152413], "isController": false}, {"data": ["story", 200, 89, 44.5, 24274.249999999996, 99, 60028, 3689.0, 60002.0, 60010.0, 60014.98, 0.19190708626511388, 0.40325882070936536, 0.12548174675748988], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["504/Gateway Time-out", 715, 79.88826815642459, 19.86111111111111], "isController": false}, {"data": ["502/Bad Gateway", 1, 0.11173184357541899, 0.027777777777777776], "isController": false}, {"data": ["422/Unprocessable Entity", 179, 20.0, 4.972222222222222], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3600, 895, "504/Gateway Time-out", 715, "422/Unprocessable Entity", 179, "502/Bad Gateway", 1, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["List All the Recent Stories for the user V1", 200, 39, "504/Gateway Time-out", 39, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["List all the Flicks feed for a user V2", 200, 61, "504/Gateway Time-out", 61, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["findPlace", 200, 61, "504/Gateway Time-out", 61, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Feed on Story V1", 200, 83, "504/Gateway Time-out", 67, "422/Unprocessable Entity", 16, null, null, null, null, null, null], "isController": false}, {"data": ["List all the Recent Stories for User V2", 200, 56, "504/Gateway Time-out", 56, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["List all the flicks feed for a user V1", 200, 13, "504/Gateway Time-out", 13, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["createStory", 200, 29, "504/Gateway Time-out", 29, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["storyDetails", 200, 107, "504/Gateway Time-out", 91, "422/Unprocessable Entity", 16, null, null, null, null, null, null], "isController": false}, {"data": ["getStory", 200, 67, "504/Gateway Time-out", 44, "422/Unprocessable Entity", 23, null, null, null, null, null, null], "isController": false}, {"data": ["List all the Explore feed for the user V2", 200, 80, "504/Gateway Time-out", 53, "422/Unprocessable Entity", 27, null, null, null, null, null, null], "isController": false}, {"data": ["List All the Explore Feed for the user v1", 200, 70, "504/Gateway Time-out", 48, "422/Unprocessable Entity", 22, null, null, null, null, null, null], "isController": false}, {"data": ["userStories", 200, 14, "504/Gateway Time-out", 14, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["AllStoriesByAUser", 200, 32, "504/Gateway Time-out", 32, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Feed on Story V2", 200, 50, "504/Gateway Time-out", 25, "422/Unprocessable Entity", 25, null, null, null, null, null, null], "isController": false}, {"data": ["delete story", 200, 44, "422/Unprocessable Entity", 24, "504/Gateway Time-out", 20, null, null, null, null, null, null], "isController": false}, {"data": ["story", 200, 89, "504/Gateway Time-out", 62, "422/Unprocessable Entity", 26, "502/Bad Gateway", 1, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
