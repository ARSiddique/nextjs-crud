import axios from "axios";
import { User } from "../types/user";

const API_URL = "/api/users";

export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/${id}`);
    return response.data;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    const response = await axios.post<User>(API_URL, user);
    return response.data;
};

export const updateUser = async (id: number, user: Omit<User, "id">): Promise<User> => {
    const response = await axios.put<User>(`${API_URL}/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
