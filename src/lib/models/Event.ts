import mongoose, { Document } from "mongoose";

export interface ICustomInput {
  _id?: any;
  type:
    | "shortText"
    | "select"
    | "number"
    | "email"
    | "phone"
    | "longText"
    | "file"
    | "date"
    | "link"
    | "time";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  fileType?: "pdf" | "image" | "video";
  maxSize?: number;
}

export interface IEvent extends Document {
  _id: string;
  name: string;
  owner: mongoose.Types.ObjectId;
  day: number;
  startTime: string;
  endTime: string;
  venue: string;
  acceptingRegistrations: boolean;
  imageKey?: string;
  description: string;
  isTeamEvent: boolean;
  minNumberOfTeamMembers: number;
  maxNumberOfTeamMembers: number;
  createdAt: Date;
  updatedAt: Date;
  customInputs: ICustomInput[];
}

const EventSchema = new mongoose.Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    day: {
      type: Number,
      required: true,
      min: 1,
    },
    startTime: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
    endTime: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
    acceptingRegistrations: {
      type: Boolean,
      default: true,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    imageKey: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    isTeamEvent: {
      type: Boolean,
      default: false,
    },
    minNumberOfTeamMembers: {
      type: Number,
      default: 1,
      min: 1,
    },
    maxNumberOfTeamMembers: {
      type: Number,
      default: 1,
      min: 1,
    },
    customInputs: {
      type: [
        {
          type: {
            type: String,
            enum: [
              "shortText",
              "select",
              "number",
              "email",
              "phone",
              "longText",
              "file",
              "date",
              "link",
              "time",
            ],
            required: true,
          },
          label: { type: String, required: true },
          placeholder: { type: String },
          required: { type: Boolean, default: false },
          options: { type: [String] },
          fileType: {
            type: String,
            enum: ["pdf", "image", "video"],
          },
          maxSize: { type: Number },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;