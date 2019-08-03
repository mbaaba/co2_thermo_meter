import co2
import temperature

import json


def dump_co2_and_temperature():
    curr_co2_date, curr_co2 = co2.fetch_current_co2()
    curr_temperature_date, curr_temperature = temperature.fetch_current_mean_temperature()

    data = {
        "co2": {
             "curr_co2_date": curr_co2_date,
            "curr_co2_value": curr_co2
        },
        "temperature": {
            "curr_temperature_date": curr_temperature_date,
            "curr_temperature_value": curr_temperature
        }
    }

    with open("../data/curr_climate_data.json", "w") as write_file:
        json.dump(data, write_file)


dump_co2_and_temperature()
