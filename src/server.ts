import dns from "node:dns";

// Many VPS / containers advertise broken IPv6; Node may prefer it and HTTPS hangs.
dns.setDefaultResultOrder("ipv4first");

import { app } from "./app";
import { env } from "./config/env";
import { startMorningReportJob } from "./jobs/morningReportJob";
import { connectToMongo } from "./db/mongo";

app.listen(env.port, async () => {
   await connectToMongo();

   console.log(`Server started on port ${env.port}`);

   if (env.enableCron) {
      startMorningReportJob();
   } else {
      console.log("Cron is disabled");
   }
});
