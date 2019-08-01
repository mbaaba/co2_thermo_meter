import urllib.request

TEMP_URL = 'https://data.giss.nasa.gov/gistemp/graphs_v4/graph_data/Monthly_Mean_Global_Surface_Temperature/graph.csv'

MEAN_TEMPERATURE_PARIS = 0
MEAN_TEMPERATURE_2DEGREE = 2

def fetch_current_mean_temperature():
    data = []
    with urllib.request.urlopen(TEMP_URL) as response:
        html = response.read().decode("utf-8")
        lines = html.split("\n")
        for row in lines:
            columns = row.split(",")
            data.append(columns)

    last_line = data[-2]
    # date = last_line[0]
    # temperature = last_line[2].lstrip()
    # return date, float(temperature)


    date = last_line[0]
    fields = date.split(".")
    date_str = fields[0]+"-"+_get_month(fields[1])
    temperature = last_line[2].lstrip()
    return date_str, float(temperature)

def _get_month(num):
    month_map = {
        "04": "01", "13": "02", "21": "03", "29": "04", "38": "05", "46": "06", "54": "07", "63": "08",
        "71": "09", "79": "10", "88": "11", "96": "12"
    }

    return month_map[num]
