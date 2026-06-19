export type TSendMessageByAdminRequest = {
   text: string;
};

export type TSendMessageByAdminResponse = {
   ok: boolean;
   message: string;
   result?: unknown;
};

export type TEditMessageByAdminRequest = {
   text: string;
};

export type TEditMessageByAdminResponse = {
   ok: boolean;
   message: string;
   editedText: string;
};
