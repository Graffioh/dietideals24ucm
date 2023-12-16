import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials, req) {
                
            }
        })
    ]
})

export {handler as GET, handler as POST};