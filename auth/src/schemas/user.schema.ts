import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  phone_number: string;
  @Prop()
  uid: string;
  @Prop({ type: Date, default: Date.now() })
  join_date: Date;
  @Prop()
  rid: string;
  @Prop()
  full_name: string;
  @Prop()
  profile_handle: string;
  @Prop()
  email: string;
  @Prop()
  managed_by_org: boolean;
  @Prop()
  avatar_url: string;
  @Prop()
  timezone: string;
  @Prop()
  is_verified: boolean;
  @Prop()
  is_updated: boolean;
  @Prop()
  otp: number;
  @Prop()
  otp_createdAt: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
