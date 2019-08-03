const GRAPH_HEIGHT = 500;
const GRAPH_WIDTH = 200;
const BAR_WIDTH = 50;


SVG.on(document, 'DOMContentLoaded', function() {
    var co2_graph = SVG('co2_graph').size(GRAPH_WIDTH, GRAPH_HEIGHT);
    var temperature_graph = SVG('temperature_graph').size(GRAPH_WIDTH, GRAPH_HEIGHT);

    function draw_co2(curr_co2_value) {
        console.log(["CO2", curr_co2_value])

        const CO2_CONCENTRATION_PARIS = 402;
        const CO2_MAX = 450;

        var cur_co2_growth = curr_co2_value - CO2_CONCENTRATION_PARIS;
        var max_co2_growth = CO2_MAX - CO2_CONCENTRATION_PARIS;
        var co2_scale =  CO2_MAX / max_co2_growth; // max_co2_groth * x = CO2_MAX
        var curr_co2_top = GRAPH_HEIGHT - (cur_co2_growth * co2_scale);

        var rect = co2_graph.rect(BAR_WIDTH, curr_co2_top);
        rect.attr({ x: (GRAPH_WIDTH - BAR_WIDTH)/2, y: GRAPH_HEIGHT-curr_co2_top})
        rect.fill({ color: '#ffc9b8', opacity: 0.1 })
        rect.stroke({ color: 'rgba(2,12,41,0.93)', opacity: 0.6, width: 2 })

        var max_line = co2_graph.line(0, GRAPH_HEIGHT-CO2_MAX, GRAPH_WIDTH, GRAPH_HEIGHT-CO2_MAX);
        max_line.stroke({ width: 1, color: '#ff070e', dasharray: '5,5' })

    }

    function draw_temperature(curr_temperature_value) {
        console.log(["TEMP", curr_temperature_value])
        var height =  curr_temperature_value*100;
        var rect = temperature_graph.rect(BAR_WIDTH, height);
        rect.attr({ x: (GRAPH_WIDTH - BAR_WIDTH)/2, y: GRAPH_HEIGHT-height})
    }

    function load_climate_data() {
        function reqListener () {
            var climate = JSON.parse(this.responseText);
            draw_co2(climate.co2.curr_co2_value);
            draw_temperature(climate.temperature.curr_temperature_value);
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "http://localhost:5000/climate");
        oReq.send();
    }

    console.log("PAINT.js ==> loading climate data");
    load_climate_data();

});

