import { app } from "./app";
import { env } from "./config/env";
import { startMorningReportJob } from "./jobs/morningReportJob";

app.listen(env.port, () => {
   console.log(`Server started on port ${env.port}`);

   if (env.enableCron) {
      startMorningReportJob();
   } else {
      console.log("Cron is disabled");
   }
});
