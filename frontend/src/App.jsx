
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskList from './app/features/tasks/TaskList';
import Login from './app/features/auth/Login';
import Signup from './app/features/auth/Signup';

const Root = () => {
  const token = useSelector((state) => state.auth.token);
  const [showSignup, setShowSignup] = useState(false);

  if (token) return <TaskList />;

  return (
    <div>
      {showSignup ? <Signup /> : <Login />}
      <p className="text-center mt-4">
        {showSignup ? (
          <>
            Already have an account?{' '}
            <button onClick={() => setShowSignup(false)} className="text-blue-600 underline">
              Login
            </button>
          </>
        ) : (
          <>
            Don’t have an account?{' '}
            <button onClick={() => setShowSignup(true)} className="text-green-600 underline">
              Register
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default Root;

// import { Routes, Route, Navigate } from 'react-router-dom';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import TaskList from './app/features/tasks/TaskList';
// import Login from './app/features/auth/Login';
// import Signup from './app/features/auth/Signup';

// const App = () => {
//   const token = useSelector((state) => state.auth.token);

//   return (
//     <Routes>
//       {/* Default route */}
//       <Route path="/" element={token ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />

//       {/* Auth routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Protected route */}
//       <Route path="/tasks" element={token ? <TaskList /> : <Navigate to="/login" />} />
//     </Routes>
//   );
// };

// export default App;

