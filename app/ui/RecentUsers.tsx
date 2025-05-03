/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FiMail, FiPhone, FiHome } from "react-icons/fi";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface User {
  id: number;
  company_name: string;
  phone: string;
  email: string;
  contacted: "true" | "false";
  cooperated: "true" | "false";
}

export default function RecentUsers() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    contacted: false,
    cooperated: false,
  });

  const API_URL = 'http://127.0.0.1:8000/api/customers/';

  const openProductModal = () => {
    setIsProductModalOpen(true);
    setError(null);
    setFormData({ company_name: '', email: '', phone: '', contacted: false, cooperated: false });
  };
  const closeProductModal = () => setIsProductModalOpen(false);

  const openUserModal = (user: User) => setActiveUser(user);
  const closeUserModal = () => setActiveUser(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          company_name: formData.company_name,
          email: formData.email,
          phone: formData.phone,
          contacted: formData.contacted ? "true" : "false",
          cooperated: formData.cooperated ? "true" : "false",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const newUser = await response.json();
      setUsers((prevUsers) => [newUser, ...prevUsers]);
      setFormData({ company_name: '', email: '', phone: '', contacted: false, cooperated: false });
      toast.success('Customer created successfully!');
      closeProductModal();
    } catch (err: any) {
      console.error('Error creating user:', err);
      const errorMessage = err.message || 'Failed to create customer. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (userId: number, field: 'contacted' | 'cooperated') => {
    try {
      const user = users.find((u) => u.id === userId);
      if (!user) {
        console.error('User not found:', userId);
        return;
      }

      const newValue = user[field] === "true" ? "false" : "true";
      console.log('Sending PUT request:', {
        url: `${API_URL}${userId}/`,
        payload: { ...user, [field]: newValue },
      });

      const response = await fetch(`${API_URL}${userId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...user, [field]: newValue }),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      const updatedUser = {
        ...responseData,
        contacted: responseData.contacted ? "true" : "false",
        cooperated: responseData.cooperated ? "true" : "false",
      };

      setUsers((prev) => {
        const newUsers = prev.map((u) => (u.id === userId ? updatedUser : u));
        if (activeUser && activeUser.id === userId) {
          setActiveUser(updatedUser); 
        }
        console.log('Updated users:', newUsers);
        return newUsers;
      });
      toast.success(`${field === 'contacted' ? 'Contacted' : 'Cooperated'} status updated!`);
    } catch (err: any) {
      console.error('Error updating status:', err);
      const errorMessage = err.message || 'Failed to update status';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(
          data.map((item: any) => ({
            id: item.id,
            company_name: item.company_name,
            phone: item.phone,
            email: item.email,
            contacted: item.contacted ? "true" : "false",
            cooperated: item.cooperated ? "true" : "false",
          }))
        );
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-black mb-6">Recent Customers</h2>
        <p>Loading customers...</p>
      </div>
    );
  }

  if (error && !isProductModalOpen) {
    return (
      <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-black mb-6">Recent Customers</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-6 relative max-w-dvw">
      <h2 className="text-xl font-bold text-black mb-6">Recent Customers</h2>
      <button
        className="absolute top-6 right-6 px-3 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={openProductModal}
      >
        Add Customer
      </button>

      <Modal isOpen={isProductModalOpen} onClose={closeProductModal}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-black mb-4">Add Customer</h2>
          {error && (
            <div className="text-red-500 mb-4 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">Company Name*</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="w-full text-black px-4 py-2 border border-gray-200 border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full text-black px-4 py-2 border border-gray-200 border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Phone*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full text-black px-4 py-2 border border-gray-200 border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="contacted"
                  checked={formData.contacted}
                  onChange={handleChange}
                  id="contacted"
                  className="w-4 h-4"
                  disabled={isSubmitting}
                />
                <label htmlFor="contacted" className="text-gray-700">Contacted</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="cooperated"
                  checked={formData.cooperated}
                  onChange={handleChange}
                  id="cooperated"
                  className="w-4 h-4"
                  disabled={isSubmitting}
                />
                <label htmlFor="cooperated" className="text-gray-700">Cooperated</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Submitting...' : 'Create Customer'}
            </button>
          </form>
        </div>
      </Modal>

      {activeUser && (
        <Modal isOpen={!!activeUser} onClose={closeUserModal}>
          <div className="p-6 text-black">
            <h2 className="text-2xl font-extrabold mb-6 text-black">Customer Info</h2>

            <table className="w-full mb-6">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-semibold w-1/3">Company:</td>
                  <td className="py-3">{activeUser.company_name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-semibold">Email:</td>
                  <td className="py-3">{activeUser.email}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-semibold">Phone:</td>
                  <td className="py-3">{activeUser.phone}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-semibold">Contacted:</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activeUser.contacted === "true"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {activeUser.contacted === "true" ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Cooperated:</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activeUser.cooperated === "true"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {activeUser.cooperated === "true" ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                onClick={() => handleToggleStatus(activeUser.id, 'contacted')}
                className="bg-blue-600 text-white rounded-lg font-bold py-2 px-4 hover:bg-blue-700 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Toggle Contacted
              </button>
              <button
                onClick={() => handleToggleStatus(activeUser.id, 'cooperated')}
                className="bg-blue-600 text-white rounded-lg font-bold py-2 px-4 hover:bg-blue-700 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Toggle Cooperated
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full" role="grid">
          <thead>
            <tr className="border-b border-blue-200">
              <th className="text-left py-3 px-4 text-gray-600">Company Name</th>
              <th className="text-left py-3 px-4 text-gray-600">Email</th>
              <th className="text-left py-3 px-4 text-gray-600">Phone</th>
              <th className="text-left py-3 px-4 text-gray-600">Cooperated</th>
              <th className="text-left py-3 px-4 text-gray-600">Contacted</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => openUserModal(user)}
                  onKeyDown={(e) => e.key === 'Enter' && openUserModal(user)}
                  tabIndex={0}
                  role="button"
                  className="border-b border-blue-200 hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-3 px-4 text-black">
                    <div className="flex items-center">
                      <FiHome className="mr-2 text-blue-500" />
                      {user.company_name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-black">
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-blue-500" />
                      {user.email}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-black">
                    <div className="flex items-center">
                      <FiPhone className="mr-2 text-blue-500" />
                      {user.phone}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.cooperated === "true"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.cooperated === "true" ? "Cooperated" : "Not Cooperated"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.contacted === "true"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.contacted === "true" ? "Contacted" : "Not Contacted"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No customers found. Click &quot;Add Customer&quot; to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}