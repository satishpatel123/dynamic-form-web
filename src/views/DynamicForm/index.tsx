import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [fields, setFields] = useState<Field[]>([]); // Dynamic fields
  const [formData, setFormData] = useState<{ [key: string]: string }>({}); // Store form data

  useEffect(() => {
    // Fetch master settings
    axios.get('/api/master-settings')
      .then(response => {
        console.log('Fetched Fields:', response.data); // Debug the fetched data
        setFields(response.data);
        // Initialize formData state with default values from fields
        const initialData: { [key: string]: string } = {};
        response.data.forEach((field: Field) => {
          initialData[field.key] = field.value; // Initialize with field value
        });
        setFormData(initialData); // Set initial form data
      })
      .catch(error => console.error('Error fetching master settings', error));
  }, []);

  // Handle input change and update form data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debugger
    setFormData({
      ...formData,
      [name]: value, // Update the form data state dynamically
    });
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData); // Log the form data on submit

    // Optionally, send the form data to the backend
    // axios.post('/api/submit', formData).then(response => {
    //   console.log('Form submitted successfully:', response);
    // }).catch(error => {
    //   console.error('Error submitting form:', error);
    // });
  };

  return (
    /*  <form onSubmit={handleSubmit}>
       {fields.map(field => (
         <div key={field.id} className='p-2'>
           <label htmlFor={field.key}>{field.value}: </label>
           <input
             id={field.key}
             name={field.key}
             type={field.type} // Use the field type dynamically
             value={formData[field.key] || ''} // Bind value from formData state
             onChange={handleInputChange} // Handle input change
             required={field.required} // Apply required field conditionally
           />
         </div>
       ))}
       <button type="submit">Submit</button>
     </form> */

    <div className="p-4">
      <h1 className="text-2xl mb-4">Master Settings</h1>
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

        {/* Display error message */}
        {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

        <div className="mt-4">

          <button
            type="submit"
            className="bg-green-500 text-white p-2"
          // disabled={loading} // Disable the button when loading
          >
            {'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
