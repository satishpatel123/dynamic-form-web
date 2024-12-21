import React, { PropsWithChildren } from 'react';

const MainContainer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex-1 bg-gray-100 p-6">
      {children}
    </div>
  );
};

export default MainContainer;
