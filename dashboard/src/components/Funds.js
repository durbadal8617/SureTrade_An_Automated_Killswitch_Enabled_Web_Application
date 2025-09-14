import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  // Inline styles object
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
      maxWidth: "1200px",
      margin: "20px auto",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    fundsHeader: {
      backgroundColor: "#e0e7ff",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    fundsText: {
      color: "#4338ca",
      margin: 0,
      fontSize: "15px",
      fontWeight: "500",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
    },
    btnGreen: {
      backgroundColor: "#10b981",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      textDecoration: "none",
      fontWeight: "500",
      display: "inline-block",
      border: "none",
    },
    btnBlue: {
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      textDecoration: "none",
      fontWeight: "500",
      display: "inline-block",
      border: "none",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },
    col: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    cardHeader: {
      backgroundColor: "#f8fafc",
      padding: "16px",
      borderBottom: "1px solid #e2e8f0",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#334155",
      margin: "0",
    },
    highlightSection: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      padding: "16px",
      backgroundColor: "#f8fafc",
    },
    highlightItem: {
      textAlign: "center",
    },
    data: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderBottom: "1px solid #f1f5f9",
    },
    label: {
      color: "#64748b",
      margin: "0",
      fontSize: "14px",
    },
    value: {
      color: "#334155",
      margin: "0",
      fontWeight: "500",
      fontSize: "14px",
    },
    colored: {
      color: "#10b981",
      fontWeight: "bold",
    },
    imp: {
      fontWeight: "600",
      fontSize: "16px",
    },
    hr: {
      margin: "8px 0",
      border: "none",
      height: "1px",
      backgroundColor: "#e2e8f0",
    },
    section: {
      padding: "16px",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#334155",
      marginBottom: "12px",
    },
    commodity: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 20px",
      textAlign: "center",
    },
    emptyText: {
      color: "#64748b",
      marginBottom: "20px",
      fontSize: "15px",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.fundsHeader}>
        <p style={styles.fundsText}>Instant, zero-cost fund transfers with UPI</p>
        <div style={styles.buttonGroup}>
          <Link style={styles.btnGreen}>Add funds</Link>
          <Link style={styles.btnBlue}>Withdraw</Link>
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.col}>
          <div style={styles.cardHeader}>
            <p style={styles.cardTitle}>Equity</p>
          </div>

          <div style={styles.highlightSection}>
            <div style={styles.highlightItem}>
              <p style={styles.label}>Available margin</p>
              <p style={{...styles.value, ...styles.imp, ...styles.colored}}>₹4,043.10</p>
            </div>
            <div style={styles.highlightItem}>
              <p style={styles.label}>Used margin</p>
              <p style={{...styles.value, ...styles.imp}}>₹3,757.30</p>
            </div>
            <div style={styles.highlightItem}>
              <p style={styles.label}>Available cash</p>
              <p style={{...styles.value, ...styles.imp}}>₹4,043.10</p>
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.data}>
              <p style={styles.label}>Opening Balance</p>
              <p style={styles.value}>₹4,043.10</p>
            </div>
            <div style={styles.data}>
              <p style={styles.label}>Closing Balance</p>
              <p style={styles.value}>₹3,736.40</p>
            </div>
            <div style={styles.data}>
              <p style={styles.label}>Payin</p>
              <p style={styles.value}>₹4,064.00</p>
            </div>
            <div style={styles.data}>
              <p style={styles.label}>SPAN</p>
              <p style={styles.value}>₹0.00</p>
            </div>
            <div style={styles.data}>
              <p style={styles.label}>Delivery margin</p>
              <p style={styles.value}>₹0.00</p>
            </div>
            <div style={styles.data}>
              <p style={styles.label}>Exposure</p>
              <p style={styles.value}>₹0.00</p>
            </div>
            <div style={styles.data}>
              <p style={styles.label}>Options premium</p>
              <p style={styles.value}>₹0.00</p>
            </div>
          </div>

          <div style={{...styles.section, borderTop: "1px solid #e2e8f0"}}>
            <p style={styles.sectionTitle}>Collateral Details</p>
            <div style={styles.data}>
              <p style={styles.label}>Collateral (Liquid funds)</p>
              <p style={styles.value}>₹0.00</p>
            </div>
            <div style={styles.data}>
              <p style={styles.label}>Collateral (Equity)</p>
              <p style={styles.value}>₹0.00</p>
            </div>
            <div style={{...styles.data, borderBottom: "none"}}>
              <p style={{...styles.label, fontWeight: "600", color: "#334155"}}>Total Collateral</p>
              <p style={{...styles.value, fontWeight: "600"}}>₹0.00</p>
            </div>
          </div>
        </div>

        <div style={styles.col}>
          <div style={styles.cardHeader}>
            <p style={styles.cardTitle}>Commodity</p>
          </div>
          <div style={styles.commodity}>
            <p style={styles.emptyText}>You don't have a commodity account</p>
            <Link style={styles.btnBlue}>Open Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;