import mongoose, { Schema, models, model } from "mongoose";

const SocialSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    socialLogo: {
      type: String,
      required: true
    },
    socialBaseUrl: {
      type: String,
      required: false
    }
  },
  { collection: "socials" }
);

const Socials = models.Social || model("Social", SocialSchema);

export type SocialDocument = mongoose.InferSchemaType<typeof SocialSchema> & {
  _id: mongoose.Types.ObjectId;
};

export default Socials as mongoose.Model<SocialDocument>;
