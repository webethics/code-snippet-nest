import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  phone_number: string;
  @Prop({ type: Date, default: Date.now() })
  join_date: Date;
  @Prop()
  full_name: string;
  @Prop()
  email: string;
  @Prop()
  is_verified: boolean;
  @Prop()
  is_updated: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
