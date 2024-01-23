import { ApiProperty } from "@nestjs/swagger"


export class CreateCityDto {
    @ApiProperty({
        description: 'Name of City',
        example: 'Mumbai',
      })
    readonly name: string

    @ApiProperty({
        description: 'Country',
        example: 'India',
      })
    readonly country: string
}