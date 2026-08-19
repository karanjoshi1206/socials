import mongoose, { Schema, models, model } from "mongoose";
import type { SocialDocument } from "./social";

const SocialHandleSchema = new Schema({
  platform: { type: Schema.Types.ObjectId, ref: "Social" },
  handle: { type: String, required: true }
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: false,
      unique: true
    },
    socialHandles: [SocialHandleSchema]
  },
  { collection: "users" }
);

const Users = models.User || model("User", UserSchema);

export type SocialHandleDocument = {
  _id: mongoose.Types.ObjectId;
  platform?: mongoose.Types.ObjectId | SocialDocument | null;
  handle: string;
};

export type UserDocument = mongoose.InferSchemaType<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId;
  socialHandles: SocialHandleDocument[];
};

export default Users as mongoose.Model<UserDocument>;
