import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/libs/axiosConfig";

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                const { email, password } = credentials;
                try {
                    const res = await axiosInstance.post("/api/v1/auth/login", { email, password });
                    if (res.data?.succes) {
                        return res.data?.payload;
                    }
                    else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            },

        }),
    ],
    callbacks: {
        // async signIn(data) {
        //     return true;
        // },
        async jwt({ token, user }) {
            //@ts-ignore
            const id = user?._id;
            console.log(id);
            if (id) {
                token.id = id;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token?.id;
            }
            return session;
        }

    },
    secret: process.env.NEXT_SECRET,
    pages: {
        signIn: "/login",
    }
});

export { handler as GET, handler as POST };