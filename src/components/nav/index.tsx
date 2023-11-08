import { montserrat } from '@components/layout';
import Cookie from 'js-cookie';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';

const Login = () => {
    const { status, data } = useSession();
    if (status === 'loading') {
        return null;
    }
    if (status === 'unauthenticated') {
        return <button onClick={() => signIn()}>Sign in</button>;
    }
    return (
        <Fragment>
            <p>Hello, {data?.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </Fragment>
    );
};

export const Nav = () => {
    const changeLanguage = (locale: string) => {
        Cookie.set('NEXT_LOCALE', locale);
    };
    return (
        <nav
            className={`${montserrat.className} pb-1 border-b-2 border-black mb-4`}
        >
            <ul className="flex items-center justify-between">
                <li className="text-2xl font-bold">
                    <Link href="/">🌿 Plantpedia</Link>
                </li>
                {/* <li>
                    <div className="w-6 flex flex-col gap-y-1">
                        <div className="h-1 w-full bg-black"></div>
                        <div className="h-1 w-full bg-black"></div>
                        <div className="h-1 w-full bg-black"></div>
                    </div>
                </li> */}
                <li>
                    <Link href="/search">Search</Link>
                </li>
                <li>
                    <Link href="/top-stories/">Top stories</Link>
                </li>
            </ul>
            <Login />
            <div className="lenguage">
                <Link href="/" locale="en-US">
                    <p onClick={() => changeLanguage('en-US')}>English</p>
                </Link>
                <Link href="/" locale="es">
                    <p onClick={() => changeLanguage('="es')}>Español</p>
                </Link>
            </div>
        </nav>
    );
};
