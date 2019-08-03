const GRAPH_HEIGHT = 500;
const GRAPH_WIDTH = 200;
const BAR_WIDTH = 50;


SVG.on(document, 'DOMContentLoaded', function() {
    const CO2_CONCENTRATION_PRE_INDUSTRY = 291;
    const CO2_MAX = 450;

    var graph_height = GRAPH_HEIGHT - CO2_CONCENTRATION_PRE_INDUSTRY;
    var max_co2 = CO2_MAX - CO2_CONCENTRATION_PRE_INDUSTRY;
    var max_co2_top =  graph_height - max_co2;

    var deg_15 = (max_co2 / 4) * 3;
    var deg_15_top = graph_height - deg_15;

    var co2_graph = SVG('co2_graph').size(GRAPH_WIDTH, graph_height);
    var temperature_graph = SVG('temperature_graph').size(GRAPH_WIDTH, graph_height);

    function draw_co2(curr_co2_value) {
        console.log(["CO2", curr_co2_value])

        var cur_co2 = curr_co2_value - CO2_CONCENTRATION_PRE_INDUSTRY;
        var curr_co2_top = graph_height - cur_co2;

        var rect = co2_graph.rect(BAR_WIDTH, graph_height - curr_co2_top);
        rect.attr({ x: (GRAPH_WIDTH - BAR_WIDTH)/2, y: curr_co2_top});
        rect.fill({ color: '#ffc9b8', opacity: 0.1 });
        rect.stroke({ color: 'rgba(2,12,41,0.93)', opacity: 0.6, width: 2 });

        var max_line = co2_graph.line(0, max_co2_top, GRAPH_WIDTH, max_co2_top);
        max_line.stroke({ width: 1, color: '#ff070e', dasharray: '5,5' })

    }

    /*
       2 deg =: max_c02
       0 deg =: pre_ind

       1.5 deg =: (max_c02/4)*3 == (max_c02/2)*(3/2) == (max_co2*3)/4
       1 deg =: max_c02/2
       curr deg =: (max_c02/2) * curr_temp

     */
    function draw_temperature(curr_temperature_value) {
        console.log(["TEMP", curr_temperature_value]);
        var height =  curr_temperature_value*(max_co2/2);
        var rect = temperature_graph.rect(BAR_WIDTH, height);
        rect.fill({ color: '#ffc9b8', opacity: 0.1 });
        rect.attr({ x: (GRAPH_WIDTH - BAR_WIDTH)/2, y: graph_height-height});
        rect.stroke({ color: 'rgba(2,12,41,0.93)', opacity: 0.6, width: 2 });

        var max_line = temperature_graph.line(0, max_co2_top, GRAPH_WIDTH, max_co2_top);
        max_line.stroke({ width: 1, color: '#ff070e', dasharray: '5,5' });

        var deg_15_line = temperature_graph.line(0, deg_15_top, GRAPH_WIDTH, deg_15_top);
        deg_15_line.stroke({ width: 1, color: '#ffcc0e', dasharray: '5,5' })
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

