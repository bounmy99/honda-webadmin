
"use client";
import React, { useState } from 'react';
import Caregivers from './components/Caregivers';
import PermissionMatrix from './components/PermissionMatrix';
import SideBar from "../Dashboard/components/SideBar";
import Topbar from "./components/Topbar";

const App = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'permissions'
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);

  const handleViewPermissions = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setCurrentView('permissions');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCaregiver(null);
  };

  return (
    <>
    <Topbar/>
    <SideBar />
    <div className="min-h-screen bg-gray-100 ml-64">
      {currentView === 'list' ? (
        <Caregivers onViewPermissions={handleViewPermissions} />
      ) : (
        <PermissionMatrix 
          selectedCaregiver={selectedCaregiver} 
          onBack={handleBackToList} 
        />
      )}
    </div>
    </>
  );
};

export default App;