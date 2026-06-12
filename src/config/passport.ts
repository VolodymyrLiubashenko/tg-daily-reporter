import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { env } from "./env";

const { googleClientId, googleClientSecret, googleCallbackUrl } = env;

if (googleClientId && googleClientSecret && googleCallbackUrl) {
   passport.use(
      new GoogleStrategy(
         {
            clientID: googleClientId,
            clientSecret: googleClientSecret,
            callbackURL: googleCallbackUrl,
         },
         async (_accessToken, _refreshToken, profile, done) => {
            const user = {
               id: profile.id,
               displayName: profile.displayName,
               email: profile.emails?.[0]?.value,
               photo: profile.photos?.[0]?.value,
            };

            return done(null, user);
         }
      )
   );
}

passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser((user, done) => {
   done(null, user as Express.User);
});

export { passport };
