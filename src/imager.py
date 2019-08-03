import co2
import temperature

import matplotlib as mpl
import matplotlib.pyplot as plt


def paint_co2():

    curr_co2_date, curr_co2 = co2.fetch_current_co2()

    plt.figure(figsize=(5, 5))
    plt.ylabel('CO2 ppm')

    plt.ylim(co2.CO2_CONCENTRATION_PARIS, co2.CO2_CONCENTRATION_2DEGREE)

    plt.bar(curr_co2_date, curr_co2)

    # plt.show()
    plt.savefig('static/co2.svg')

    print('Date: {0},  CO2: {1}'.format(curr_co2_date, curr_co2))



def paint_temperature():

    curr_temperature_date, curr_temperature = temperature.fetch_current_mean_temperature()

    plt.figure(figsize=(5, 5))
    plt.ylabel('global mean temperature increase')

    plt.ylim(temperature.MEAN_TEMPERATURE_PARIS, temperature.MEAN_TEMPERATURE_2DEGREE)

    plt.bar(curr_temperature_date, curr_temperature)

    # plt.show()
    plt.savefig('static/mean_temperature.svg')

    print('Date: {0},  temperature: {1}'.format(curr_temperature_date, curr_temperature))



def paint_co2_and_temperature():
    curr_co2_date, curr_co2 = co2.fetch_current_co2()
    curr_temperature_date, curr_temperature = temperature.fetch_current_mean_temperature()

    figure = plt.figure(figsize=(3, 5))
    figure.subplots_adjust(hspace=0.4)

    plt.subplot(1, 2, 1)
    plt.ylabel('CO2 ppm')
    plt.ylim(co2.CO2_CONCENTRATION_PARIS, co2.CO2_CONCENTRATION_2DEGREE)
    plt.bar(curr_co2_date, curr_co2)

    plt.subplot(1, 2, 2)
    mpl.rcParams['ytick.color'] ='r'
    plt.ylabel('global mean temperature increase')
    plt.ylim(temperature.MEAN_TEMPERATURE_PARIS, temperature.MEAN_TEMPERATURE_2DEGREE)
    plt.bar(curr_temperature_date, curr_temperature)

    plt.show()


paint_co2()
paint_temperature()

# paint_co2_and_temperature()
