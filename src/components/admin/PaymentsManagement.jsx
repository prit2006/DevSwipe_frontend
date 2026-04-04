import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (amt) => `₹${(amt / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
const fmtDate = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

const STATUS_COLORS = {
  captured: { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.4)", text: "#22c55e" },
  created:  { bg: "rgba(234,179,8,0.15)",  border: "rgba(234,179,8,0.4)",  text: "#eab308" },
  failed:   { bg: "rgba(239,68,68,0.15)",  border: "rgba(239,68,68,0.4)",  text: "#ef4444" },
  refunded: { bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.4)", text: "#8b5cf6" },
};

const MEMBERSHIP_COLORS = {
  silver: "#94a3b8",
  gold:   "#f59e0b",
  platinum: "#06b6d4",
};

const StatusBadge = ({ status }) => {
  const c = STATUS_COLORS[status] || { bg: "rgba(255,255,255,0.1)", border: "rgba(255,255,255,0.2)", text: "#fff" };
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
      letterSpacing: "0.5px", textTransform: "capitalize"
    }}>{status}</span>
  );
};

// ─── Mini bar-chart (CSS only, no deps) ──────────────────────────────────────
const BarChart = ({ data, title, colorFn }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "20px 24px", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ minWidth: 80, color: "rgba(255,255,255,0.7)", fontSize: 13, textTransform: "capitalize" }}>{d.label || "—"}</span>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden", height: 20 }}>
              <div style={{
                height: "100%", width: `${(d.value / max) * 100}%`,
                background: colorFn ? colorFn(d.label) : "rgba(124,58,237,0.7)",
                borderRadius: 6, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)"
              }} />
            </div>
            <span style={{ minWidth: 40, textAlign: "right", color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 600 }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Donut-like revenue breakdown (CSS) ──────────────────────────────────────
const RevenueBreakdown = ({ membershipCounts }) => {
  const total = membershipCounts.reduce((s, m) => s + (m.revenue || 0), 0) || 1;
  let offset = 0;
  const segments = membershipCounts.map((m) => {
    const pct = (m.revenue / total) * 100;
    const seg = { label: m._id, pct, color: MEMBERSHIP_COLORS[m._id] || "#7c3aed", start: offset };
    offset += pct;
    return seg;
  });

  return (
    <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "20px 24px", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Revenue by Plan</p>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {/* Stacked progress bar */}
        <div style={{ flex: 1, height: 24, borderRadius: 12, overflow: "hidden", display: "flex", background: "rgba(255,255,255,0.06)" }}>
          {segments.map((s, i) => (
            <div key={i} style={{ width: `${s.pct}%`, background: s.color, transition: "width 0.8s" }} title={`${s.label}: ${s.pct.toFixed(1)}%`} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }}>
        {membershipCounts.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: MEMBERSHIP_COLORS[m._id] || "#7c3aed" }} />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, textTransform: "capitalize" }}>
              {m._id || "—"}: {fmt(m.revenue || 0)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 9999,
    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 24
  }} onClick={onClose}>
    <div style={{
      background: "linear-gradient(135deg, #0d0520 0%, #070318 100%)",
      border: "1px solid rgba(124,58,237,0.3)", borderRadius: 20, padding: "32px 36px",
      minWidth: 400, maxWidth: 560, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      position: "relative", maxHeight: "90vh", overflowY: "auto"
    }} onClick={e => e.stopPropagation()}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: 0 }}>{title}</h3>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.7)",
          borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PaymentsManagement = () => {
  const [payments, setPayments]         = useState([]);
  const [stats, setStats]               = useState(null);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalType, setModalType]       = useState(null); // "view" | "status" | "extend" | "delete"
  const [newStatus, setNewStatus]       = useState("");
  const [newMembership, setNewMembership] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast]               = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;
      const res = await axios.get(`${BASE_URL}/admin/payments`, { withCredentials: true, params });
      setPayments(res.data.payments || []);
      setStats(res.data.stats || null);
    } catch (err) {
      showToast(err.response?.data || "Failed to fetch payments", "error");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  // ─── Actions ───────────────────────────────────────────────────────────────
  const handleStatusUpdate = async () => {
    if (!newStatus) return;
    setActionLoading(true);
    try {
      await axios.patch(`${BASE_URL}/admin/payments/${selectedPayment._id}/status`, { status: newStatus }, { withCredentials: true });
      showToast("Payment status updated successfully");
      setModalType(null);
      fetchPayments();
    } catch (err) {
      showToast(err.response?.data || "Update failed", "error");
    } finally { setActionLoading(false); }
  };

  const handleExtend = async () => {
    if (!newMembership) return;
    setActionLoading(true);
    try {
      await axios.patch(`${BASE_URL}/admin/payments/${selectedPayment._id}/extend`, { membershipType: newMembership }, { withCredentials: true });
      showToast("Membership extended / upgraded successfully");
      setModalType(null);
      fetchPayments();
    } catch (err) {
      showToast(err.response?.data || "Extend failed", "error");
    } finally { setActionLoading(false); }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await axios.delete(`${BASE_URL}/admin/payments/${selectedPayment._id}`, { withCredentials: true });
      showToast("Payment record deleted");
      setModalType(null);
      fetchPayments();
    } catch (err) {
      showToast(err.response?.data || "Delete failed", "error");
    } finally { setActionLoading(false); }
  };

  const openModal = (payment, type) => {
    setSelectedPayment(payment);
    setNewStatus(payment.status);
    setNewMembership(payment.notes?.membershipType || "silver");
    setModalType(type);
  };

  // ─── Stats derived data ────────────────────────────────────────────────────
  const statusData = (stats?.statusCounts || []).map(s => ({ label: s._id, value: s.count }));
  const membershipData = (stats?.membershipCounts || []).map(m => ({ label: m._id || "Unknown", value: m.count }));

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100%", position: "relative", fontFamily: "'Inter', sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 99999,
          background: toast.type === "error" ? "rgba(239,68,68,0.9)" : "rgba(34,197,94,0.9)",
          color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 600,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
          animation: "fadeInRight 0.3s ease"
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 4px 0" }}>
          💳 Payment Management
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", margin: 0, fontSize: 14 }}>
          Monitor, update and manage all payment records
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
          {/* Total Revenue */}
          <div style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(168,85,247,0.1) 100%)",
            border: "1px solid rgba(124,58,237,0.3)", borderRadius: 16, padding: "20px 24px",
            boxShadow: "0 4px 20px rgba(124,58,237,0.1)"
          }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px 0" }}>Total Revenue</p>
            <p style={{ color: "#a78bfa", fontSize: 26, fontWeight: 900, margin: 0 }}>{fmt(stats.totalRevenue)}</p>
          </div>
          {/* Total Payments */}
          <div style={{
            background: "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(56,189,248,0.08) 100%)",
            border: "1px solid rgba(6,182,212,0.3)", borderRadius: 16, padding: "20px 24px"
          }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px 0" }}>Total Records</p>
            <p style={{ color: "#22d3ee", fontSize: 26, fontWeight: 900, margin: 0 }}>{payments.length}</p>
          </div>
          {/* Captured */}
          <div style={{
            background: "linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(74,222,128,0.08) 100%)",
            border: "1px solid rgba(34,197,94,0.3)", borderRadius: 16, padding: "20px 24px"
          }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px 0" }}>Captured</p>
            <p style={{ color: "#22c55e", fontSize: 26, fontWeight: 900, margin: 0 }}>
              {stats.statusCounts.find(s => s._id === "captured")?.count || 0}
            </p>
          </div>
          {/* Failed */}
          <div style={{
            background: "linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(252,165,165,0.08) 100%)",
            border: "1px solid rgba(239,68,68,0.3)", borderRadius: 16, padding: "20px 24px"
          }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px 0" }}>Failed</p>
            <p style={{ color: "#ef4444", fontSize: 26, fontWeight: 900, margin: 0 }}>
              {stats.statusCounts.find(s => s._id === "failed")?.count || 0}
            </p>
          </div>
        </div>
      )}

      {/* Charts Row */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
          <BarChart title="Payment Status Distribution" data={statusData} colorFn={(label) => STATUS_COLORS[label]?.text || "#7c3aed"} />
          <BarChart title="Payments by Plan" data={membershipData} colorFn={(label) => MEMBERSHIP_COLORS[label] || "#7c3aed"} />
          <RevenueBreakdown membershipCounts={stats.membershipCounts} />
        </div>
      )}

      {/* Search & Filter */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="🔍  Search by order ID, payment ID, receipt…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 260, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12, padding: "10px 16px", color: "#fff", fontSize: 14,
            outline: "none", backdropFilter: "blur(8px)"
          }}
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12, padding: "10px 16px", color: "#fff", fontSize: 14,
            outline: "none", cursor: "pointer", backdropFilter: "blur(8px)"
          }}
        >
          <option value="" style={{ background: "#0d0520" }}>All Statuses</option>
          <option value="created"  style={{ background: "#0d0520" }}>Created</option>
          <option value="captured" style={{ background: "#0d0520" }}>Captured</option>
          <option value="failed"   style={{ background: "#0d0520" }}>Failed</option>
          <option value="refunded" style={{ background: "#0d0520" }}>Refunded</option>
        </select>
        <button
          onClick={fetchPayments}
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff",
            border: "none", borderRadius: 12, padding: "10px 24px",
            cursor: "pointer", fontWeight: 700, fontSize: 14
          }}
        >Refresh</button>
      </div>

      {/* Table */}
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20, overflow: "hidden"
      }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.4)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <p style={{ margin: 0 }}>Loading payments…</p>
          </div>
        ) : payments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.4)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💳</div>
            <p style={{ margin: 0 }}>No payments found</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["User", "Order ID", "Amount", "Plan", "Status", "Date", "Actions"].map(h => (
                    <th key={h} style={{
                      padding: "14px 16px", textAlign: "left", color: "rgba(255,255,255,0.45)",
                      fontWeight: 700, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
                      whiteSpace: "nowrap"
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p, idx) => (
                  <tr key={p._id} style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    transition: "background 0.2s",
                    background: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)"
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,0.06)"}
                    onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)"}
                  >
                    {/* User */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img
                          src={p.userId?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.userId?.firstname}`}
                          alt="avatar"
                          style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(124,58,237,0.3)" }}
                        />
                        <div>
                          <p style={{ color: "#fff", margin: 0, fontWeight: 600 }}>
                            {p.userId?.firstname} {p.userId?.lastname}
                          </p>
                          <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: 11 }}>{p.userId?.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Order ID */}
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "monospace", fontSize: 11 }}>
                        {p.orderId?.slice(0, 20)}…
                      </span>
                    </td>
                    {/* Amount */}
                    <td style={{ padding: "14px 16px", color: "#a78bfa", fontWeight: 700 }}>
                      {fmt(p.amount)}
                    </td>
                    {/* Plan */}
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        color: MEMBERSHIP_COLORS[p.notes?.membershipType] || "rgba(255,255,255,0.5)",
                        fontWeight: 600, textTransform: "capitalize"
                      }}>{p.notes?.membershipType || "—"}</span>
                    </td>
                    {/* Status */}
                    <td style={{ padding: "14px 16px" }}>
                      <StatusBadge status={p.status} />
                    </td>
                    {/* Date */}
                    <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                      {fmtDate(p.createdAt)}
                    </td>
                    {/* Actions */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => openModal(p, "view")} title="View Details" style={btnStyle("#06b6d4")}>👁</button>
                        <button onClick={() => openModal(p, "status")} title="Update Status" style={btnStyle("#f59e0b")}>✏️</button>
                        <button onClick={() => openModal(p, "extend")} title="Extend Membership" style={btnStyle("#22c55e")}>🔑</button>
                        <button onClick={() => openModal(p, "delete")} title="Delete Record" style={btnStyle("#ef4444")}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── View Modal ─── */}
      {modalType === "view" && selectedPayment && (
        <Modal title="Payment Details" onClose={() => setModalType(null)}>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              ["User", `${selectedPayment.userId?.firstname} ${selectedPayment.userId?.lastname}`],
              ["Email", selectedPayment.userId?.email],
              ["Order ID", selectedPayment.orderId],
              ["Payment ID", selectedPayment.paymentId || "—"],
              ["Receipt", selectedPayment.receipt],
              ["Amount", fmt(selectedPayment.amount)],
              ["Currency", selectedPayment.currency],
              ["Plan", selectedPayment.notes?.membershipType || "—"],
              ["Status", selectedPayment.status],
              ["Created", fmtDate(selectedPayment.createdAt)],
              ["Updated", fmtDate(selectedPayment.updatedAt)],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{k}</span>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 600, maxWidth: "60%", wordBreak: "break-all", textAlign: "right" }}>{String(v)}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ─── Update Status Modal ─── */}
      {modalType === "status" && selectedPayment && (
        <Modal title="Update Payment Status" onClose={() => setModalType(null)}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 20 }}>
            Current status: <StatusBadge status={selectedPayment.status} />
          </p>
          <label style={labelStyle}>New Status</label>
          <select value={newStatus} onChange={e => setNewStatus(e.target.value)} style={inputStyle}>
            {["created", "captured", "failed", "refunded"].map(s => (
              <option key={s} value={s} style={{ background: "#0d0520", textTransform: "capitalize" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button onClick={() => setModalType(null)} style={{ ...actionBtnStyle, background: "rgba(255,255,255,0.06)", color: "#fff" }}>Cancel</button>
            <button onClick={handleStatusUpdate} disabled={actionLoading} style={{ ...actionBtnStyle, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff" }}>
              {actionLoading ? "Updating…" : "Update Status"}
            </button>
          </div>
        </Modal>
      )}

      {/* ─── Extend Membership Modal ─── */}
      {modalType === "extend" && selectedPayment && (
        <Modal title="Extend / Upgrade Membership" onClose={() => setModalType(null)}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 20 }}>
            Current plan: <strong style={{ color: MEMBERSHIP_COLORS[selectedPayment.notes?.membershipType] || "#fff", textTransform: "capitalize" }}>
              {selectedPayment.notes?.membershipType || "—"}
            </strong>
          </p>
          <label style={labelStyle}>Upgrade / Change Plan</label>
          <select value={newMembership} onChange={e => setNewMembership(e.target.value)} style={inputStyle}>
            {["silver", "gold", "platinum"].map(m => (
              <option key={m} value={m} style={{ background: "#0d0520", textTransform: "capitalize" }}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
            ))}
          </select>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button onClick={() => setModalType(null)} style={{ ...actionBtnStyle, background: "rgba(255,255,255,0.06)", color: "#fff" }}>Cancel</button>
            <button onClick={handleExtend} disabled={actionLoading} style={{ ...actionBtnStyle, background: "linear-gradient(135deg,#059669,#34d399)", color: "#fff" }}>
              {actionLoading ? "Extending…" : "Apply Changes"}
            </button>
          </div>
        </Modal>
      )}

      {/* ─── Delete Modal ─── */}
      {modalType === "delete" && selectedPayment && (
        <Modal title="Delete Payment Record" onClose={() => setModalType(null)}>
          <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <p style={{ color: "rgba(255,255,255,0.8)", margin: "0 0 8px" }}>Are you sure you want to permanently delete this payment record?</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>
              Order: <code style={{ color: "#a78bfa" }}>{selectedPayment.orderId}</code>
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={() => setModalType(null)} style={{ ...actionBtnStyle, background: "rgba(255,255,255,0.06)", color: "#fff" }}>Cancel</button>
            <button onClick={handleDelete} disabled={actionLoading} style={{ ...actionBtnStyle, background: "linear-gradient(135deg,#dc2626,#ef4444)", color: "#fff" }}>
              {actionLoading ? "Deleting…" : "Yes, Delete"}
            </button>
          </div>
        </Modal>
      )}

      <style>{`
        @keyframes fadeInRight {
          from { opacity:0; transform: translateX(20px); }
          to   { opacity:1; transform: translateX(0); }
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
        select option      { background: #0d0520; color: #fff; }
      `}</style>
    </div>
  );
};

// ─── Style helpers ────────────────────────────────────────────────────────────
const btnStyle = (color) => ({
  background: `${color}22`,
  border: `1px solid ${color}55`,
  color: color,
  borderRadius: 8,
  padding: "6px 10px",
  cursor: "pointer",
  fontSize: 14,
  transition: "all 0.2s",
  lineHeight: 1
});

const labelStyle = {
  display: "block",
  color: "rgba(255,255,255,0.5)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: "uppercase",
  marginBottom: 8
};

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  padding: "12px 16px",
  color: "#fff",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box"
};

const actionBtnStyle = {
  flex: 1,
  border: "none",
  borderRadius: 12,
  padding: "12px",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 14,
  transition: "opacity 0.2s"
};

export default PaymentsManagement;
