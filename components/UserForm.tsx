import React, { useState } from 'react';
import { User } from '../types/user';

interface UserFormProps {
  onSubmit: (data: Omit<User, '_id'>) => void;
  initialData?: Omit<User, '_id'>;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState(initialData || { name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
        Submit
      </button>
    </form>
  );
};

export default UserForm;
