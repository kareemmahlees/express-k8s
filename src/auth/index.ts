import * as JwtStrategy from "passport-jwt";
// import passport from "passport";
import { Passport } from "passport";
import { prisma } from "@db/index";

export const passport = new Passport();

export const authGuard = passport.authenticate("jwt", { session: false });

const opts: JwtStrategy.StrategyOptions = {
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy.Strategy(opts, (jwt_payload, cb) => {
        const user = prisma.user.findFirst({
            where: {
                id: jwt_payload.sub,
            },
        });
        if (!user) {
            return cb("user not found", false);
        }
        return cb(null, user);
    })
);
