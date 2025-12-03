import React, { useEffect, useState, useRef } from "react";
import { API_URL } from "../../../Api/server.js";

export default function Admin() {

  const [streams, setStreams] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [timetable, setTimetable] = useState([]); // array of timeslot/lecture objects
  const [holidays, setHolidays] = useState([]); // array of dates 'YYYY-MM-DD' or day names
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // lecture being edited
  const dragDataRef = useRef(null);

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  useEffect(() => { fetchStreams(); fetchDivisions() }, []);

  useEffect(() => {
    if (divisions.length === 0) {
      setSelectedDivision('none');  // mark as no-division stream
    }
  }, [divisions]);


  useEffect(() => { if (selectedStream && selectedDivision !== '') fetchTimetable(); }, [selectedStream, selectedDivision]);

  function getAuthHeaders(){
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}`, 'Content-Type':'application/json' } : { 'Content-Type':'application/json' };
  }

  async function fetchStreams(){
    try{
      const res = await fetch(`${API_URL}/college/stream` , { headers: getAuthHeaders() });
      if(!res.ok) throw new Error('Failed to load streams');
      const data = await res.json();
      setStreams(Array.isArray(data) ? data : []);

    }catch(e){ console.error(e); setError(e.message); }
  }

  async function fetchDivisions(){
    try{
      const res = await fetch(`${API_URL}/college/division`, { headers: getAuthHeaders() });
      if (!res.ok) {
        console.warn("No divisions found or endpoint returned non-200");
        setDivisions([]);
        return;
      }
      const data = await res.json();
      setDivisions(Array.isArray(data) ? data : []);
    }catch(e){ console.error(e); setError(e.message); }
  }

  // Fetch timetable + holidays for selected stream+division
  async function fetchTimetable(){
    setLoading(true); setError(null);
    try{
      const qs = selectedDivision === 'none'
      ? `?stream=${selectedStream}`
      : `?stream=${selectedStream}&division=${selectedDivision}`;
      const res = await fetch(`${API_URL}/college/calendar${qs}`, { headers: getAuthHeaders() });
      if(!res.ok) throw new Error('Failed to load timetable');
      const data = await res.json();

      const slots = data.timeslots || data.schedule || data.calendar || data.timetableSchedule || [];
      setTimetable(slots);

      const h = (data.holidays || data.timetableHolidays || []).map(h=> h.date || h.day || h);
      setHolidays(h);
    }catch(e){ console.error(e); setError(e.message); }
    finally{ setLoading(false); }
  }

  // Helper to group slots by day and slotIndex
  function buildGrid(){
    const grid = {};
    days.forEach(d=> grid[d]=[]);
    timetable.forEach(t=>{
      const day = t.day || t.weekday || t.dayName;
      if(!grid[day]) grid[day]=[];
      grid[day].push(t);
    });
    days.forEach(d=>{
      grid[d].sort((a,b)=>{
        const ta = a.startTime || a.slotOrder || 0;
        const tb = b.startTime || b.slotOrder || 0;
        return (''+ta).localeCompare(''+tb, undefined, {numeric:true});
      })
    })
    return grid;
  }

  function openModal(slot){
    setEditing(slot ? { ...slot } : { day: '', startTime:'', endTime:'', subjectName:'', professorName:'', roomName:'', lectureType:'theory' });
    setModalOpen(true);
  }

  async function saveLecture(){
    try{
      const payload = { ...editing };

      let res;
      if(editing._id){
        res = await fetch(`${API_URL}/college/lectures/${editing._id}`, {
          method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(payload)
        });
      }else{
        res = await fetch(`${API_URL}/college/lectures`, {
          method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(payload)
        });
      }
      if(!res.ok){ const txt = await res.text(); throw new Error(txt||'Failed to save'); }
      await fetchTimetable();
      setModalOpen(false);
    }catch(e){ console.error(e); setError(e.message); }
  }

  async function deleteLecture(id){
    if(!confirm('Delete this lecture?')) return;
    try{
      const res = await fetch(`${API_URL}/college/lectures/${id}`, { method:'DELETE', headers: getAuthHeaders() });
      if(!res.ok) throw new Error('Delete failed');
      await fetchTimetable();
    }catch(e){ console.error(e); setError(e.message); }
  }

  // Drag handlers
  function onDragStart(e, lecture){
    dragDataRef.current = lecture;
    e.dataTransfer.effectAllowed = 'move';
  }
  function onDragOver(e){ e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
  async function onDrop(e, day){
    e.preventDefault();
    const dragged = dragDataRef.current;
    if(!dragged) return;
    const updated = { ...dragged, day };
    try{
      const res = await fetch(`${API_URL}/college/lectures/${dragged._id}`, {
        method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(updated)
      });
      if(!res.ok){ const t = await res.text(); throw new Error(t||'Move failed'); }
      await fetchTimetable();
      dragDataRef.current = null;
    }catch(e){ console.error(e); setError(e.message); }
  }

  function isHoliday(day){
    return holidays.includes(day) || holidays.some(h=> (''+h).includes(day));
  }

  const grid = buildGrid();

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Timetable</h1>
        <div className="flex gap-3">
          <select value={selectedStream} onChange={e=>setSelectedStream(e.target.value)} className="border p-2 rounded">
            <option value="">Select Stream</option>
            {streams.map(s=> <option key={s._id||s.id} value={s._id||s.id}>{s.name || s.title}</option>)}
          </select>

          <select value={selectedDivision} onChange={e=>setSelectedDivision(e.target.value)} className="border p-2 rounded">
            <option value="">Select Division</option>
            {divisions.map(d=> <option key={d._id||d.id} value={d._id||d.id}>{d.division || d.name}</option>)}
          </select>

          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={()=>openModal(null)}>+ Add Lecture</button>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="overflow-auto border rounded">
        <div className="grid" style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(180px, 1fr))` }}>
          <div className="p-2 bg-gray-50 font-semibold">Time / Slot</div>
          {days.map(d=> (
            <div key={d} className={`p-2 text-center font-semibold ${isHoliday(d) ? 'bg-red-100' : ''}`}>{d}{isHoliday(d) && <div className="text-xs text-red-600">Holiday</div>}</div>
          ))}

          {(() => {
            const maxRows = Math.max(...days.map(d=> grid[d].length));
            const rows = [];
            for(let r=0;r<Math.max(maxRows, 6); r++){
              rows.push(
                <React.Fragment key={r}>
                  <div className="p-2 border-t">Slot {r+1}</div>
                  {days.map(d=>{
                    const slot = grid[d][r];
                    return (
                      <div key={d+"-"+r} className="p-2 border-t min-h-[72px]" onDragOver={onDragOver} onDrop={(e)=>onDrop(e,d)}>
                        {slot ? (
                          <div draggable onDragStart={(e)=>onDragStart(e, slot)} className="p-2 bg-white rounded shadow-sm h-full flex flex-col justify-between">
                            <div>
                              <div className="font-medium">{slot.subjectName || slot.subject || slot.title}</div>
                              <div className="text-xs text-gray-500">{slot.professorName || slot.professor || slot.faculty}</div>
                              <div className="text-xs text-gray-500">{slot.roomName || slot.room}</div>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <button className="text-sm text-blue-600" onClick={()=> openModal(slot)}>Edit</button>
                              <button className="text-sm text-red-600" onClick={()=> deleteLecture(slot._id)}>Delete</button>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-sm text-gray-400">Empty</div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              )
            }
            return rows;
          })()}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[720px] max-w-full">
            <h3 className="text-lg font-semibold mb-4">{editing && editing._id ? 'Edit Lecture' : 'Add Lecture'}</h3>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col"><span className="text-xs text-gray-600">Day</span>
                <select value={editing.day} onChange={e=>setEditing({...editing, day:e.target.value})} className="border p-2 rounded">
                  <option value="">Select day</option>
                  {days.map(d=> <option key={d} value={d}>{d}</option>)}
                </select>
              </label>

              <label className="flex flex-col"><span className="text-xs text-gray-600">Start Time</span>
                <input value={editing.startTime || ''} onChange={e=>setEditing({...editing, startTime:e.target.value})} placeholder="09:00" className="border p-2 rounded" />
              </label>

              <label className="flex flex-col"><span className="text-xs text-gray-600">End Time</span>
                <input value={editing.endTime || ''} onChange={e=>setEditing({...editing, endTime:e.target.value})} placeholder="10:00" className="border p-2 rounded" />
              </label>

              <label className="flex flex-col"><span className="text-xs text-gray-600">Lecture Type</span>
                <select value={editing.lectureType || 'theory'} onChange={e=>setEditing({...editing, lectureType:e.target.value})} className="border p-2 rounded">
                  <option value="theory">Theory</option>
                  <option value="practical">Practical</option>
                  <option value="guest">Guest Lecture</option>
                </select>
              </label>

              <label className="flex flex-col col-span-2"><span className="text-xs text-gray-600">Subject</span>
                <input value={editing.subjectName || editing.subject || ''} onChange={e=>setEditing({...editing, subjectName:e.target.value})} className="border p-2 rounded" />
              </label>

              <label className="flex flex-col"><span className="text-xs text-gray-600">Professor</span>
                <input value={editing.professorName || editing.professor || ''} onChange={e=>setEditing({...editing, professorName:e.target.value})} className="border p-2 rounded" />
              </label>

              <label className="flex flex-col"><span className="text-xs text-gray-600">Room</span>
                <input value={editing.roomName || editing.room || ''} onChange={e=>setEditing({...editing, roomName:e.target.value})} className="border p-2 rounded" />
              </label>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button className="px-4 py-2 rounded border" onClick={()=>{ setModalOpen(false); setEditing(null); }}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={saveLecture}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
