import urllib.request

CO2_URL = 'http://scrippsco2.ucsd.edu/assets/data/atmospheric/stations/in_situ_co2/weekly/weekly_in_situ_co2_mlo.csv'

CO2_CONCENTRATION_PARIS = 402.01
CO2_CONCENTRATION_2DEGREE = 450

def fetch_current_co2():
    data = []
    with urllib.request.urlopen(CO2_URL) as response:
        html = response.read().decode("utf-8")
        lines = html.split("\n")
        for row in lines:
            columns = row.split(",")
            data.append(columns)

    last_line = data[-2]
    date = last_line[0]
    co2 = last_line[1].lstrip()
    return date, float(co2)

