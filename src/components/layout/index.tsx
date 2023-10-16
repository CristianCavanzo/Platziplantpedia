import { Nav } from '@components/nav';
import { Hind, Montserrat } from 'next/font/google';
import { ReactNode } from 'react';
export const montserrat = Montserrat({
    display: 'swap',
    weight: 'variable',
    subsets: ['latin'],
});
export const hind = Hind({
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
});
interface Props {
    children: ReactNode;
}
const Layout = ({ children }: Props) => {
    return (
        <div className={`${hind.className} w-11/12 m-auto pt-4`}>
            <Nav />
            {children}
        </div>
    );
};

export { Layout };
