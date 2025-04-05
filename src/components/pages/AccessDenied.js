import React from 'react';

function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-lg text-gray-700">You do not have permission to view this page.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500">
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default AccessDenied;
