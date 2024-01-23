import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
   timestamps: true
})
export class City{
    @Prop()
    name: string;

    @Prop()
    country: string;
}

export const CitySchema = SchemaFactory.createForClass(City)