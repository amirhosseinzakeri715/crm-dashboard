// 'use client';

// import { useState } from "react";
// import { useRouter } from 'next/navigation';


// export default function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//     const [formData, setFormData] = useState({ 
//         id: '',
//         company_name: '',
//         email: '', 
//         phone: '', 
//         Contacted: false, 
//         Cooperated: false 
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const router = useRouter()

//     if (!isOpen) return null;
    

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, type, checked, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value,
//         }));
//     };

//     const handleCreate = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setIsSubmitting(true);

//         try {
//             const response = await fetch('http://127.0.0.1:8000/api/customers/', {
//                 method: 'POST',
//                 headers: { 
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     company_name: formData.company_name,
//                     email: formData.email,
//                     phone: formData.phone,
//                     contacted: formData.Contacted,
//                     cooperated: formData.Cooperated
//                 })
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(
//                     data.message || 
//                     data.error || 
//                     `Request failed with status ${response.status}`
//                 );
//             }
            

//             console.log('Customer created successfully:', data);
//             router.push('/dashboard')
//         } catch (error) {
//             console.error('Submission error:', error);
//             setError(error instanceof Error ? error.message : 'An unknown error occurred');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-8 rounded-2xl shadow-2xl relative  max-h-screen max-w-dvw mx-4 py-2">
//                 <button 
//                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//                     onClick={onClose}
//                     disabled={isSubmitting}
//                 >
//                     ✖
//                 </button>

//                 <form onSubmit={handleCreate} className=" space-y-4 min-sm:">
//                     <div>
//                         <h2 className="text-2xl font-bold mt-6 mb-6 text-center text-black">Customers</h2>
//                         {error && (
//                             <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//                                 {error}
//                             </div>
//                         )}
//                         <div>
//                             <label className="block mb-1 text-gray-700">Company Name</label>
//                             <input 
//                                 type="text" 
//                                 name="company_name" 
//                                 value={formData.company_name}
//                                 onChange={handleChange}
//                                 className="w-full text-black px-4 py-2 border border-gray-200 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
//                                 disabled={isSubmitting}
//                             />
//                         </div>
                        
//                         <label className="block mb-1 text-gray-700">Email</label>
//                         <input 
//                             type="email" 
//                             name="email" 
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full text-black px-4 py-2 border border-gray-200 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
//                             required
//                             disabled={isSubmitting}
//                         />
//                     </div>
//                     <div>
//                         <label className="block mb-1 text-gray-700">Phone number</label>
//                         <input 
//                             type="tel" 
//                             name="phone" 
//                             value={formData.phone}
//                             pattern="[0-9]{10}"
//                             onChange={handleChange}
//                             className="w-full text-black px-4 py-2 border border-gray-200 border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
//                             required
//                             disabled={isSubmitting}
//                         />
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <input
//                             type="checkbox"
//                             name="Contacted"
//                             checked={formData.Contacted}
//                             onChange={handleChange}
//                             id="Contacted"
//                             className="w-4 h-4"
//                             disabled={isSubmitting}
//                         />
//                         <label htmlFor="Contacted" className="text-gray-700">Contacted</label>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                         <input
//                             type="checkbox"
//                             name="Cooperated"
//                             checked={formData.Cooperated}
//                             onChange={handleChange}
//                             id="Cooperated"
//                             className="w-4 h-4 hover:shadow-lg"
//                             disabled={isSubmitting}
//                         />
//                         <label htmlFor="Cooperated" className="text-gray-700">Cooperated</label>
//                     </div>
//                     <button 
//                         type="submit"
//                         disabled={isSubmitting}
//                         className={`w-full bg-blue-600 text-white py-2 rounded-lg mb-3 hover:bg-blue-700 transition-colors ${
//                             isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
//                         }`}
//                     >
//                         {isSubmitting ? 'Submitting...' : 'Submit'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


'use client';

import { ReactNode } from 'react';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SimpleModal({ isOpen, onClose, children }: SimpleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className="bg-white rounded-lg p-6 mx-4 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}