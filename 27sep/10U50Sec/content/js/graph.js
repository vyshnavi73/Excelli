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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 9.0, "series": [{"data": [[0.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555202", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555202", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555204", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555206", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555205", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555206", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555205", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555205", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555204", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555204", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555203", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555202", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555202", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555206", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555204", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555203", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555202", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555209", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555206", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555207", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555211", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555212", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555210", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555205", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555204", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555206", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555202", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-9", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0]], "isOverall": false, "label": "RegisterDevices API", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555206", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555205", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555204", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-10", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555204", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555205", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555202", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Login  API l1o1adtrial555203", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555207", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555206", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555205", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555209", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 5.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 99.0, "series": [{"data": [[0.0, 99.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 11.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 5.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[0.0, 1.0]], "isOverall": false, "label": "org.apache.jmeter.threads.JMeterThread@9e01a8a - bzm - Parallel Controller - Simple", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "org.apache.jmeter.threads.JMeterThread@3b114501 - bzm - Parallel Controller - Simple", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "org.apache.jmeter.threads.JMeterThread@5772c6d - bzm - Parallel Controller - Simple", "isController": false}, {"data": [[1.66427796E12, 1.0], [1.66427802E12, 1.0]], "isOverall": false, "label": "parallel bzm - Parallel", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "org.apache.jmeter.threads.JMeterThread@6795696 - bzm - Parallel Controller - Simple", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "org.apache.jmeter.threads.JMeterThread@217ac0a3 - bzm - Parallel Controller - Simple", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66427802E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 766.0, "series": [{"data": [[5.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555202", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555202-Aggregated", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555203", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555203-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-1", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-1-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-3", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-3-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-2", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-2-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-4", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-4-Aggregated", "isController": false}, {"data": [[2.0, 25.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555202", "isController": false}, {"data": [[2.0, 25.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555202-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555204", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555204-Aggregated", "isController": false}, {"data": [[2.0, 13.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555203", "isController": false}, {"data": [[2.0, 13.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555203-Aggregated", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555206", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555206-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555205", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555205-Aggregated", "isController": false}, {"data": [[4.0, 52.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555206", "isController": false}, {"data": [[4.0, 52.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555206-Aggregated", "isController": false}, {"data": [[4.0, 57.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555205", "isController": false}, {"data": [[4.0, 57.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555205-Aggregated", "isController": false}, {"data": [[4.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555205", "isController": false}, {"data": [[4.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555205-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-11", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-11-Aggregated", "isController": false}, {"data": [[3.0, 81.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555204", "isController": false}, {"data": [[3.0, 81.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555204-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555204", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555204-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-10", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-10-Aggregated", "isController": false}, {"data": [[3.0, 248.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555203", "isController": false}, {"data": [[3.0, 248.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555203-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555203", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555203-Aggregated", "isController": false}, {"data": [[2.0, 592.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555202", "isController": false}, {"data": [[2.0, 592.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555202-Aggregated", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555202", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555202-Aggregated", "isController": false}, {"data": [[4.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555206", "isController": false}, {"data": [[4.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555206-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-1", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-1-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-0", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-0-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-3", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-3-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-2", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-2-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-5", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-5-Aggregated", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555211", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555211-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-4", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-4-Aggregated", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555210", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555210-Aggregated", "isController": false}, {"data": [[3.0, 10.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555212", "isController": false}, {"data": [[3.0, 10.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555212-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555212-Aggregated", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555210", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555210-Aggregated", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555211", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555211-Aggregated", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555212", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555212-Aggregated", "isController": false}, {"data": [[2.0, 67.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555211", "isController": false}, {"data": [[2.0, 67.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555211-Aggregated", "isController": false}, {"data": [[2.0, 50.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555210", "isController": false}, {"data": [[2.0, 50.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555210-Aggregated", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-0", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-2", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-2-Aggregated", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-1", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-1-Aggregated", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-4", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-4-Aggregated", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-3", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-3-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555212", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555212-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555211", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555211-Aggregated", "isController": false}, {"data": [[3.0, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555204", "isController": false}, {"data": [[3.0, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555204-Aggregated", "isController": false}, {"data": [[2.0, 8.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555203", "isController": false}, {"data": [[2.0, 8.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555203-Aggregated", "isController": false}, {"data": [[2.0, 101.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555202", "isController": false}, {"data": [[2.0, 101.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555202-Aggregated", "isController": false}, {"data": [[3.0, 676.0]], "isOverall": false, "label": "Login  API l1o1adtrial555209", "isController": false}, {"data": [[3.0, 676.0]], "isOverall": false, "label": "Login  API l1o1adtrial555209-Aggregated", "isController": false}, {"data": [[4.0, 680.0]], "isOverall": false, "label": "Login  API l1o1adtrial555206", "isController": false}, {"data": [[4.0, 680.0]], "isOverall": false, "label": "Login  API l1o1adtrial555206-Aggregated", "isController": false}, {"data": [[4.0, 650.0]], "isOverall": false, "label": "Login  API l1o1adtrial555207", "isController": false}, {"data": [[4.0, 650.0]], "isOverall": false, "label": "Login  API l1o1adtrial555207-Aggregated", "isController": false}, {"data": [[2.0, 639.0]], "isOverall": false, "label": "Login  API l1o1adtrial555211", "isController": false}, {"data": [[2.0, 639.0]], "isOverall": false, "label": "Login  API l1o1adtrial555211-Aggregated", "isController": false}, {"data": [[3.0, 693.0]], "isOverall": false, "label": "Login  API l1o1adtrial555212", "isController": false}, {"data": [[3.0, 693.0]], "isOverall": false, "label": "Login  API l1o1adtrial555212-Aggregated", "isController": false}, {"data": [[2.0, 766.0]], "isOverall": false, "label": "Login  API l1o1adtrial555210", "isController": false}, {"data": [[2.0, 766.0]], "isOverall": false, "label": "Login  API l1o1adtrial555210-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-0", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-0-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-2", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-2-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-1", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-1-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-4", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-4-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-3", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-3-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-6", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-6-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-5", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-5-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-7", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-7-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-6", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-6-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-9", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-9-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-8", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-8-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555212", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555212-Aggregated", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555211", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555211-Aggregated", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555210", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555210-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-1", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-1-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-0", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-0-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-3", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-3-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-2", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-2-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-4", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-4-Aggregated", "isController": false}, {"data": [[5.0, 3.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203", "isController": false}, {"data": [[5.0, 3.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-Aggregated", "isController": false}, {"data": [[5.0, 8.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202", "isController": false}, {"data": [[5.0, 8.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-Aggregated", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555205", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555205-Aggregated", "isController": false}, {"data": [[4.0, 2.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555204", "isController": false}, {"data": [[4.0, 2.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555204-Aggregated", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555206", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555206-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555203", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555203-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-8", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-8-Aggregated", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555211", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555211-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-Aggregated", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555202", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555202-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-7", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-7-Aggregated", "isController": false}, {"data": [[2.0, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555210", "isController": false}, {"data": [[2.0, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555210-Aggregated", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-9", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-9-Aggregated", "isController": false}, {"data": [[1.0, 340.0], [2.0, 30.666666666666668], [4.0, 24.666666666666668], [3.0, 29.0]], "isOverall": false, "label": "RegisterDevices API", "isController": false}, {"data": [[2.8, 59.3]], "isOverall": false, "label": "RegisterDevices API-Aggregated", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555206", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555206-Aggregated", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555205", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555205-Aggregated", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-Aggregated", "isController": false}, {"data": [[4.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555204", "isController": false}, {"data": [[4.0, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555204-Aggregated", "isController": false}, {"data": [[3.0, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555212", "isController": false}, {"data": [[3.0, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555212-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-12", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-12-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-11", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-11-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-10", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-10-Aggregated", "isController": false}, {"data": [[3.0, 712.0]], "isOverall": false, "label": "Login  API l1o1adtrial555204", "isController": false}, {"data": [[3.0, 712.0]], "isOverall": false, "label": "Login  API l1o1adtrial555204-Aggregated", "isController": false}, {"data": [[4.0, 721.0]], "isOverall": false, "label": "Login  API l1o1adtrial555205", "isController": false}, {"data": [[4.0, 721.0]], "isOverall": false, "label": "Login  API l1o1adtrial555205-Aggregated", "isController": false}, {"data": [[2.0, 618.0]], "isOverall": false, "label": "Login  API l1o1adtrial555202", "isController": false}, {"data": [[2.0, 618.0]], "isOverall": false, "label": "Login  API l1o1adtrial555202-Aggregated", "isController": false}, {"data": [[2.0, 719.0]], "isOverall": false, "label": "Login  API l1o1adtrial555203", "isController": false}, {"data": [[2.0, 719.0]], "isOverall": false, "label": "Login  API l1o1adtrial555203-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555207", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555207-Aggregated", "isController": false}, {"data": [[4.0, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555206", "isController": false}, {"data": [[4.0, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555206-Aggregated", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555205", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555205-Aggregated", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555210", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555210-Aggregated", "isController": false}, {"data": [[3.0, 3.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555209", "isController": false}, {"data": [[3.0, 3.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555209-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 0.0, "minX": 0.0, "maxY": 775.2833333333333, "series": [{"data": [[0.0, 346.18333333333334], [1.66427796E12, 775.2833333333333], [1.66427802E12, 42.333333333333336]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[0.0, 0.0], [1.66427796E12, 189.83333333333334], [1.66427802E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66427802E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 766.0, "series": [{"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-4", "isController": false}, {"data": [[1.66427796E12, 25.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 9.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 13.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 8.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 9.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 52.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 57.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555205", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-11", "isController": false}, {"data": [[1.66427796E12, 81.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555204", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-10", "isController": false}, {"data": [[1.66427796E12, 248.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 592.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555206", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-5", "isController": false}, {"data": [[1.66427796E12, 7.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-4", "isController": false}, {"data": [[1.66427796E12, 7.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427796E12, 10.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427802E12, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427802E12, 1.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 90.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 67.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 50.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-4", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-3", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 8.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 101.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 676.0]], "isOverall": false, "label": "Login  API l1o1adtrial555209", "isController": false}, {"data": [[1.66427796E12, 680.0]], "isOverall": false, "label": "Login  API l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 650.0]], "isOverall": false, "label": "Login  API l1o1adtrial555207", "isController": false}, {"data": [[1.66427796E12, 639.0]], "isOverall": false, "label": "Login  API l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 693.0]], "isOverall": false, "label": "Login  API l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 766.0]], "isOverall": false, "label": "Login  API l1o1adtrial555210", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-4", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-6", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-5", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-7", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-6", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-9", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-8", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-4", "isController": false}, {"data": [[1.66427796E12, 3.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 8.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 2.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-8", "isController": false}, {"data": [[1.66427796E12, 7.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555202", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-7", "isController": false}, {"data": [[1.66427796E12, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-9", "isController": false}, {"data": [[1.66427796E12, 59.3]], "isOverall": false, "label": "RegisterDevices API", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427796E12, 1.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-12", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-11", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-10", "isController": false}, {"data": [[1.66427796E12, 712.0]], "isOverall": false, "label": "Login  API l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 721.0]], "isOverall": false, "label": "Login  API l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 618.0]], "isOverall": false, "label": "Login  API l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 719.0]], "isOverall": false, "label": "Login  API l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 9.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555207", "isController": false}, {"data": [[1.66427796E12, 5.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 8.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427796E12, 3.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555209", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66427802E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 766.0, "series": [{"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-4", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555205", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-11", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555204", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-10", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555206", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-5", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-4", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-4", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-3", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 676.0]], "isOverall": false, "label": "Login  API l1o1adtrial555209", "isController": false}, {"data": [[1.66427796E12, 680.0]], "isOverall": false, "label": "Login  API l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 650.0]], "isOverall": false, "label": "Login  API l1o1adtrial555207", "isController": false}, {"data": [[1.66427796E12, 639.0]], "isOverall": false, "label": "Login  API l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 692.0]], "isOverall": false, "label": "Login  API l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 766.0]], "isOverall": false, "label": "Login  API l1o1adtrial555210", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-4", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-6", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-5", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-7", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-6", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-9", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-8", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-4", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-8", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555202", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-7", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-9", "isController": false}, {"data": [[1.66427796E12, 59.199999999999996]], "isOverall": false, "label": "RegisterDevices API", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-12", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-11", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-10", "isController": false}, {"data": [[1.66427796E12, 712.0]], "isOverall": false, "label": "Login  API l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 721.0]], "isOverall": false, "label": "Login  API l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 618.0]], "isOverall": false, "label": "Login  API l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 719.0]], "isOverall": false, "label": "Login  API l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555207", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555209", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66427802E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 49.900000000000006, "series": [{"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-4", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555205", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-11", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555204", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-10", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555206", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-5", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-4", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-4", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-3", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555209", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555207", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555210", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-4", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-6", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-5", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-7", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-6", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-9", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-8", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555210", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-1", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-0", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-3", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-2", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-4", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555203", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-8", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555211", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555202", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-7", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427802E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-9", "isController": false}, {"data": [[1.66427796E12, 49.900000000000006]], "isOverall": false, "label": "RegisterDevices API", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555212", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-12", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-11", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-10", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555204", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555202", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Login  API l1o1adtrial555203", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555207", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555206", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555205", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555210", "isController": false}, {"data": [[1.66427796E12, 0.0]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555209", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66427802E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 766.0, "series": [{"data": [[0.0, 4.9E-324], [1.66427796E12, 766.0], [1.66427802E12, 1.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[0.0, 0.0], [1.66427796E12, 677.2], [1.66427802E12, 1.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[0.0, 0.0], [1.66427796E12, 766.0], [1.66427802E12, 1.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[0.0, 0.0], [1.66427796E12, 716.55], [1.66427802E12, 1.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[0.0, 0.0], [1.66427796E12, 0.0], [1.66427802E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[0.0, 0.0], [1.66427796E12, 9.0], [1.66427802E12, 0.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66427802E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 63.0, "series": [{"data": [[1.0, 25.0], [4.0, 63.0], [2.0, 1.0], [5.0, 9.0], [40.0, 0.0], [3.0, 2.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 3.0], [1.0, 1.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 40.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 25.0, "series": [{"data": [[1.0, 25.0], [4.0, 0.0], [2.0, 0.0], [5.0, 0.0], [40.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 0.0], [1.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 40.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 0.0, "maxY": 1.1833333333333333, "series": [{"data": [[0.0, 0.6666666666666666], [1.66427796E12, 1.1833333333333333], [1.66427802E12, 0.06666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66427802E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 0.0, "maxY": 0.9333333333333333, "series": [{"data": [[0.0, 0.6666666666666666], [1.66427796E12, 0.9333333333333333], [1.66427802E12, 0.06666666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66427796E12, 0.16666666666666666]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.66427796E12, 0.08333333333333333]], "isOverall": false, "label": "500", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66427802E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 0.0, "maxY": 0.16666666666666666, "series": [{"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555212-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555205-failure", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-3-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-2-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555203-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555204-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555202-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555210-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555211-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-6-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555211-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-10-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555205-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555206-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555205-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555206-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-2-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-3-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555210-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-6-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-10-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-2-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555202-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555212-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555202-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555202-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-2-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-12-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555207-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555211-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-7-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555210-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555203-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-2-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555203-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-3-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555204-failure", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555212-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555206-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555210-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555205-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555204-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-9-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-3-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-1-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555211-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-0-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-5-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555211-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555203-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555204-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-1-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555212-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-8-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-11-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555203-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-0-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-1-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-4-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555206-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555210-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-4-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555207-failure", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555204-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-0-success", "isController": false}, {"data": [[1.66427802E12, 0.016666666666666666]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555211-success", "isController": false}, {"data": [[1.66427802E12, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555204-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555202-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-1-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555212-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555204-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-8-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-4-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555203-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-9-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555206-failure", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555209-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-0-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-4-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555210-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-5-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555210-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-0-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555212-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Set Presence Sampler l1o1adtrial555205-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Login  API l1o1adtrial555205-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555202-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Log-In Sampler l1o1adtrial555205-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555203-1-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555206-success", "isController": false}, {"data": [[1.66427802E12, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555211-success", "isController": false}, {"data": [[1.66427796E12, 0.16666666666666666]], "isOverall": false, "label": "RegisterDevices API-success", "isController": false}, {"data": [[1.66427802E12, 0.016666666666666666]], "isOverall": false, "label": "Disconnect Sampler l1o1adtrial555212-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555209-failure", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555206-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Send Message Sampler l1o1adtrial555203-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Get Contacts List Sampler l1o1adtrial555211-success", "isController": false}, {"data": [[1.66427796E12, 0.016666666666666666]], "isOverall": false, "label": "Connect Sampler l1o1adtrial555202-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555210-4-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555212-3-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-11-success", "isController": false}, {"data": [[0.0, 0.016666666666666666]], "isOverall": false, "label": "Collect Packages Sampler l1o1adtrial555202-7-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66427802E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 0.0, "maxY": 1.1, "series": [{"data": [[0.0, 0.6666666666666666], [1.66427796E12, 1.1], [1.66427802E12, 0.06666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66427796E12, 0.08333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66427802E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
