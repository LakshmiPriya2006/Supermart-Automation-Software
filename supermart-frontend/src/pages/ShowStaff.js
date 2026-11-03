import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowStaff() {
  const [list, setList] = useState([]);
  const [editStaff, setEditStaff] = useState(null);

  const load = () => {
    axios.get("http://localhost:5000/api/staff")
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => { load(); }, []);

  const handleEdit = (s) => setEditStaff(s);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/staff/${editStaff._id}`, editStaff);
      alert("Staff Updated ✅");
      setEditStaff(null);
      load();
    } catch (err) {
      alert("Error updating staff ❌");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this staff?")) {
      try {
        await axios.delete(`http://localhost:5000/api/staff/${id}`);
        alert("Staff Deleted ✅");
        load();
      } catch (err) {
        alert("Error deleting staff ❌");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Staff</h2>

      {editStaff && (
        <div className="mt-4 p-3 border border-primary rounded">
          <h4>Edit Staff</h4>

          <input type="text" className="form-control mb-2" value={editStaff.name} onChange={(e)=>setEditStaff({...editStaff, name:e.target.value})}/>
          <input type="text" className="form-control mb-2" value={editStaff.role} onChange={(e)=>setEditStaff({...editStaff, role:e.target.value})}/>
          <input type="text" className="form-control mb-2" value={editStaff.phone} onChange={(e)=>setEditStaff({...editStaff, phone:e.target.value})}/>
          <input type="email" className="form-control mb-2" value={editStaff.email || ""} onChange={(e)=>setEditStaff({...editStaff, email:e.target.value})}/>
          <input type="number" className="form-control mb-2" value={editStaff.salary ?? 0} onChange={(e)=>setEditStaff({...editStaff, salary:Number(e.target.value)})}/>

          <button className="btn btn-success" onClick={handleUpdate}>Update</button>
        </div>
      )}

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.role}</td>
              <td>{s.phone}</td>
              <td>{s.email || "-"}</td>
              <td>{s.salary}</td>
              <td><button className="btn btn-warning btn-sm" onClick={()=>handleEdit(s)}>Edit</button></td>
              <td><button className="btn btn-danger btn-sm" onClick={()=>handleDelete(s._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowStaff;

