import { Schema, model, InferSchemaType } from "mongoose";

const chatUserSchema = new Schema(
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
      username: {
         type: String,
         default: null,
      },
      firstName: {
         type: String,
         default: null,
      },
      lastName: {
         type: String,
         default: null,
      },
      isBot: {
         type: Boolean,
         default: false,
      },
      lastMessageAt: {
         type: Date,
         default: null,
      },
      messageCountTotal: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

chatUserSchema.index({ chatId: 1, telegramUserId: 1 }, { unique: true });

export type TChatUser = InferSchemaType<typeof chatUserSchema>;

export const ChatUserModel = model("ChatUser", chatUserSchema);
