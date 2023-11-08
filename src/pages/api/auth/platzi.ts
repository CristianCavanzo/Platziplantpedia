import type { NextApiHandler } from 'next';
const handler: NextApiHandler<User> = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { password } = req.body;
    if (password === 'aprender') {
        const PlatziUser: User = {
            name: 'Platzi User',
            email: 'student@platzi.com',
            image: '',
        };
        return res.status(200).json(PlatziUser);
    }
    res.status(401).end();
};
export default handler;
