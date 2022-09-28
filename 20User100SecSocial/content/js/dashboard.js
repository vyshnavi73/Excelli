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

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4263888888888889, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.45, 500, 1500, "List All the Recent Stories for the user V1"], "isController": false}, {"data": [0.45, 500, 1500, "List all the Flicks feed for a user V2"], "isController": false}, {"data": [0.125, 500, 1500, "findPlace"], "isController": false}, {"data": [0.425, 500, 1500, "Get Feed on Story V1"], "isController": false}, {"data": [0.375, 500, 1500, "List all the Recent Stories for User V2"], "isController": false}, {"data": [1.0, 500, 1500, "RegisterDevice"], "isController": false}, {"data": [0.375, 500, 1500, "login"], "isController": false}, {"data": [0.5, 500, 1500, "List all the flicks feed for a user V1"], "isController": false}, {"data": [0.625, 500, 1500, "createStory"], "isController": false}, {"data": [0.25, 500, 1500, "storyDetails"], "isController": false}, {"data": [0.225, 500, 1500, "getStory"], "isController": false}, {"data": [0.475, 500, 1500, "List all the Explore feed for the user V2"], "isController": false}, {"data": [0.425, 500, 1500, "List All the Explore Feed for the user v1"], "isController": false}, {"data": [0.4, 500, 1500, "userStories"], "isController": false}, {"data": [0.25, 500, 1500, "AllStoriesByAUser"], "isController": false}, {"data": [0.45, 500, 1500, "Get Feed on Story V2"], "isController": false}, {"data": [0.625, 500, 1500, "delete story"], "isController": false}, {"data": [0.25, 500, 1500, "story"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 360, 0, 0.0, 3689.694444444442, 16, 19670, 1121.0, 11833.700000000003, 14404.04999999999, 18802.519999999997, 1.8359197703060375, 4.132582492082596, 1.4747519595893661], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["List All the Recent Stories for the user V1", 20, 0, 0.0, 4527.450000000001, 172, 19670, 709.0, 13416.400000000001, 19362.749999999996, 19670.0, 0.13637541424032076, 0.03662425675399239, 0.08310376805269547], "isController": false}, {"data": ["List all the Flicks feed for a user V2", 20, 0, 0.0, 3084.25, 163, 13187, 1151.5, 10874.900000000005, 13085.05, 13187.0, 0.13397552267200782, 0.03754978028014282, 0.08124882771417662], "isController": false}, {"data": ["findPlace", 20, 0, 0.0, 4314.950000000001, 1013, 13588, 2125.0, 12597.400000000005, 13549.0, 13588.0, 0.16271274691659346, 0.04004259006150542, 0.10074207182140649], "isController": false}, {"data": ["Get Feed on Story V1", 20, 0, 0.0, 3132.5, 197, 12318, 1014.5, 11027.800000000001, 12256.199999999999, 12318.0, 0.13610256689441164, 0.03655098232027656, 0.08878565887252633], "isController": false}, {"data": ["List all the Recent Stories for User V2", 20, 0, 0.0, 4558.5, 250, 15857, 1321.5, 15085.200000000004, 15827.949999999999, 15857.0, 0.13300702277080229, 0.0357196594355182, 0.08105115450095765], "isController": false}, {"data": ["RegisterDevice", 20, 0, 0.0, 49.55000000000001, 16, 384, 27.0, 76.10000000000002, 368.6499999999998, 384.0, 0.21093041405640278, 0.10793704781792487, 0.09949159178636968], "isController": false}, {"data": ["login", 20, 0, 0.0, 1278.1499999999999, 689, 2303, 1234.5, 2152.8000000000006, 2296.85, 2303.0, 0.20968536710665647, 0.15439723320158102, 0.13432968830270178], "isController": false}, {"data": ["List all the flicks feed for a user V1", 20, 0, 0.0, 3288.2499999999995, 193, 16926, 717.5, 15476.000000000011, 16877.2, 16926.0, 0.13352828462889152, 2.112198392987094, 0.08097760229935706], "isController": false}, {"data": ["createStory", 20, 0, 0.0, 2410.1000000000004, 206, 15328, 519.5, 13769.200000000019, 15292.75, 15328.0, 0.1823203916242012, 0.5238150314046874, 0.6742649639461425], "isController": false}, {"data": ["storyDetails", 20, 0, 0.0, 3544.6000000000004, 531, 12739, 1429.0, 11965.5, 12701.699999999999, 12739.0, 0.14410363933741147, 0.4074023787908264, 0.09569382299749982], "isController": false}, {"data": ["getStory", 20, 0, 0.0, 4824.849999999999, 457, 12184, 2042.5, 11758.500000000002, 12166.85, 12184.0, 0.17957996246778785, 0.5076992102971151, 0.11925231882626537], "isController": false}, {"data": ["List all the Explore feed for the user V2", 20, 0, 0.0, 3945.05, 203, 12684, 997.5, 12128.500000000002, 12661.75, 12684.0, 0.13266910335586496, 0.039722995204011916, 0.08550938302233484], "isController": false}, {"data": ["List All the Explore Feed for the user v1", 20, 0, 0.0, 5330.000000000001, 141, 19282, 874.5, 18011.200000000008, 19237.6, 19282.0, 0.13276069221424922, 0.03806497972080427, 0.0855684149037153], "isController": false}, {"data": ["userStories", 20, 0, 0.0, 3869.3, 326, 16265, 861.0, 14229.500000000007, 16177.749999999998, 16265.0, 0.14475131723698687, 0.5042618519664466, 0.09329674743790169], "isController": false}, {"data": ["AllStoriesByAUser", 20, 0, 0.0, 5897.949999999999, 486, 18737, 3925.0, 14766.800000000007, 18555.149999999998, 18737.0, 0.13537478509252868, 0.4715973653528544, 0.08725327945416887], "isController": false}, {"data": ["Get Feed on Story V2", 20, 0, 0.0, 4559.65, 195, 13344, 1776.5, 12878.500000000002, 13323.1, 13344.0, 0.13637076483543456, 0.036623008134516126, 0.08896061612311554], "isController": false}, {"data": ["delete story", 20, 0, 0.0, 4155.000000000001, 150, 18905, 339.5, 17309.90000000001, 18841.149999999998, 18905.0, 0.13391362571141613, 0.39402515065282895, 0.09677351858051557], "isController": false}, {"data": ["story", 20, 0, 0.0, 3644.4, 486, 14796, 1875.5, 10792.000000000005, 14607.399999999998, 14796.0, 0.16406890894175555, 0.46384715955701394, 0.10895200984413453], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 360, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
