import { Test, TestingModule } from "@nestjs/testing"
import { ApiService } from "./api.service"
import { getModelToken } from "@nestjs/mongoose"
import { City } from "../schemas/cities.schemas"
import { Model } from "mongoose"
import { HttpModule } from "@nestjs/axios"
import { of } from "rxjs"
import { TestModule } from "../test.module"



describe('ApiService', () => {
    let apiService: ApiService
    let model: Model<City>;

    const mockApiServices = {
        find: jest.fn(),
        create: jest.fn()
    };

    const mockHttpService = {
        get: jest.fn(),
    };

    const expectedResult =
    {
        "City": "Mumbai",
        "Clouds": {
            "all": expect.any(Number)
        },
        "Country": "IN",
        "Main": {
            "feels_like": expect.any(Number),
            "pressure": expect.any(Number),
            "humidity": expect.any(Number),
            "temp": expect.any(Number),
            "temp_max": expect.any(Number),
            "temp_min": expect.any(Number),
        },
        "Visibility": expect.any(Number),
        "Weather": expect.any(String),
        "Wind": {
            "deg": expect.any(Number),
            "speed": expect.any(Number),
        },


    };


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule, TestModule],
            providers: [
                ApiService,
                {
                    provide: getModelToken(City.name),
                    useValue: mockApiServices
                }
            ]
        }).compile()


        apiService = module.get<ApiService>(ApiService)
        model = module.get<Model<City>>(getModelToken(City.name))

    })

    describe('findAll', () => {
        it('Should find all cities from database and return its weather forecast', async () => {
            const mockCities = [
                { name: 'Mumbai', country: "India" },
            ];


            mockApiServices.find.mockReturnValueOnce(mockCities);
            mockHttpService.get.mockReturnValueOnce(of({ data: expectedResult }));

            const result = await apiService.findAll();

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(expectedResult)

            expect(mockApiServices.find).toHaveBeenCalled();

        });


        it('should handle errors during weather data retrieval', async () => {
            const mockCities = [{ name: 'Unknown City' }];
            mockApiServices.find.mockReturnValueOnce(mockCities);
            mockHttpService.get.mockRejectedValueOnce(new Error('Network error'));

            const result = await apiService.findAll();
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                City: 'Unknown City',
                Error: 'Weather data not available',
            });
            expect(mockApiServices.find).toHaveBeenCalled();
        });
    })


    describe('create', () => {
        it('should create a new city', async () => {
            const newCity: City = { name: "Mumbai", country: "India" };
            const mockCreatedCity: any = {
                ...newCity,
                _id: '659e39f2c7c1d4eb997c6eed',
                createdAt: new Date(),
                updatedAt: new Date(),
                __v: 0
            };

            mockApiServices.create.mockReturnValueOnce(mockCreatedCity);

            const result = await apiService.create(newCity);
            expect(result).toEqual(mockCreatedCity);
            expect(mockApiServices.create).toHaveBeenCalledWith(newCity);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

})
