import co2
import temperature

# import matplotlib as mpl
import matplotlib.pyplot as plt


def paint_co2():

    curr_co2_date, curr_co2 = co2.fetch_current_co2()

    plt.figure(figsize=(5, 5))
    plt.ylabel('CO2 ppm')

    plt.ylim(co2.CO2_CONCENTRATION_PARIS, co2.CO2_CONCENTRATION_2DEGREE)

    plt.bar(curr_co2_date, curr_co2)

    # plt.show()
    plt.savefig('../img/co2.svg')

    print('Date: {0},  CO2: {1}'.format(curr_co2_date, curr_co2))



def paint_temperature():

    curr_temperature_date, curr_temperature = temperature.fetch_current_mean_temperature()

    plt.figure(figsize=(5, 5))
    plt.ylabel('mean temperature increase')

    plt.ylim(temperature.MEAN_TEMPERATURE_PARIS, temperature.MEAN_TEMPERATURE_2DEGREE)

    plt.bar(curr_temperature_date, curr_temperature)

    # plt.show()
    plt.savefig('../img/mean_temperature.svg')

    print('Date: {0},  temperature: {1}'.format(curr_temperature_date, curr_temperature))


paint_co2()
paint_temperature()