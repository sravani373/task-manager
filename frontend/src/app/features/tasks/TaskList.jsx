
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchTasks,
//   addTask,
//   updateTask,
//   deleteTask,
// } from './taskSlice';

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const { items } = useSelector((state) => state.tasks);
//   console.log("items:", items);
//   const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });
//   const [editId, setEditId] = useState(null);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
  


//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editId) {
//       dispatch(updateTask({ ...form, _id: editId }));
//       setEditId(null);
//     } else {
//       dispatch(addTask(form));
//     }
//     setForm({ title: '', description: '', status: 'Pending' });
//   };

//   const handleEdit = (task) => {
//     setForm({ title: task.title, description: task.description, status: task.status });
//     setEditId(task._id);
//   };

//   const toggleStatus = (task) => {
//     const newStatus = task.status === 'Done' ? 'Pending' : 'Done';
//     dispatch(updateTask({ ...task, status: newStatus }));
//   };

//   const filteredTasks = items.filter((task) => {
//     const matchesStatus = statusFilter ? task.status === statusFilter : true;
//     // const matchesDate = dateFilter
//     //   ? new Date(task.createdAt).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
//     //   : true;
//     const matchesDate = dateFilter
//   ? new Date(task.createdAt).toISOString().split('T')[0] === dateFilter
//   : true;

//     return matchesStatus && matchesDate;
//   });

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">My Tasks</h2>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <div>
//           <label>Status Filter: </label>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border p-1 ml-1"
//           >
//             <option value="">All</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Done">Done</option>
//           </select>
//         </div>

//         <div>
//           <label>Date Filter: </label>
//           <input
//             type="date"
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//             className="border p-1 ml-1"
//           />
//         </div>
//       </div>

//       {/* Task Form */}
//       <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="border p-2 flex-1 min-w-[150px]"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="border p-2 flex-1 min-w-[150px]"
//           required
//         />
//         <select
//           value={form.status}
//           onChange={(e) => setForm({ ...form, status: e.target.value })}
//           className="border p-2"
//         >
//           <option value="Pending">Pending</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Done">Done</option>
//         </select>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           {editId ? 'Update' : 'Add'}
//         </button>
//       </form>

//       {/* Task List */}
//       {filteredTasks.map((task) => (
//         <div key={task._id} className="bg-white rounded shadow p-4 mb-3">
//           <h3 className="text-lg font-semibold">{task.title}</h3>
//           <p>{task.description}</p>
//           <p className="text-sm text-gray-500">
//             Created at: {new Date(task.createdAt).toLocaleString()}
//           </p>
//           <span
//             className={`text-xs px-2 py-1 rounded inline-block mt-1 text-white ${
//               task.status === 'Done'
//                 ? 'bg-green-500'
//                 : task.status === 'In Progress'
//                 ? 'bg-yellow-500'
//                 : 'bg-red-500'
//             }`}
//           >
//             {task.status}
//           </span>

//           <div className="mt-3 flex gap-2 text-sm">
//             <button
//               className="text-blue-600 hover:underline"
//               onClick={() => handleEdit(task)}
//             >
//               Edit
//             </button>
//             <button
//               className="text-red-600 hover:underline"
//               onClick={() => dispatch(deleteTask(task._id))}
//             >
//               Delete
//             </button>
//             <button
//               className="text-green-600 hover:underline"
//               onClick={() => toggleStatus(task)}
//             >
//               {task.status === 'Done' ? 'Mark Incomplete' : 'Mark Complete'}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskList;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from './taskSlice';
import { logout } from '../auth/authSlice'; // ✅ Import logout
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Hook for redirect
  const { items } = useSelector((state) => state.tasks);
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });
  const [editId, setEditId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateTask({ ...form, _id: editId }));
      setEditId(null);
    } else {
      dispatch(addTask(form));
    }
    setForm({ title: '', description: '', status: 'Pending' });
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description, status: task.status });
    setEditId(task._id);
  };

  

  const toggleStatus = (task) => {
    const newStatus = task.status === 'Done' ? 'Pending' : 'Done';
    dispatch(updateTask({ ...task, status: newStatus }));
  };

  const handleLogout = () => {
    dispatch(logout());        // ✅ Clear auth state
    navigate('/');             // ✅ Redirect to Login
  };

  const filteredTasks = items.filter((task) => {
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesDate = dateFilter
      ? new Date(task.createdAt).toISOString().split('T')[0] === dateFilter
      : true;
    return matchesStatus && matchesDate;
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Tasks</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label>Status Filter: </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-1 ml-1"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label>Date Filter: </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border p-1 ml-1"
          />
        </div>
      </div>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 flex-1 min-w-[150px]"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 flex-1 min-w-[150px]"
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      {/* Task List */}
      {filteredTasks.map((task) => (
        <div key={task._id} className="bg-white rounded shadow p-4 mb-3">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </p>
          <span
            className={`text-xs px-2 py-1 rounded inline-block mt-1 text-white ${
              task.status === 'Done'
                ? 'bg-green-500'
                : task.status === 'In Progress'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
          >
            {task.status}
          </span>

          <div className="mt-3 flex gap-2 text-sm">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => handleEdit(task)}
            >
              Edit
            </button>
            <button
              className="text-red-600 hover:underline"
              onClick={() => dispatch(deleteTask(task._id))}
            >
              Delete
            </button>
            <button
              className="text-green-600 hover:underline"
              onClick={() => toggleStatus(task)}
            >
              {task.status === 'Done' ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
