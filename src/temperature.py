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
    date = last_line[0]
    temperature = last_line[2].lstrip()
    return date, float(temperature)
