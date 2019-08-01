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

# def _get_month(num):
#     month_map = {
#         "04": "1", "13": "2", "21": "3", "29": "4", "38": "5", "46": "6", "54": "7", "63": "8",
#         "71": "9", "79": "10", "88": "11", "96": "12"
#     }