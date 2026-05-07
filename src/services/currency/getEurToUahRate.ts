import axios from "axios";

export type TEurToUahRate = {
   currencyCode: string;
   rate: number;
   date: string;
};

export async function getEurToUahRate(): Promise<TEurToUahRate> {
   const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json";

   const response = await axios.get(url, {
      timeout: 15000,
   });

   const data = response.data;

   if (!Array.isArray(data) || !data.length) {
      throw new Error("Failed to get EUR to UAH rate");
   }

   const item = data[0];

   if (!item?.rate || !item?.cc || !item?.exchangedate) {
      throw new Error("Invalid currency response format");
   }

   return {
      currencyCode: item.cc,
      rate: Number(item.rate),
      date: item.exchangedate,
   };
}
