import { Schema, model, InferSchemaType } from "mongoose";

const weeklyWinnerSchema = new Schema(
   {
      chatId: {
         type: String,
         required: true,
         index: true,
      },
      telegramUserId: {
         type: String,
         required: true,
      },
      username: {
         type: String,
         default: null,
      },
      firstName: {
         type: String,
         default: null,
      },
      weekStart: {
         type: Date,
         required: true,
      },
      weekEnd: {
         type: Date,
         required: true,
      },
      pickedAt: {
         type: Date,
         required: true,
         default: () => new Date(),
      },
   },
   {
      timestamps: true,
   }
);

export type TWeeklyWinner = InferSchemaType<typeof weeklyWinnerSchema>;

export const WeeklyWinnerModel = model("WeeklyWinner", weeklyWinnerSchema);
