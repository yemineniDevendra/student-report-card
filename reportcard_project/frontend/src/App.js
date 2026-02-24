import React, { useState } from 'react';
import axios from 'axios';

// Professional Step: Set the base URL here. 
// When you get your real Render URL, replace the string below.
// App.js
const API_BASE_URL = "https://reportcard-back.vercel.app//api/students/";
// Example for deployment: "https://your-backend-name.onrender.com/api/students/"

function App() {
  const [formData, setFormData] = useState({ name: '', age: '', marks: '' });
  const [report, setReport] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = parseInt(formData.age);
    let ageGroup = "Other";
    if (age >= 20 && age <= 25) ageGroup = "20-25";
    else if (age >= 26 && age <= 30) ageGroup = "26-30";
    else if (age >= 31 && age <= 35) ageGroup = "31-35";

    try {
      // Use the API_BASE_URL variable here
      const response = await axios.post(API_BASE_URL, {
        name: formData.name,
        age: formData.age,
        marks: formData.marks
      });

      setReport({ ...response.data, ageGroup });
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Error generating report. Ensure the backend is running and CORS is configured.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      {!report ? (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Entry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">Student Name</label>
              <input type="text" required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Age</label>
              <input type="number" required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={e => setFormData({ ...formData, age: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Marks (1-700)</label>
              <input type="number" min="1" max="700" required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={e => setFormData({ ...formData, marks: e.target.value })} />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition shadow-md">
              Generate Report Card
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white border-2 border-gray-200 p-10 rounded-2xl shadow-2xl text-center max-w-sm w-full animate-in fade-in zoom-in duration-300">
          <h1 className="text-3xl font-black text-gray-900 mb-2">REPORT CARD</h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>

          <div className="text-left space-y-3 mb-6">
            <p><span className="text-gray-500 italic">Name:</span> <span className="font-bold uppercase ml-2 text-gray-800">{report.name}</span></p>
            <p><span className="text-gray-500 italic">Age:</span> <span className="font-medium ml-2">{report.age} (Group: {report.ageGroup})</span></p>
            <p><span className="text-gray-500 italic">Marks:</span> <span className="font-medium ml-2">{report.marks} / 700</span></p>
          </div>

          <div className={`p-6 rounded-xl border-2 shadow-inner ${report.status === 'Pass'
            ? 'bg-green-50 border-green-500 text-green-700'
            : 'bg-red-50 border-red-500 text-red-700'
            }`}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1">Final Result</p>
            <p className="text-3xl font-black">{report.grade}</p>
            <p className="text-sm mt-1 font-semibold">{report.status}</p>
          </div>

          <button onClick={() => setReport(null)} className="mt-8 text-blue-600 hover:text-blue-800 font-bold transition flex items-center justify-center mx-auto">
            <span className="mr-2">←</span> Create New Entry
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
