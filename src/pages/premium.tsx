import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
};

const Premium = () => {
    const { status, data } = useSession();
    if (status === 'loading') {
        return null;
    }
    if (status === 'unauthenticated') {
        return <p>Acceso denegado</p>;
    }

    return <p>Contenido secreto</p>;
};

export default Premium;
