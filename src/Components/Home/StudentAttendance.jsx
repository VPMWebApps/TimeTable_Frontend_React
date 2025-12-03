import React, { useEffect, useState } from 'react';

// Helper: format date -> readable
const fmtDisplay = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch (e) {
    return iso;
  }
};

export default function StudentAttendancePage({ currentUser }) {
  // currentUser should be passed from app context or obtained from auth store
  const [attendance, setAttendance] = useState([]);
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0,7)); // YYYY-MM
  const [summary, setSummary] = useState({ present:0, absent:0, total:0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use environment variable VITE_API_URL
  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, month]);

  async function fetchAttendance() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token'); // adjust if you store token in cookie
      const res = await fetch(`${API_BASE}/attendance/student/${currentUser.id}?month=${month}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to fetch');
      }
      const data = await res.json();
      setAttendance(data.attendance || []);
      setSummary(data.summary || { present:0, absent:0, total:0 });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">My Attendance</h1>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded p-1"
        />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="bg-white rounded shadow p-4 mb-4">
        <h3 className="font-medium">Summary ({month})</h3>
        <div className="flex gap-4 mt-2">
          <div>Present: <strong>{summary.present}</strong></div>
          <div>Absent: <strong>{summary.absent}</strong></div>
          <div>Total: <strong>{summary.total}</strong></div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Marked By</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length === 0 && (
              <tr><td colSpan="3" className="p-4 text-center text-gray-500">No records</td></tr>
            )}
            {attendance.map((r) => (
              <tr key={r._id || `${r.student}_${r.date}`}>
                <td className="p-2">{fmtDisplay(r.date)}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">{r.markedByName || (r.markedBy ? r.markedBy : '—')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
