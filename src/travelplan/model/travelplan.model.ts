import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

export type TravelPlanDocument = TravelPlan & Document;

@Schema()
export class TravelPlan{
    @Prop({unique:true})
    planId: number
    @Prop()
    userName: string
    @Prop()
    planName: string
    @Prop()
    locations: number[]
    @Prop()
    description: string
    @Prop()
    isPublic: boolean
}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);