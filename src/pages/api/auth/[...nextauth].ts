import axios from 'axios';
import NextAuth, {
    Awaitable,
    NextAuthOptions,
    RequestInternal,
    User,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
    ],
};

export default NextAuth(options);
