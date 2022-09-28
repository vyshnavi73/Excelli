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

    var data = {"OkPercent": 99.44444444444444, "KoPercent": 0.5555555555555556};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.42777777777777776, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.23333333333333334, 500, 1500, "List All the Recent Stories for the user V1"], "isController": false}, {"data": [0.48333333333333334, 500, 1500, "List all the Flicks feed for a user V2"], "isController": false}, {"data": [0.1, 500, 1500, "findPlace"], "isController": false}, {"data": [0.38333333333333336, 500, 1500, "Get Feed on Story V1"], "isController": false}, {"data": [0.48333333333333334, 500, 1500, "List all the Recent Stories for User V2"], "isController": false}, {"data": [1.0, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.4, 500, 1500, "login"], "isController": false}, {"data": [0.48333333333333334, 500, 1500, "List all the flicks feed for a user V1"], "isController": false}, {"data": [0.5833333333333334, 500, 1500, "createStory"], "isController": false}, {"data": [0.25, 500, 1500, "storyDetails"], "isController": false}, {"data": [0.18333333333333332, 500, 1500, "getStory"], "isController": false}, {"data": [0.4666666666666667, 500, 1500, "List all the Explore feed for the user V2"], "isController": false}, {"data": [0.36666666666666664, 500, 1500, "List All the Explore Feed for the user v1"], "isController": false}, {"data": [0.36666666666666664, 500, 1500, "userStories"], "isController": false}, {"data": [0.48333333333333334, 500, 1500, "AllStoriesByAUser"], "isController": false}, {"data": [0.6333333333333333, 500, 1500, "Get Feed on Story V2"], "isController": false}, {"data": [0.6166666666666667, 500, 1500, "delete story"], "isController": false}, {"data": [0.18333333333333332, 500, 1500, "story"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 540, 3, 0.5555555555555556, 6666.070370370371, 15, 34897, 1216.0, 23049.000000000007, 28331.749999999927, 33880.880000000005, 1.796981071799377, 3.9895865570840985, 1.4434734021843303], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["List All the Recent Stories for the user V1", 30, 1, 3.3333333333333335, 11236.7, 215, 30803, 7984.5, 29189.40000000001, 30173.8, 30803.0, 0.11994146856334109, 0.03221865229767873, 0.07308933240578597], "isController": false}, {"data": ["List all the Flicks feed for a user V2", 30, 0, 0.0, 6542.499999999998, 177, 28696, 946.5, 18393.2, 27541.0, 28696.0, 0.11856629634460109, 0.033230983448145034, 0.07190397463866921], "isController": false}, {"data": ["findPlace", 30, 0, 0.0, 8330.8, 978, 31651, 2647.0, 24096.100000000006, 30730.3, 31651.0, 0.13750744832011735, 0.03383972361002888, 0.08513644749507265], "isController": false}, {"data": ["Get Feed on Story V1", 30, 0, 0.0, 6709.700000000001, 194, 32063, 1810.5, 19956.8, 30170.449999999997, 32063.0, 0.12444776305145915, 0.033421030116358656, 0.0811827204281003], "isController": false}, {"data": ["List all the Recent Stories for User V2", 30, 0, 0.0, 5156.666666666666, 223, 24699, 988.0, 18997.700000000004, 24151.2, 24699.0, 0.11960577935125825, 0.03212069269687111, 0.072884771792173], "isController": false}, {"data": ["RegisterDevice", 30, 0, 0.0, 39.96666666666667, 15, 327, 22.0, 54.900000000000006, 205.99999999999983, 327.0, 0.2071708745373184, 0.1060132209546434, 0.09771829336086404], "isController": false}, {"data": ["login", 30, 0, 0.0, 1255.8666666666666, 624, 1969, 1277.0, 1844.0000000000005, 1958.55, 1969.0, 0.20585450203795957, 0.15157645950841944, 0.13187554036806784], "isController": false}, {"data": ["List all the flicks feed for a user V1", 30, 0, 0.0, 5849.000000000001, 165, 34666, 914.0, 24542.400000000016, 34223.8, 34666.0, 0.11813674722280197, 1.8687295229638146, 0.07164347658726564], "isController": false}, {"data": ["createStory", 30, 0, 0.0, 3751.2666666666664, 192, 25078, 451.0, 19764.70000000002, 23545.149999999998, 25078.0, 0.20019752822785147, 0.5751768828577529, 0.7403789447254624], "isController": false}, {"data": ["storyDetails", 30, 1, 3.3333333333333335, 8206.300000000001, 548, 32777, 1705.0, 24557.500000000004, 31043.949999999997, 32777.0, 0.12620154386555327, 0.34603543108344026, 0.08380571272321898], "isController": false}, {"data": ["getStory", 30, 0, 0.0, 7873.666666666667, 556, 28721, 1740.5, 25490.0, 27839.899999999998, 28721.0, 0.17291564598403414, 0.4888581983630652, 0.11482679616127266], "isController": false}, {"data": ["List all the Explore feed for the user V2", 30, 0, 0.0, 6480.3, 165, 34097, 646.5, 23402.100000000006, 31519.699999999997, 34097.0, 0.11828766772205551, 0.03420022997094066, 0.0762400983364811], "isController": false}, {"data": ["List All the Explore Feed for the user v1", 30, 0, 0.0, 11627.066666666666, 180, 31336, 8378.0, 29341.800000000003, 30559.95, 31336.0, 0.11964107676969092, 0.03307265702891326, 0.07711241276171485], "isController": false}, {"data": ["userStories", 30, 1, 3.3333333333333335, 8479.0, 328, 33894, 1336.0, 26664.700000000004, 33314.3, 33894.0, 0.1263956182852328, 0.40632982014956814, 0.08146592584790394], "isController": false}, {"data": ["AllStoriesByAUser", 30, 0, 0.0, 7422.700000000001, 337, 29726, 838.5, 26015.7, 28402.699999999997, 29726.0, 0.12595727529222087, 0.4161469288992174, 0.08118340009068924], "isController": false}, {"data": ["Get Feed on Story V2", 30, 0, 0.0, 5174.000000000002, 201, 33208, 463.0, 19607.100000000002, 27630.449999999993, 33208.0, 0.12494065318973487, 0.033553398073415126, 0.08150425422924111], "isController": false}, {"data": ["delete story", 30, 0, 0.0, 4760.000000000002, 163, 28385, 404.0, 19387.800000000003, 25361.099999999995, 28385.0, 0.11927955150888632, 0.35096610224245556, 0.08619811339509363], "isController": false}, {"data": ["story", 30, 0, 0.0, 11093.766666666668, 515, 34897, 8201.0, 30439.000000000007, 34757.85, 34897.0, 0.14922403501790688, 0.42187849743832073, 0.0990940857540788], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 3, 100.0, 0.5555555555555556], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 540, 3, "502/Bad Gateway", 3, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["List All the Recent Stories for the user V1", 30, 1, "502/Bad Gateway", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["storyDetails", 30, 1, "502/Bad Gateway", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["userStories", 30, 1, "502/Bad Gateway", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
