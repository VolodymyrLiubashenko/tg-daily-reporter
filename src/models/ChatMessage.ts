import { Schema, model, InferSchemaType } from "mongoose";

const chatMessageSchema = new Schema(
   {
      chatId: {
         type: String,
         required: true,
         index: true,
      },
      telegramUserId: {
         type: String,
         required: true,
         index: true,
      },
      messageId: {
         type: String,
         required: true,
      },
      sentAt: {
         type: Date,
         required: true,
         index: true,
      },
   },
   {
      timestamps: true,
   }
);

chatMessageSchema.index({ chatId: 1, sentAt: 1 });
chatMessageSchema.index({ chatId: 1, telegramUserId: 1, sentAt: 1 });

export type TChatMessage = InferSchemaType<typeof chatMessageSchema>;

export const ChatMessageModel = model("ChatMessage", chatMessageSchema);
