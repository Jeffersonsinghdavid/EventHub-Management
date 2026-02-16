import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig"; 
import Navbar from "./Navbar";
import bgImage from "../assets/dashboard-bg.jpg";
import "./Dashboard.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const [toast, setToast] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.data);
    } catch (err) {
      console.error("GET error", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setTitle("");
    setDate("");
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditId(event.id);
    setTitle(event.title);
    setDate(event.date);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!title || !date) return alert("Enter title and date!");

    try {
      if (editId) {
        const res = await api.put(`/events/${editId}`, { title, date });

        const updated = res.data.data;
        setEvents(events.map((e) => (e.id === editId ? updated : e)));
        showToast("Event Updated ✏️");
      } else {
        const res = await api.post("/events", { title, date });

        setEvents([...events, res.data.data]);
        showToast("Event Added ✅");
      }

      setShowModal(false);
    } catch (err) {
      console.error("SAVE error", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((e) => e.id !== id));
      showToast("Event Deleted 🗑️");
    } catch (err) {
      console.error("DELETE error", err);
    }
  };

  const filteredEvents = events
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "20px",
        }}
      >
        {toast && (
          <div
            style={{
              position: "fixed",
              top: "80px",
              right: "20px",
              background: "#333",
              color: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              zIndex: 1000,
            }}
          >
            {toast}
          </div>
        )}

        <div className="fade-in" style={{ padding: "40px" }}>
          {/* TOP BAR */}
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto 20px",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <button className="btn" onClick={openAddModal}>
              ➕ Add Event
            </button>

            <input
              placeholder="🔍 Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "8px", flex: 1 }}
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ padding: "8px" }}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", color: "white" }}>
              <h2>Loading events... ⏳</h2>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                gap: "20px",
                maxWidth: "1100px",
                margin: "auto",
              }}
            >
              {filteredEvents.length === 0 ? (
                <p
                  style={{
                    gridColumn: "1/-1",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  No events found
                </p>
              ) : (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="event-card"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      padding: "16px",
                      borderRadius: "16px",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                    }}
                  >
                    <h4>{event.title}</h4>
                    <p style={{ color: "gray" }}>📅 {event.date}</p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px",
                      }}
                    >
                      <button
                        className="btn"
                        onClick={() => openEditModal(event)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn"
                        style={{ background: "crimson", color: "white" }}
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {showModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2000,
            }}
          >
            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "14px",
                width: "320px",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <h3 style={{ textAlign: "center" }}>
                {editId ? "✏️ Edit Event" : "➕ Add Event"}
              </h3>

              <input
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="btn"
                  style={{ background: "gray" }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
