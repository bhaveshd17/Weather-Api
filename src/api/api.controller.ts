import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { City } from '../schemas/cities.schemas';
import { ApiService } from './api.service';
import { CreateCityDto } from '../dto/create-city.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiCreatedResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FetchWeatherDto } from '../dto/fetch-weather.dto';


@Controller('api')
export class ApiController {
  constructor(private apiServices: ApiService) {}

  @Get('/fetch-weather')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved weather details',
    type: FetchWeatherDto,
    isArray: true,
  })
  async getAllCityData(): Promise<FetchWeatherDto[]> {
    const data: Promise<FetchWeatherDto[]> = this.apiServices.findAll()
    return data;
  }

  @Post('/add-city')
  @ApiBasicAuth('basic')
  @UseGuards(AuthGuard('basic'))
  @ApiCreatedResponse({description: "City Object Created"})
  @ApiUnauthorizedResponse({description: "Unauthorized access"})
  async createCity(
    @Body()
    city: CreateCityDto,
  ): Promise<City> {
    return this.apiServices.create(city);
  }
}
