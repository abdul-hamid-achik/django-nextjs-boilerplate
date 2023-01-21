import NextAuth, {Session, SessionStrategy} from "next-auth";
import jwtDecode from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import {Configuration, IdentityApi, User} from '../../../client';

const identityApi = new IdentityApi(new Configuration({basePath: process.env.BACKEND_URL}));

interface CustomSession extends Session {
    access?: string;
    refresh?: string;
    exp?: number;
}

interface Token {
    access?: string;
    refresh?: string;
    user?: User;
    exp?: number;
}

async function refreshAccessToken(token: Token) {
    const response = await identityApi.createTokenRefresh({"refresh": token.refresh});
    return {
        ...token,
        ...response?.data,
        // @ts-ignore
        ...jwtDecode(response.data?.access as string)
    };
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    pages: {
        signup: "/signup",
        signin: '/signin',
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign-in form (e.g. 'Sign in with...')
            name: "Project Template",
            // The credentials is used to generate a suitable form on the sign-in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: {
                    label: "Username",
                    type: "username",
                    placeholder: "username",
                },
                password: {label: "Password", type: "password"},
            },

            async authorize(credentials) {
                try {
                    const {data: token} = await identityApi.createTokenObtainPair(credentials);
                    const {user_id}: any =
                        jwtDecode((token as Token)?.access as string);

                    const {data: user} = await identityApi.retrieveUser(user_id);

                    return {
                        ...token,
                        id: user_id,
                        user
                    };
                } catch (error) {
                    console.error(error.message);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async redirect({url, baseUrl}: { url: string; baseUrl: string }) {
            return url.startsWith(baseUrl)
                ? Promise.resolve(url)
                : Promise.resolve(baseUrl);
        },
        async jwt({
                      token,
                      user,
                      account,
                  }: { token: { exp: number }; user: User; account: any; profile: any; isNewUser: boolean }) {
            // initial signin
            if (account && user) {
                return user;
            }

            // Return previous token if the access token has not expired
            if (Date.now() < token.exp * 100) {
                return token;
            }

            // refresh token
            return refreshAccessToken(token);
        },
        async session({
                          session,
                          token,
                          user
                      }: { session: CustomSession, user: User, token: Token }) {
            console.log("session", session, token, user);
            session.user = user;
            session.access = token.access;
            session.refresh = token.refresh;
            session.exp = token.exp;
            return session;
        },
    },
    session: {
        strategy: "jwt" as SessionStrategy,
    },
};

// @ts-ignore
export default NextAuth(authOptions);