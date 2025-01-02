import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DynamicForm from '../../views/DynamicForm';
import MasterSettings from '../../views/MasterSettings';
import ListForm from '../../views/DynamicForm/listForm';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListForm />} />
      <Route path="/settings" element={<MasterSettings />} />
      <Route path="/master-form" element={<DynamicForm />} />
    </Routes>
  );
};

export default AppRoutes;
