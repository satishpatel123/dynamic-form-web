import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DynamicForm from '../../views/DynamicForm';
import MasterSettings from '../../views/MasterSettings';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DynamicForm />} />
      <Route path="/settings" element={<MasterSettings />} />
    </Routes>
  );
};

export default AppRoutes;
