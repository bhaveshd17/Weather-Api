import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from 'src/schemas/cities.schemas';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'City', schema: CitySchema}]),
    HttpModule
],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
