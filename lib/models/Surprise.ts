import mongoose, { Schema, models, model } from 'mongoose';

const SurpriseSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    config: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const Surprise = models.Surprise || model('Surprise', SurpriseSchema);
