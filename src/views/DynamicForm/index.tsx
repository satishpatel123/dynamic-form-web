import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

type Field = {
  id: number;
  key: string;
  label: string;
  type: string;
  value: string;
  formValue: string;
  required: boolean;
};

const DynamicForm = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState<Field[]>([]); // Dynamic fields
  const [formData, setFormData] = useState<{ [key: string]: string }>({}); // Store form data

  useEffect(() => {
    fetchFormSettings()
    axios.get('/api/master-settings')
      .then(response => {
        console.log('response.data => ',response.data);
        
        setFields(response.data);
        const initialData: { [key: string]: string } = {};
        response.data.forEach((field: Field) => {
          initialData[field.key] = field.value;
        });
        setFormData(initialData);
      })
      .catch(error => console.error('Error fetching master settings', error));
  }, []);


  const fetchFormSettings = async () => {
    try {
      const response = await axios.get('/api/master-settings/get-save-from-one');
      console.log('response => ',response.data.data);
      
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };
  
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/master-settings/save-form', {value : formData}).then(response => {
      if(response.data.status) {
          navigate('/')
          return response.data.status;
      } else {
        return false;
      }
      
    }).catch(error => {
      console.error('Error submitting form:', error);
    });
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Master Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {fields.map((field, index) => (
            <>
              <div key={index} className="flex items-center justify-between">
                <div>
                  <label className='mr-2'>{field.value}</label>
                  <input
                    type="text"
                    name={field.key}
                    className="border p-2"
                    value={field.formValue}
                    onChange={(e) => handleInputChange(e)}
                    placeholder={`Enter ${field.value}`}
                  />
                </div>
                <div>&nbsp;</div>
              </div>
              <hr />
            </>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="submit" className="bg-green-500 text-white p-2"                 >
            {'Save & Edit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
