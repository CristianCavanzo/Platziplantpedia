import { NextPage, NextPageContext } from 'next';
import React, { ReactElement } from 'react';

type ErrorPageProps = {
    statusCode: number;
    message: string;
};

const Error: NextPage<ErrorPageProps> = ({
    statusCode,
    message,
}): ReactElement => {
    return (
        <div>
            <p>
                {statusCode} - {message}
            </p>
        </div>
    );
};

Error.getInitialProps = async ({
    res,
    err,
}: NextPageContext): Promise<ErrorPageProps> => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode: statusCode || 404, message: 'An error occurred' };
};

export default Error;
