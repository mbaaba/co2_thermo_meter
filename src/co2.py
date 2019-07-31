import csv
import os
import urllib.request

# DATA_DIR = '../data'
# CO2_DIR = DATA_DIR + '/co2'
# CO2_WEEKLY = CO2_DIR + '/weekly_in_situ_co2_mlo.csv'

CO2_URL = 'http://scrippsco2.ucsd.edu/assets/data/atmospheric/stations/in_situ_co2/weekly/weekly_in_situ_co2_mlo.csv'


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
    return date, co2


curr_date, curr_co2 = fetch_current_co2()

print('Date: {0},  CO2: {1}'.format(curr_date, curr_co2))
