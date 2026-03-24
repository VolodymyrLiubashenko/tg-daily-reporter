import { Schema, model, InferSchemaType } from "mongoose";

const botMessageSchema = new Schema({
   chatId: {
      type: String,
      required: true,
      index: true,
   },
   message: {
      type: String,
      required: true,
   },
   sentAt: {
      type: Date,
      required: true,
      index: true,
   },
});

export type TBotMessage = InferSchemaType<typeof botMessageSchema>;
export const BotMessageModel = model("BotMessage", botMessageSchema);
