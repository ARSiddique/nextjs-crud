"use client"
import { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import axios from 'axios';
import { User } from '../types/user';

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await axios.get('/pages/api/users');
    setUsers(response.data);
  };

  const handleCreate = async (data: Omit<User, '_id'>) => {
    await axios.post('/pages/api/users', data);
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/pages/api/users?id=${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">User Management</h1>
      <UserForm onSubmit={handleCreate} />
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
};

export default HomePage;
