import React, { useState, useEffect } from 'react';


const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-4 text-lg font-semibold text-gray-700">Fetching Patient Data...</p>
  </div>
);

const PatientCard = ({ patient }) => {
  const statusStyles = {
    Stable: 'bg-green-100 text-green-800',
    Warning: 'bg-yellow-100 text-yellow-800',
    Critical: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
      <div className={`border-l-4 ${patient.borderColor}`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 tracking-wide">
                {patient.id}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{patient.name}</h2>
            </div>
            <div className={`p-3 rounded-full ${patient.iconBgColor}`}>
              {patient.vitals.icon}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-base text-gray-600">{patient.vitals.label}</p>
            <p className="text-4xl font-bold text-gray-900">{patient.vitals.value}</p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
             <div className="flex items-center">
                <p className="text-sm font-medium text-gray-500">Status:</p>
                <span className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[patient.status]}`}>
                  {patient.status}
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mockPatients = [
  {
    id: 'P001',
    name: 'John Doe',
    status: 'Stable',
    borderColor: 'border-green-500',
    iconBgColor: 'bg-green-100',
    vitals: {
      label: 'Heart Rate',
      value: '72 bpm',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  },
  {
    id: 'P002',
    name: 'Jane Smith',
    status: 'Warning',
    borderColor: 'border-yellow-500',
    iconBgColor: 'bg-yellow-100',
    vitals: {
      label: 'Temperature',
      value: '101.2°F',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  },
  {
    id: 'P003',
    name: 'Sam Wilson',
    status: 'Critical',
    borderColor: 'border-red-500',
    iconBgColor: 'bg-red-100',
    vitals: {
      label: 'Blood Pressure',
      value: '160/95 mmHg',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  },
];

export default function App() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data with a delay when the component mounts.
  useEffect(() => {
    const timer = setTimeout(() => {
      setPatients(mockPatients);
      setIsLoading(false);
    }, 2000); // 2-second delay

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Patient Vitals Dashboard</h1>
            <span className="flex items-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="ml-2 text-sm font-medium text-gray-600">Live</span>
            </span>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        {isLoading ? (
          <div className="flex items-center justify-center" style={{height: '60vh'}}>
             <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-6 mt-8">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} DiceMed Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
