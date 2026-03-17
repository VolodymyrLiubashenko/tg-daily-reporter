import cron from "node-cron";
import { sendMorningReport } from "../services/reports/sendMorningReport";
import { env } from "../config/env";

let isRunning = false;

export function startMorningReportJob() {
   console.log(`Cron scheduled: ${env.cronTime} (Europe/Kyiv)`);
   cron.schedule(
      env.cronTime,
      async () => {
         if (isRunning) {
            console.log("Morning report job skipped: previous run still in progress");
            return;
         }

         try {
            isRunning = true;
            console.log("Morning report job started");
            const result = await sendMorningReport();
            console.log("Morning report sent successfully");
            console.log(result.text);
         } catch (error) {
            console.error("Morning report job failed:", error);
         } finally {
            isRunning = false;
         }
      },
      {
         timezone: "Europe/Kyiv",
      }
   );

   console.log("Morning report cron scheduled for 11:00 Europe/Kyiv");

   if (env.nodeEnv === "development") {
      console.log("Development mode: cron is active");
   }
}
