import React from 'react';

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const isPasswordRequired = error.includes("cannot be unlocked automatically");
  
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {isPasswordRequired ? "Password Required" : "Error"}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            {isPasswordRequired ? (
              <p>
                This PDF is password protected and cannot be unlocked automatically. 
                Please try using a different PDF or contact the PDF owner for the password.
              </p>
            ) : (
              <p>{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay; 