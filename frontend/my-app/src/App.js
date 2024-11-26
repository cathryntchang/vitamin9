import React, { useState, useEffect } from 'react';

const QuoteGenerator = ({ backendUrl }) => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/random-quote`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const data = await response.json();
      setQuote(data);
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Could not retrieve a quote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, [backendUrl]);

  if (isLoading) {
    return <div className="text-center p-4">Loading quote...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
        <button 
          onClick={fetchRandomQuote} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <blockquote className="mb-4 italic">
        "{quote.quote}"
      </blockquote>
      <p className="text-right font-semibold text-gray-600">
        - {quote.author}
      </p>
      <button 
        onClick={fetchRandomQuote} 
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate New Quote
      </button>
    </div>
  );
};

const App = () => {
  const BACKEND_URL = 'http://localhost:4000/api/random-quote';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <QuoteGenerator backendUrl={BACKEND_URL} />
    </div>
  );
};

export default App;