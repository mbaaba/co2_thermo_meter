extend = function extend(sub_class, super_class) {
    try {
        sub_class.prototype.__proto__ = super_class.prototype;
        sub_class.prototype.__parent = super_class;
    } catch (ex) {
        //LACXULHTML
        console.log([sub_class, super_class]);
        throw ex;
    }
}

function Climate_Graph(name, width, height) {
    const MARGIN_MARKER = 10;


    var _graph = SVG(name).size(width, height);
    var _bar_width = width/4;
    var _bar_left_x = (width - _bar_width)/2,
        _marker_left_x = _bar_left_x - MARGIN_MARKER,
        _marker_right_x = width - ((width - _bar_width)/2);
    var _bar_height = 0;


    this.set_bar_width = function set_bar_width(bar_width) {
        _bar_width = bar_width;
    };

    this.get_graph = function get_graph() {
        return _graph;
    };

    this.get_height = function get_height() {
        return height;
    }

    this.draw_bar = function draw_bar(value) {
        _bar_height = value;
        var rect = _graph.rect(_bar_width, height - value);
        rect.attr({ x: (width - _bar_width)/2, y: value});
        rect.fill({ color: '#1335ff', opacity: 0.3 });
        rect.stroke({ color: 'rgba(2,12,41,0.93)', opacity: 0.6, width: 0.5 });
        return rect;
    };

    this.draw_marker = function draw_marker(y_position, color) {
        var marker = _graph.line(_marker_left_x, y_position, _marker_right_x, y_position);

        marker.stroke({ width: 1, color: color, dasharray: '5,5' });

        return marker;

    };

    this.draw_marker_text = function draw_marker_text(msg, x_position, y_position) {

        var marker_text = _graph.text(msg),
            font_size = 11,
            y_pos = y_position - font_size - 7;

        marker_text.attr({y: y_pos, x: x_position});
        marker_text.font({ size: font_size, family: 'Verdana' });
        return marker_text;
    };

    this.draw_bar_text = function draw_bar_text(msg) {
        var bar_text = _graph.text(msg);
        var bar_text_y_offset = 25;

        var start_x =  _marker_right_x,
            start_y = height - bar_text_y_offset,
            end_x = start_x,
            end_y =  0;
        var path = 'M ' + start_x + ' ' + start_y + ' L ' + end_x + ' ' + end_y;

        bar_text.path(path).font({ size: 10, family: 'Verdana' })
    };

    this.draw_meter = function draw_meter() {
        var rect = _graph.rect(_bar_width, height);
        rect.attr({ x: (width - _bar_width)/2, y: 0});
        rect.fill({ color: '#ffc9b8', opacity: 0.0 });
        rect.stroke({ color: 'rgba(2,12,41,0.93)', opacity: 0.6, width: 2 });
        return rect;
    };
}

Climate_Graph.CO2_CONCENTRATION_PRE_INDUSTRY = 291;
Climate_Graph.CO2_MAX = 450;

function CO2_Graph(name, width, height) {
    Climate_Graph.apply(this, arguments);


    this.draw_value = function draw_value(co2) {
        const CO2_MAX = Climate_Graph.CO2_MAX - Climate_Graph.CO2_CONCENTRATION_PRE_INDUSTRY;
        var max_co2_top =  height - CO2_MAX;

        var cur_co2 = co2.curr_co2_value - Climate_Graph.CO2_CONCENTRATION_PRE_INDUSTRY;
        var curr_co2_top = height - cur_co2;

        this.draw_bar(curr_co2_top);
        this.draw_marker(max_co2_top, '#ff070e');
        this.draw_marker_text(co2.curr_co2_value + " ppm", 0, curr_co2_top);
        this.draw_marker_text(Climate_Graph.CO2_MAX + " ppm", 14, max_co2_top);
        this.draw_marker_text(co2.curr_co2_date, 135, 20);
        this.draw_bar_text("global CO2-concentration");

    }
}
extend(CO2_Graph, Climate_Graph);

function Temperature_Graph(name, width, height) {
    Climate_Graph.apply(this, arguments);

    const MAX_CO2 = Climate_Graph.CO2_MAX - Climate_Graph.CO2_CONCENTRATION_PRE_INDUSTRY;

    this.deg_2 = Climate_Graph.CO2_MAX - Climate_Graph.CO2_CONCENTRATION_PRE_INDUSTRY;
    this.deg_2_top =  height - this.deg_2;

    this.deg_15 = (MAX_CO2 / 4) * 3;
    this.deg_15_top = height - this.deg_15;

    /*
   2 deg =: max_c02
   0 deg =: pre_ind

   1.5 deg =: (max_c02/4)*3 == (max_c02/2)*(3/2) == (max_co2*3)/4
   1 deg =: max_c02/2
   curr deg =: (max_c02/2) * curr_temp

 */
    this.draw_value = function draw_value(temperature) {
        var bar_height =  height-temperature.curr_temperature_value*(this.deg_2/2);

        this.draw_bar(bar_height);
        this.draw_marker(this.deg_2_top, '#ff070e');
        this.draw_marker(this.deg_15_top, '#ffcc0e');
        this.draw_marker_text("1.5 K", 37, this.deg_15_top);
        this.draw_marker_text("2 K", 47, this.deg_2_top);
        this.draw_marker_text(temperature.curr_temperature_value + " K", 32, bar_height);
        this.draw_marker_text(temperature.curr_temperature_date, 135, 20);

        this.draw_bar_text("global mean warming");

    }

}
extend(Temperature_Graph, Climate_Graph);


SVG.on(document, 'DOMContentLoaded', function() {

    const GRAPH_HEIGHT = 500;
    const GRAPH_WIDTH = 200;
    const graph_height = GRAPH_HEIGHT - Climate_Graph.CO2_CONCENTRATION_PRE_INDUSTRY;

    var co2_graph = new CO2_Graph('co2_graph', GRAPH_WIDTH, graph_height),
        temperature_graph = new Temperature_Graph('temperature_graph', GRAPH_WIDTH, graph_height);


    function load_climate_data() {
        function reqListener () {
            var climate = JSON.parse(this.responseText);
            co2_graph.draw_value(climate.co2);
            temperature_graph.draw_value(climate.temperature);
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "http://192.168.188.39:5000/climate");
        oReq.send();
    }

    co2_graph.draw_meter();
    temperature_graph.draw_meter();
    load_climate_data();

});

