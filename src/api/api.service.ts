import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { City } from '../schemas/cities.schemas';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class ApiService {
  constructor(
    @InjectModel(City.name)
    private cityModel: mongoose.Model<City>,

    private readonly httpService: HttpService
  ) {}

  async find(): Promise<any[]> {
    try {
      const cities = await this.cityModel.find();
      const data = cities.map(async (city) => {   
          try {
            const response = this.httpService
              .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.WEATHER_API_KEY}`,
              );
              if(response){
                const r = {
                  City: response.data.name,
                  Country: response.data.sys.country,
                  Weather: response.data.weather[0].main,
                  Main: response.data.main,
                  Wind: response.data.wind,
                  Clouds: response.data.clouds,
                  Visibility: response.data.visibily,
                }
                return r;
              }
          } catch (error) {
            return {
              City: city.name,
              Error: 'Weather data not available',
            };
          }
        });
      return data;
    } catch (error) {
      console.error('Error fetching cities:', error.message);
      throw new Error('Error fetching cities');
    }
  }

  async create(city: City): Promise<City> {
    const res = await this.cityModel.create(city);
    return res;
  }
}
