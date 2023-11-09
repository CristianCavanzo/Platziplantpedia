import type { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';
const handler: NextApiHandler = async (req, res) => {
    const random = Math.floor(Math.random() * 122) + 1;
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).end();
    }
    res.json({
        data: `https://randomfox.ca/images/${random}`,
        time: new Date().getTime(),
    });
};
export default handler;
