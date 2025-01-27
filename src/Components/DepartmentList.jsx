import { useState } from "react";

const DepartmentList = ({ departments, onEditDepartment, onDeleteDepartment }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");

  const handleEdit = (index, name) => {
    setEditIndex(index);
    setEditName(name);
  };

  const handleSave = () => {
    onEditDepartment(editIndex, editName);
    setEditIndex(null);
    setEditName("");
  };

  return (
    <div className="mt-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Departments</h2>
      {departments.length > 0 ? (
        <ul className="space-y-2">
          {departments.map((department, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="p-1 border rounded-md flex-grow"
                  />
                  <button
                    onClick={handleSave}
                    className="ml-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-700">{department}</span>
                  <div>
                    <button
                      onClick={() => handleEdit(index, department)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteDepartment(index)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No departments added yet.</p>
      )}
    </div>
  );
};

export default DepartmentList;
