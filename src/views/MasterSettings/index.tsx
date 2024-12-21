import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the type for each form field
interface DynamicField {
  key: string;
  value: string;
}

const MasterSettings: React.FC = () => {
  const [fields, setFields] = useState<DynamicField[]>([{ key: '', value: '' }]); // Initialize with one empty field
  const [deletedFields, setDeletedFields] = useState<string[]>([]); // To track deleted keys
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Fetch settings when the component mounts (optional)
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get<DynamicField[]>('/api/master-settings');
      setFields(response?.data || []); // Populate with fetched data
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  // Add a new dynamic field to the form
  const addField = () => {
    setFields([...fields, { key: '', value: '' }]);
  };

  // Remove a field and track it for deletion
  const removeField = (index: number) => {
    const fieldToDelete = fields[index].key;
    setDeletedFields([...deletedFields, fieldToDelete]); // Track the field for deletion
    const updatedFieldsList = fields.filter((_, idx) => idx !== index);
    setFields(updatedFieldsList);
  };

  // Handle changes to dynamic fields and track updates
  const handleFieldChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFieldsList = [...fields];
    updatedFieldsList[index] = { ...updatedFieldsList[index], [event.target.name]: event.target.value };
    setFields(updatedFieldsList);
  };

  // Submit the form and store the dynamic fields in the database
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate if fields are empty
    const hasEmptyField = fields.some((field) => !field.key || !field.value);
    if (hasEmptyField) {
      setErrorMessage('All fields must have a key and value.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    // Prepare payload for the submit request
    const payload = {
      updatedSettings: fields,
      deletedSettings: deletedFields,
    };

    try {
      await axios.put('/api/master-settings', payload);
      fetchSettings(); // Refresh after submit
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error saving settings.');
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Master Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {fields.map((field, index) => (
            <>
              <div key={index} className="flex items-center justify-between">
                <div>
                  <label className='mr-2'>Field Name</label>
                  <input
                    type="text"
                    name="key"
                    className="border p-2"
                    value={field.key}
                    onChange={(e) => handleFieldChange(index, e)}
                    placeholder="Key"
                  />

                </div>
                <div>
                  <label className='mr-2'>Field Label</label>
                  <input
                    type="text"
                    name="value"
                    className="border p-2"
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, e)}
                    placeholder="Value"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
                <div>&nbsp;</div>
              </div>
              <hr />
            </>
          ))}
        </div>

        {/* Display error message */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="mt-4">
          <button
            type="button"
            onClick={addField}
            className="bg-blue-500 text-white p-2 mr-4"
          >
            Add Field
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2"
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MasterSettings;
