import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/BackButton";

function PropertyList({ properties }) {
  const props = Array.isArray(properties) ? properties : [];
  return (
    <div className="mt-4">
      <h2 className="font-semibold mb-2">My Properties</h2>
      {props.length === 0 ? (
        <div className="text-gray-500">No properties yet.</div>
      ) : (
        <ul>
          {props.map((p) => (
            <li key={p.id}>{p.title || p.address}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TenantAssignForm({ form, setForm, properties, handleAssign }) {
  const props = Array.isArray(properties) ? properties : [];
  return (
    <form onSubmit={handleAssign} className="my-4 space-y-2">
      <h3 className="font-semibold">Assign Tenant</h3>
      <select
        value={form.propertyId}
        onChange={e => setForm(f => ({ ...f, propertyId: e.target.value }))}
        className="border p-1 rounded"
      >
        {props.map((p) => (
          <option key={p.id} value={p.id}>{p.title || p.address}</option>
        ))}
      </select>
      <input
        type="email"
        placeholder="Tenant Email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className="border p-1 rounded ml-2"
        required
      />
      <input
        type="text"
        placeholder="Unit"
        value={form.unit}
        onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
        className="border p-1 rounded ml-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ml-2"
      >
        Assign
      </button>
    </form>
  );
}

function AssignedTenantsTable({ tenants, handleUnassign }) {
  const tns = Array.isArray(tenants) ? tenants : [];
  return (
    <div>
      <h3 className="font-semibold">Assigned Tenants</h3>
      {tns.length === 0 ? (
        <div className="text-gray-500">No tenants assigned.</div>
      ) : (
        <table className="w-full border mt-2">
          <thead>
            <tr>
              <th>Email</th>
              <th>Unit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tns.map((t) => (
              <tr key={t.email}>
                <td>{t.email}</td>
                <td>{t.unit}</td>
                <td>
                  <button
                    onClick={() => handleUnassign(t.email)}
                    className="text-red-600 px-3 py-1 rounded hover:underline"
                  >
                    Unassign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function TenantHistoryList({ history }) {
  const hst = Array.isArray(history) ? history : [];
  return (
    <div>
      <h3 className="font-semibold">Tenant Assignment History</h3>
      <ul>
        {hst.map((h, idx) => (
          <li key={idx}>{h.email} - {h.unit} ({h.status})</li>
        ))}
      </ul>
    </div>
  );
}

function AgentRegisterForm({ form, setForm, handleAddAgent }) {
  return (
    <form onSubmit={handleAddAgent} className="my-4 space-y-2">
      <h3 className="font-semibold">Register New Agent</h3>
      <input
        type="text"
        placeholder="Agent Name"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        className="border p-1 rounded"
        required
      />
      <input
        type="email"
        placeholder="Agent Email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className="border p-1 rounded ml-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ml-2"
      >
        Add Agent
      </button>
    </form>
  );
}

function InquiryList({ inquiries }) {
  const inqs = Array.isArray(inquiries) ? inquiries : [];
  return (
    <div>
      <h3 className="font-semibold">Inquiries</h3>
      <ul>
        {inqs.map((inq, idx) => (
          <li key={idx}>{inq.message || "No message"}</li>
        ))}
      </ul>
    </div>
  );
}

function MaintenanceList({ maintenance }) {
  const maint = Array.isArray(maintenance) ? maintenance : [];
  return (
    <div>
      <h3 className="font-semibold">Maintenance Requests</h3>
      <ul>
        {maint.map((m, idx) => (
          <li key={idx}>{m.issue || "No issue"}</li>
        ))}
      </ul>
    </div>
  );
}

function SummaryCard({ title, count }) {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
      <div className="text-3xl font-bold text-blue-700 mt-2">{count}</div>
    </div>
  );
}

function AgentDashboard() {
  const agentEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  // This will store the REAL name fetched from backend
  const [agentName, setAgentName] = useState("");

  const [properties, setProperties] = useState([]);
  const [assignedTenants, setAssignedTenants] = useState([]);
  const [history, setHistory] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  const [tenantForm, setTenantForm] = useState({
    email: "",
    unit: "",
    propertyId: ""
  });

  const [agentForm, setAgentForm] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/agent/${agentEmail}/dashboard`)
      .then(res => {
        setAgentName(res.data.name || "");
        setProperties(Array.isArray(res.data.properties) ? res.data.properties : []);
        setAssignedTenants(Array.isArray(res.data.assignedTenants) ? res.data.assignedTenants : []);
        setHistory(Array.isArray(res.data.assignmentHistory) ? res.data.assignmentHistory : []);
        setAgentList(Array.isArray(res.data.agentList) ? res.data.agentList : []);
        setInquiries(Array.isArray(res.data.inquiries) ? res.data.inquiries : []);
        setMaintenance(Array.isArray(res.data.maintenance) ? res.data.maintenance : []);
        if (Array.isArray(res.data.properties) && res.data.properties.length > 0) {
          setTenantForm(prev => ({ ...prev, propertyId: res.data.properties[0].id }));
        }
      })
      .catch(() => {
        setAgentName("");
        setProperties([]);
        setAssignedTenants([]);
        setHistory([]);
        setAgentList([]);
        setInquiries([]);
        setMaintenance([]);
      });
  }, [agentEmail]);

  const handleAssign = async (e) => {
    e.preventDefault();
    const newTenant = { ...tenantForm, agentEmail };
    await axios.post("http://localhost:8080/api/assign-tenant", newTenant);
    alert("Tenant assigned successfully!");
    window.location.reload();
  };

  const handleUnassign = async (email) => {
    await axios.post("http://localhost:8080/api/unassign-tenant", { agentEmail, email });
    alert("Tenant unassigned.");
    window.location.reload();
  };

  const handleAddAgent = async (e) => {
    e.preventDefault();
    const newAgent = { ...agentForm, registeredBy: agentEmail };
    await axios.post("http://localhost:8080/api/admin/add-agent", newAgent);
    alert("Agent added!");
    setAgentForm({ name: "", email: "" });
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">
        Welcome, {agentName ? agentName : "Agent"}
      </h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="My Properties" count={properties.length} />
        <SummaryCard title="Active Tenants" count={assignedTenants.length} />
        <SummaryCard title="Tenant History" count={history.length} />
        <SummaryCard title="Agents Added" count={agentList.length} />
      </div>
      {/* Quick Links */}
      <div className="flex flex-wrap gap-4 items-center">
        <Link
          to="/add-property"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Property
        </Link>
        <Link
          to="/properties"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          View Properties
        </Link>
        <Link
          to="/inbox"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Check Inbox
        </Link>
      </div>
      {/* Properties List */}
      <PropertyList properties={properties} />
      {/* Assign Tenant */}
      <TenantAssignForm
        form={tenantForm}
        setForm={setTenantForm}
        properties={properties}
        handleAssign={handleAssign}
      />
      {/* Assigned Tenants */}
      <AssignedTenantsTable tenants={assignedTenants} handleUnassign={handleUnassign} />
      {/* Assignment History */}
      <TenantHistoryList history={history} />
      {/* Register Agent */}
      <AgentRegisterForm form={agentForm} setForm={setAgentForm} handleAddAgent={handleAddAgent} />
      {/* Inquiries */}
      <InquiryList inquiries={inquiries} />
      {/* Maintenance */}
      <MaintenanceList maintenance={maintenance} />
    </div>
  );
}

export default AgentDashboard;
