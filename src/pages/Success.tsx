import React from 'react';

export function Success() {
  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase.</p>
      <a
        href="/"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Return to Shop
      </a>
    </div>
  );
}
