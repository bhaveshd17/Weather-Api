import { Test, TestingModule } from "@nestjs/testing"
import { ApiService } from "./api.service"
import { getModelToken } from "@nestjs/mongoose"
import { City } from "../schemas/cities.schemas"
import { Model } from "mongoose"
import { HttpModule } from "@nestjs/axios"
import { TestModule } from "../test.module"
import { ApiController } from "./api.controller"
import { INestApplication } from "@nestjs/common"
import * as request from 'supertest'


describe('ApiController', () => {
    let app: INestApplication
    let apiService: ApiService
    let model: Model<City>;

    const mockApiServices = {
        find: jest.fn().mockResolvedValue(new City()),
        create: jest.fn().mockResolvedValue(new City())
    };

    const mockHttpService = {
        get: jest.fn(),
    };



    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule, TestModule],
            controllers: [ApiController],
            providers: [
                ApiService,
                {
                    provide: getModelToken(City.name),
                    useValue: mockApiServices
                }
            ]
        }).compile()

        app = module.createNestApplication();
        apiService = module.get<ApiService>(ApiService)
        model = module.get<Model<City>>(getModelToken(City.name))
        await app.init()

    })

    describe('ApiController', () => {
        it('Controller should return weather forecast', async () => {
            const res: any = [{}];
            jest.spyOn(apiService, 'findAll').mockImplementation(()=>res)
            await request(app.getHttpServer())
                .get('/api/fetch-weather')
                .expect(200)
                .expect(res)

        });
    })

    describe('create', () => {
        it('Controller should create a new city', async () => {
            const res: any = [{}];
            const reqDAt: any = {
                'name': "Mumbai",
                'country': "India"
            }
            jest.spyOn(apiService, 'findAll').mockImplementation(()=>res)
            await request(app.getHttpServer())
                .post('/api/add-city')
                .send(reqDAt)
                .expect(200)
                .expect(res)

        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

})
