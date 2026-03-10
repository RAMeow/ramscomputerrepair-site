import React from "react";
import logo from "../assets/logo.png";
import reviewQr from "../assets/review-qr.png";

const siteConfig = {
  businessName: "RAM'S COMPUTER REPAIR",
  phone: "956-244-5094",
  location: "Harlingen, Texas",
  logoSrc: logo,
  reviewQrSrc: reviewQr
};

export default function RamsComputerRepairRefresh() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      {/* HEADER */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 40px",
        borderBottom: "1px solid #ddd"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={siteConfig.logoSrc}
            alt={siteConfig.businessName}
            style={{ height: 48 }}
          />
          <strong>{siteConfig.businessName}</strong>
        </div>

        <nav style={{ display: "flex", gap: 20 }}>
          <a href="#services">Services</a>
          <a href="#business">Business IT</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ padding: "80px 40px", textAlign: "center" }}>
        <h1>Professional Computer Repair</h1>
        <p>
          Trusted by the Rio Grande Valley community for over 25 years.
        </p>

        <p>
          <strong>{siteConfig.phone}</strong>
        </p>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: 40 }}>
        <h2>Residential Computer Repair</h2>

        <ul>
          <li>Virus and malware removal</li>
          <li>Slow computer cleanup</li>
          <li>Laptop screen replacement</li>
          <li>Hardware upgrades (SSD / RAM)</li>
          <li>Windows reinstall and recovery</li>
          <li>Data recovery services</li>
        </ul>
      </section>

      {/* BUSINESS IT */}
      <section id="business" style={{ padding: 40 }}>
        <h2>Business IT Solutions</h2>

        <ul>
          <li>Network setup and troubleshooting</li>
          <li>Server maintenance</li>
          <li>Workstation deployment</li>
          <li>Business cybersecurity</li>
          <li>Backup and disaster recovery</li>
          <li>Managed IT services</li>
        </ul>
      </section>

      {/* GOOGLE REVIEWS */}
      <section id="reviews" style={{ padding: 40, textAlign: "center" }}>
        <h2>Read Our Google Reviews</h2>

        <p>Trusted by the RGV Community</p>

        <img
          src={siteConfig.reviewQrSrc}
          alt="Google review QR code"
          style={{ width: 180 }}
        />

        <p style={{ marginTop: 10 }}>
          Scan the QR code to read our reviews
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: 40, textAlign: "center" }}>
        <h2>Contact RAM'S COMPUTER REPAIR</h2>

        <p>{siteConfig.location}</p>

        <p>
          <strong>{siteConfig.phone}</strong>
        </p>
      </section>

    </div>
  );
}
