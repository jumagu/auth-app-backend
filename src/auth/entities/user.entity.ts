import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id?: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true, minlength: 6 })
  public password?: string;

  @Prop({ default: true })
  public isActive: boolean;

  @Prop({ type: [String], default: ['user'] })
  public roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);