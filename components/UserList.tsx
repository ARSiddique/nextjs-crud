import React from 'react';
import { User } from '../types/user';

interface UserListProps {
    users: User[];
    onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
    return (
        <div className="space-y-4">
            {users.map((user) => (
                <div
                    key={user._id}
                    className="flex items-center justify-between p-4 border rounded"
                >
                    <div>
                        <p className="font-bold">{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                    <button
                        onClick={() => onDelete(user._id!)}
                        className="px-4 py-2 text-white bg-red-500 rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UserList;
