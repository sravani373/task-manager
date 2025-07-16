// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
// import TaskList from "./app/features/tasks/TaskList";


// function App() {
//   return (
//     <Provider store={store}>
//       <div className="bg-gray-100 min-h-screen p-4">
//         <TaskList />
//       </div>
//     </Provider>
//   );
// }

// export default App;
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
 import TaskList from "./app/features/tasks/TaskList";
import Login from './app/features/auth/Login';

const Root = () => {
  const token = useSelector((state) => state.auth.token);
  return <>{token ? <TaskList /> : <Login />}</>;
};

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gray-100 min-h-screen p-4">
        <Root />
      </div>
    </Provider>
  );
}

export default App;
