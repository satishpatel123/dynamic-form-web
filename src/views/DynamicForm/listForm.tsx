import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface InvoiceData {
  _id: string;
  value: {
    invoiceName: string;
    invoiceNo: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ListForm = () => {
  const navigate = useNavigate()
  const [dynamicFormData, setDynamicFormData] = useState<InvoiceData[]>([]); // Store form data

  useEffect(() => {
    axios
      .get("/api/master-settings/get-save-form")
      .then((response) => {
        setDynamicFormData(response.data.data); // Set initial form data
      })
      .catch((error) => console.error("Error fetching master settings", error));
  }, []);

  const handleFormClick = () => {
    navigate('/master-form')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Invoice Form</h1>
      <div className="flex justify-end">
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleFormClick}
        >
          Add & Edit Form
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Invoice No
              </th>
              <th scope="col" className="px-6 py-3">
                Invoice Name
              </th>
            </tr>
          </thead>
          <tbody>
            {dynamicFormData.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.value.invoiceNo}
                </th>
                <td className="px-6 py-4">{item.value.invoiceName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListForm;
