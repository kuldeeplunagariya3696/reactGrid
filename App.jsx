import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule]);
const initialFormData = {
  name: "",
  age: "",
  carbrand: "",
  carmodel: "",
  income: "",
  isElectric: false,
};

const App = () => {
  const [rowData, setRowData] = useState([
    {
      name: "abcd",
      age: 25,
      carbrand: "bmw",
      carmodel: "m5",
      income: 120000,
      isElectric: true,
    },
    {
      name: "xyz",
      age: 30,
      carbrand: "audi",
      carmodel: "q7",
      income: 100000,
      isElectric: false,
    },
  ]);

  const [formData, setFormData] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    setFormData(initialFormData);
    setEditIndex(null);
    setShowModal(true);
  };

  const handleEdit = (data, index) => {
    setFormData({ ...data });
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const newData = [...rowData];
      newData.splice(index, 1);
      setRowData(newData);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.carbrand) {
      alert("Please enter at least name and car brand");
      return;
    }
    if (editIndex !== null) {
      const updatedData = [...rowData];
      updatedData[editIndex] = formData;
      setRowData(updatedData);
    } else {
      setRowData([...rowData, formData]);
    }
    setShowModal(false);
    setFormData(initialFormData);
    setEditIndex(null);
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData(initialFormData);
    setEditIndex(null);
  };

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const columnDefs = [
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
    { field: "carbrand", headerName: "Car Brand" },
    { field: "carmodel", headerName: "Car Model" },
    { field: "income", headerName: "Income" },
    {
      field: "isElectric",
      headerName: "Electric",
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRendererFramework: (params) => (
        <div>
          <button onClick={() => handleEdit(params.data, params.rowIndex)}>
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.rowIndex)}
            style={{ marginLeft: "5px" }}
          >
            Delete
          </button>
        </div>
      ),
      editable: false,
      filter: false,
      sortable: false,
      width: 150,
    },
  ];

  return (
    <div style={{ width: "900px", margin: "auto", marginTop: "20px" }}>
      <button onClick={handleAdd} style={{ marginBottom: "10px" }}>
        Add New Row
      </button>

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          defaultColDef={{ flex: 1, minWidth: 100, editable: false }}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              width: 400,
              boxShadow: "0 0 10px rgba(0,0,0,0.25)",
            }}
          >
            <h3>{editIndex !== null ? "Edit Row" : "Add New Row"}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div style={{ marginBottom: 10 }}>
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Age: </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={onInputChange}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Car Brand: </label>
                <input
                  type="text"
                  name="carbrand"
                  value={formData.carbrand}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Car Model: </label>
                <input
                  type="text"
                  name="carmodel"
                  value={formData.carmodel}
                  onChange={onInputChange}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Income: </label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={onInputChange}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>
                  <input
                    type="checkbox"
                    name="isElectric"
                    checked={formData.isElectric}
                    onChange={onInputChange}
                  />{" "}
                  Electric
                </label>
              </div>

              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <button type="submit">Save</button>
                <button type="button" onClick={handleClear}>
                  Clear
                </button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

