import { ApiProperty } from '@nestjs/swagger';


export class FetchWeatherDto {
  @ApiProperty({
    description: 'City Name',
    example: "Mumbai",
  })
  City: String;

  @ApiProperty({
    description: 'Country Code',
    example: {"IND": "IND"},
  })
  Country: Object;

  @ApiProperty({
    description: 'Weather',
    example: "Cloud",
  })
  Weather: String;

  @ApiProperty({
    description: 'Temperature, Pressure, Humidity, Sea Level, Ground Level',
    example: {
        "temp": 298.67,
        "feels_like": 298.64,
        "temp_min": 298.67,
        "temp_max": 298.67,
        "pressure": 1016,
        "humidity": 52,
        "sea_level": 1016,
        "grnd_level": 951
    },
  })
  Main: Object;

  @ApiProperty({
    description: 'Wind Speed',
    example: {
        "speed": 2.33,
        "deg": 116,
        "gust": 2.19
    },
  })
  Wind: Object;

  @ApiProperty({
    description: 'Clouds',
    example:{
        "all": 35
    },
  })
  Clouds: Object;

  @ApiProperty({
    description: 'Visibility',
    example:1000,
  })
  Visibility: number;

 
}
