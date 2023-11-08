import axios from 'axios';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

const options: NextAuthOptions = {
    theme: {
        colorScheme: 'light',
    },
    debug: true,
    session: {},
    jwt: {},
    providers: [
        CredentialsProvider({
            name: 'Platzi',
            credentials: {
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Nunca pares de...',
                },
            },
            authorize: async (
                credentials: Record<'password', string> | undefined
            ) => {
                try {
                    const response = await axios({
                        method: 'post',
                        url: `${process.env.NEXTAUTH_URL}/api/auth/platzi`,
                        data: credentials,
                    });
                    console.log(response.data);
                    return response.data as User;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
        GitHubProvider({
            clientId: process.env.NEXT_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET as string,
        }),
    ],
};

export default NextAuth(options);
