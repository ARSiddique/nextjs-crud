import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import { User } from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    const { method } = req;

    switch (method) {
        case 'GET': // Read all users
            const users = await User.find({});
            res.status(200).json(users);
            break;

        case 'POST': // Create user
            try {
                const user = new User(req.body);
                await user.save();
                res.status(201).json(user);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        case 'PUT': // Update user
            try {
                const { id } = req.query;
                const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        case 'DELETE': // Delete user
            try {
                const { id } = req.query;
                await User.findByIdAndDelete(id);
                res.status(200).json({ message: 'User deleted' });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
