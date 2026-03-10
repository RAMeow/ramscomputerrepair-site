import logo from "../assets/logo.png";
import reviewQr from "../assets/review-qr.png";
import React, { useEffect, useMemo, useRef, useState } from "react";

type InfoCard = {
  title: string;
  description: string;
};

type SiteConfig = {
  businessName: string;
  phoneDisplay: string;
  phoneHref: string;
  location: string;
  email: string;
  domain: string;
  logoSrc: string;
  reviewQrSrc: string;
  socialTitle: string;
  socialDescription: string;
  portalPath: string;
};

type PortalFile = {
  key: string;
  size: number;
  uploaded: string;
};

const siteConfig: SiteConfig = {
  businessName: "RAM'S COMPUTER REPAIR",
  phoneDisplay: "956-244-5094",
  phoneHref: "tel:9562445094",
  location: "Harlingen, Texas",
  email: "Ram@RamsComputerRepair.Net",
  domain: "https://www.ramscomputerrepair.net",
  logoSrc: logo,
  reviewQrSrc: reviewQr,
  socialTitle: "RAM'S COMPUTER REPAIR | Computer Repair & Business IT Solutions",
  socialDescription:
    "Professional computer repair, virus removal, upgrades, laptop repair, custom PCs, and small business IT support in Harlingen and the Rio Grande Valley.",
  portalPath: "/RAMeow",
};

const residentialServices: InfoCard[] = [
  {
    title: "Virus & Malware Removal",
    description:
      "Professional removal of viruses, spyware, ransomware, browser hijackers, and other malicious software that slow down your system or compromise your personal data.",
  },
  {
    title: "Laptop & Desktop Repair",
    description:
      "Diagnosis and repair of common hardware and software problems including overheating systems, power issues, boot failures, and failing components.",
  },
  {
    title: "Data Recovery",
    description:
      "Recovery of lost documents, photos, and important files from damaged drives, corrupted systems, or accidental deletion whenever possible.",
  },
  {
    title: "Hardware Upgrades (SSD / RAM)",
    description:
      "Upgrade older systems with solid-state drives and additional memory to dramatically improve boot times, responsiveness, and overall performance.",
  },
  {
    title: "Windows Troubleshooting",
    description:
      "Fix Windows errors, update problems, driver conflicts, startup failures, and other operating system issues that prevent your computer from running properly.",
  },
  {
    title: "Laptop Screen Replacement",
    description:
      "Replacement of cracked, flickering, dim, or completely black laptop displays using compatible high-quality replacement screens.",
  },
  {
    title: "System Tune-Ups & Optimization",
    description:
      "Comprehensive cleanup and optimization to remove unnecessary software, correct configuration problems, and restore fast system performance.",
  },
  {
    title: "Custom PC Builds",
    description:
      "Design and assembly of custom desktop systems tailored for reliability, performance, gaming, creative work, or everyday computing.",
  },
  {
    title: "Gaming & Performance PC Builds",
    description:
      "High-performance systems built for modern games, streaming, and demanding applications using trusted components and proper cooling.",
  },
  {
    title: "Security Hardening & Protection",
    description:
      "Strengthen system security with proper configuration, malware protection, safe browsing practices, and protection against common threats.",
  },
  {
    title: "Premium Antivirus Installation",
    description:
      "Installation and configuration of trusted antivirus and endpoint protection solutions to help prevent malware infections and security threats.",
  },
];

const businessFocusCards: InfoCard[] = [
  {
    title: "Managed Support",
    description:
      "Reliable help for daily technical issues, workstation problems, and routine maintenance for small offices.",
  },
  {
    title: "Network & Security",
    description:
      "Support for routers, wireless networking, endpoint protection, backups, and basic office security needs.",
  },
  {
    title: "Upgrades & Deployment",
    description:
      "New computer setup, workstation replacement, software configuration, and hardware upgrades for growing businesses.",
  },
];

const serviceAreas: string[] = [
  "Harlingen",
  "San Benito",
  "Brownsville",
  "McAllen",
  "Rio Grande Valley",
];

const commonProblems: InfoCard[] = [
  {
    title: "Computer Running Slow",
    description:
      "Slow startup, lagging programs, or freezing systems are often caused by malware, failing drives, or outdated hardware.",
  },
  {
    title: "Virus & Malware Infections",
    description:
      "Popups, browser redirects, and suspicious activity are common signs of malware infections that require professional removal.",
  },
  {
    title: "Laptop Screen Damage",
    description:
      "Cracked displays, flickering screens, or black displays can often be repaired with professional screen replacement.",
  },
  {
    title: "Computer Won't Start",
    description:
      "Boot failures, power issues, and operating system errors are common problems that can often be repaired without replacing the entire system.",
  },
  {
    title: "Data Recovery",
    description:
      "Lost documents, photos, or important files may still be recoverable from failing or damaged storage devices.",
  },
  {
    title: "Upgrade & Performance Issues",
    description:
      "Older systems can often be dramatically improved with SSD upgrades, memory increases, and system optimization.",
  },
];

const trustReasons: InfoCard[] = [
  {
    title: "25+ Years of Experience",
    description:
      "Decades of hands-on repair and IT support experience serving residential and business customers across the Rio Grande Valley.",
  },
  {
    title: "Free Basic Diagnostics",
    description:
      "Straightforward troubleshooting to identify common issues and recommend practical repair options before major work begins.",
  },
  {
    title: "Local & Dependable",
    description:
      "Local service means clearer communication, faster response, and support from a real technician who understands the needs of RGV customers.",
  },
  {
    title: "Business & Residential Support",
    description:
      "From home computers to office workstations and small business networks, service is tailored to the system and the client.",
  },
];

const reviewStats = {
  rating: "4.9–5.0",
  reviewLabel: "Highly Rated by Local Customers",
};

const highlights: string[] = [
  "25+ Years Experience",
  "Free Basic Diagnostics",
  "Same-Day Service Available",
  "Residential & Business Support",
];

function ServiceCard({ title, description }: InfoCard) {
  return (
    <div className="card light">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function DarkInfoCard({ title, description }: InfoCard) {
  return (
    <div className="card dark">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function PortalNavCard({
  title,
  description,
  tag,
}: {
  title: string;
  description: string;
  tag: string;
}) {
  return (
    <div className="portal-nav-card">
      <div className="portal-nav-tag">{tag}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function RamsComputerRepairRefresh() {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const isPortalRoute = currentPath.toLowerCase().startsWith(siteConfig.portalPath.toLowerCase());

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ComputerRepair",
    name: siteConfig.businessName,
    telephone: "+1-956-244-5094",
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Harlingen",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: serviceAreas,
    url: siteConfig.domain,
  };

  const deploymentArtifacts = {
    robots: `User-agent: *
Allow: /
Sitemap: https://www.ramscomputerrepair.net/sitemap.xml`,
    sitemap: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.ramscomputerrepair.net/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.ramscomputerrepair.net${siteConfig.portalPath}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.2</priority>
  </url>
</urlset>`,
    accessNotes: `Cloudflare Access plan:
1. Create a Zero Trust application for ${siteConfig.domain}${siteConfig.portalPath}
2. Add an allow policy for your email identity
3. Route uploads through a Worker bound to an R2 bucket
4. Keep the public homepage outside Access protection`,
  };

  const [files, setFiles] = useState<PortalFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function loadFiles() {
    const res = await fetch("/api/files");
    if (!res.ok) return;

    const data = await res.json();
    setFiles(data.files || []);
  }

  async function deleteFile(key: string) {
    const confirmed = window.confirm(`Delete "${key}"?`);
    if (!confirmed) return;

    const res = await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key }),
    });

    if (!res.ok) {
      alert("Delete failed.");
      return;
    }

    if (selectedPreview === key) {
      setSelectedPreview(null);
    }

    await loadFiles();
  }

  function inferPreviewType(key: string) {
    const lower = key.toLowerCase();

    if (
      lower.endsWith(".png") ||
      lower.endsWith(".jpg") ||
      lower.endsWith(".jpeg") ||
      lower.endsWith(".gif") ||
      lower.endsWith(".webp")
    ) {
      return "image";
    }

    if (lower.endsWith(".pdf")) {
      return "pdf";
    }

    return "other";
  }

  async function uploadSelectedFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setUploadProgress(0);

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = async () => {
        setUploading(false);

        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress(100);
          await loadFiles();
          resolve();
        } else {
          reject(new Error("Upload failed"));
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        reject(new Error("Upload failed"));
      };

      xhr.send(formData);
    });
  }

  const filteredFiles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return files;
    return files.filter((file) => file.key.toLowerCase().includes(term));
  }, [files, searchTerm]);

  useEffect(() => {
    if (isPortalRoute) {
      loadFiles();
    }
  }, [isPortalRoute]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .page { position: relative; min-height: 100vh; overflow: hidden; background: #020617; color: #fff; font-family: Arial, Helvetica, sans-serif; }
        .bg { position: absolute; inset: 0; pointer-events: none; opacity: .12; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; }
        .header { position: sticky; top: 0; z-index: 50; border-bottom: 1px solid rgba(255,255,255,.1); background: rgba(2,6,23,.92); backdrop-filter: blur(8px); }
        .header-inner { display: flex; flex-direction: column; gap: 14px; padding: 16px 0; }
        .header-top { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
        .logo-row { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .logo { height: 48px; width: auto; filter: drop-shadow(0 0 12px rgba(34,211,238,.18)); }
        .brand-name { display:block; font-size: 18px; font-weight: 700; letter-spacing: .3px; }
        .sub-brand { display:block; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #67e8f9; }
        .nav { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
        .nav a, .button-mini { color:#e2e8f0; text-decoration:none; border:1px solid rgba(255,255,255,.12); border-radius:16px; padding:18px 26px; font-size:18px; font-weight:800; background:rgba(255,255,255,.06); transition:all .18s ease; }
        .nav a:hover, .button-mini:hover { background:#22d3ee; color:#020617; border-color:#22d3ee; transform:translateY(-1px); }
        .button-small, .button-primary { display:inline-block; background:#22d3ee; color:#020617; text-decoration:none; border-radius:14px; padding:12px 18px; font-weight:800; box-shadow:0 10px 30px rgba(34,211,238,.25); }
        .button-primary { padding:14px 24px; border-radius:16px; border:0; cursor:pointer; }
        .review-button { display:inline-flex; align-items:center; gap:12px; padding:18px 28px; font-size:18px; font-weight:900; border-radius:18px; }
        .google-badge { display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:999px; background:#fff; color:#2563eb; font-size:22px; font-weight:900; flex:0 0 auto; }
        .review-stars-inline { font-size:18px; color:#fcd34d; letter-spacing:1px; }
        .button-ghost { display:inline-block; text-decoration:none; color:#fff; border:1px solid rgba(255,255,255,.18); border-radius:16px; padding:14px 24px; background: rgba(255,255,255,.04); }
        .hero { position: relative; overflow:hidden; border-bottom:1px solid rgba(255,255,255,.1); background: radial-gradient(circle at top right, rgba(59,130,246,.22), transparent 35%), radial-gradient(circle at bottom left, rgba(14,165,233,.16), transparent 30%), linear-gradient(to bottom, rgba(2,6,23,.08), rgba(2,6,23,.18), rgba(2,6,23,.65)); }
        .hero-inner { padding: 72px 0 88px; }
        .hero-grid, .reviews-grid, .cta-grid { display:grid; gap:32px; align-items:center; }
        .hero-grid { grid-template-columns: 1.15fr .85fr; gap:40px; }
        .reviews-grid { grid-template-columns: .9fr 1.1fr; align-items: start; }
        .cta-grid { grid-template-columns: 1.3fr .7fr; }
        .badge-row, .hero-buttons, .hero-links, .chips, .review-actions { display:flex; flex-wrap:wrap; gap:12px; }
        .pill, .meta-pill, .chip { border-radius:999px; padding:10px 16px; font-size:14px; }
        .pill { border:1px solid rgba(103,232,249,.3); background:rgba(34,211,238,.1); color:#bae6fd; }
        .dot { width:8px; height:8px; border-radius:999px; background:#67e8f9; display:inline-block; margin-right:8px; }
        .meta-pill, .chip { border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04); color:#e2e8f0; }
        .hero-title { font-size: clamp(40px, 7vw, 62px); line-height:1.02; font-weight:900; margin:0 0 20px; }
        .hero-accent { display:block; color:#67e8f9; }
        .hero-text, .section-text, .card p, .panel-text, .small-text, .portal-copy { color:#cbd5e1; line-height:1.7; }
        .hero-text { font-size: clamp(17px, 2.5vw, 20px); max-width:720px; margin:0 0 28px; }
        .hero-highlights, .grid4, .grid3, .grid2, .three-stats, .reviews-right, .portal-shell, .portal-list, .portal-dashboard, .portal-stat-grid, .artifact-grid { display:grid; gap:16px; }
        .hero-highlights { grid-template-columns: repeat(2, minmax(0,1fr)); max-width:700px; margin-top:24px; }
        .grid4 { grid-template-columns: repeat(4, minmax(0,1fr)); margin-top:28px; }
        .grid3 { grid-template-columns: repeat(3, minmax(0,1fr)); margin-top:28px; }
        .grid2 { grid-template-columns: repeat(2, minmax(0,1fr)); margin-top:24px; }
        .three-stats { grid-template-columns: repeat(3, minmax(0,1fr)); }
        .reviews-right { grid-template-columns: 1fr 240px; align-items:start; gap:24px; }
        .portal-shell { grid-template-columns: .95fr 1.05fr; margin-top:28px; }
        .portal-stat-grid { grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; }
        .artifact-grid { grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; }
        .highlight-card, .card.light, .stat-card, .portal-stat, .artifact-card, .portal-nav-card { border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05); border-radius:20px; padding:18px; }
        .card.dark, .panel, .qr-box, .cta-box, .portal-panel { border:1px solid rgba(255,255,255,.1); background:rgba(15,23,42,.82); border-radius:24px; padding:24px; }
        .card h3, .section-title, .panel-title, .portal-title { margin:0; font-weight:800; }
        .card h3 { font-size:20px; }
        .card p { margin:12px 0 0; }
        .section, .section-muted, .section-dark { padding:64px 0; }
        .section-muted { border-top:1px solid rgba(255,255,255,.1); border-bottom:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.03); }
        .section-dark { border-top:1px solid rgba(255,255,255,.1); border-bottom:1px solid rgba(255,255,255,.1); background:rgba(15,23,42,.5); }
        .section-title-small, .panel-label, .service-list-title, .qr-label, .portal-kicker { font-size:12px; text-transform:uppercase; letter-spacing:3px; color:#67e8f9; margin:0; }
        .section-title { font-size: clamp(28px, 4vw, 40px); margin:10px 0 18px; }
        .panel { box-shadow: 0 20px 50px rgba(8,47,73,.45); }
        .panel-header { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:20px; }
        .panel-title, .portal-title { font-size: clamp(28px, 4vw, 34px); margin-top:10px; }
        .panel-call-box { border:1px solid rgba(34,211,238,.2); background:rgba(34,211,238,.1); border-radius:16px; padding:10px 14px; text-align:right; }
        .panel-call-label { font-size:11px; text-transform:uppercase; letter-spacing:3px; color:#bae6fd; }
        .panel-call-num { font-size:22px; font-weight:800; margin-top:6px; }
        .service-list-box { border:1px solid rgba(255,255,255,.1); background:rgba(2,6,23,.6); border-radius:18px; padding:18px; margin-top:16px; }
        .service-list { display:grid; gap:12px; margin-top:14px; }
        .service-item { border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04); border-radius:12px; padding:12px 14px; font-size:14px; }
        .stat-big { font-size:34px; font-weight:900; color:#67e8f9; }
        .stat-label { margin-top:8px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#94a3b8; }
        .emergency { border-bottom:1px solid rgba(34,211,238,.2); background:rgba(34,211,238,.1); }
        .emergency-inner { display:flex; justify-content:space-between; align-items:center; gap:18px; flex-wrap:wrap; padding:16px 0; }
        .emergency-title { margin:0; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:3px; color:#67e8f9; }
        .emergency-text { margin:6px 0 0; color:#e2e8f0; }
        .rating-row { display:flex; align-items:center; gap:16px; margin-top:18px; }
        .rating-big { font-size:54px; font-weight:900; }
        .stars { font-size:28px; color:#fcd34d; }
        .qr-box { text-align:center; }
        .qr-image { width:100%; max-width:240px; border-radius:14px; border:1px solid rgba(255,255,255,.1); background:#fff; padding:8px; }
        .portal-note, .portal-file-meta { font-size:13px; color:#94a3b8; line-height:1.6; margin-top:4px; }
        .portal-stat strong { display:block; font-size:22px; color:#67e8f9; }
        .portal-nav-tag { border:1px solid rgba(103,232,249,.25); background:rgba(34,211,238,.08); color:#bae6fd; border-radius:999px; padding:6px 10px; font-size:12px; white-space:nowrap; display:inline-block; }
        .floating-call { position:fixed; right:16px; bottom:16px; z-index:60; background:#22d3ee; color:#020617; text-decoration:none; font-weight:900; border-radius:999px; padding:16px 22px; box-shadow:0 14px 30px rgba(34,211,238,.35); }
        @media (max-width: 1024px) {
          .hero-grid, .reviews-grid, .cta-grid, .portal-shell { grid-template-columns: 1fr; }
          .reviews-right { grid-template-columns: 1fr; }
          .grid4 { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .grid3 { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .portal-stat-grid { grid-template-columns: 1fr 1fr 1fr; }
          .artifact-grid { grid-template-columns: 1fr; }
          .cta-buttons { align-items: stretch; }
        }
        @media (max-width: 768px) {
          .container { padding: 0 16px; }
          .button-primary, .button-ghost, .button-small, .button-mini { width: 100%; text-align: center; }
          .hero-inner { padding: 48px 0 56px; }
          .hero-highlights, .grid4, .grid3, .grid2, .three-stats, .portal-stat-grid { grid-template-columns: 1fr; }
          .pill, .meta-pill, .chip, .review-actions > * { width: 100%; }
          .review-actions { align-items: stretch; }
          .floating-call { left:16px; right:16px; text-align:center; }
          .nav a { font-size:16px; padding:14px 18px; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="page">
        <div className="bg">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" preserveAspectRatio="none">
            <defs>
              <pattern id="pcbPattern" width="260" height="220" patternUnits="userSpaceOnUse">
                <g stroke="#22d3ee" strokeWidth="1.4" fill="none" strokeLinecap="square">
                  <path d="M10 40 H200" />
                  <path d="M60 90 H240" />
                  <path d="M20 150 H210" />
                  <path d="M60 10 V200" />
                  <path d="M120 0 V140" />
                  <path d="M180 80 V220" />
                  <path d="M20 40 V80 H80 V120 H140" />
                  <path d="M120 140 H180 V180 H240" />
                  <path d="M200 40 V80 H240" />
                  <path d="M80 150 V190 H140" />
                </g>
                <g fill="#67e8f9" opacity="0.85">
                  <circle cx="10" cy="40" r="2.5" />
                  <circle cx="200" cy="40" r="2.5" />
                  <circle cx="60" cy="90" r="2.5" />
                  <circle cx="240" cy="90" r="2.5" />
                  <circle cx="20" cy="150" r="2.5" />
                  <circle cx="210" cy="150" r="2.5" />
                  <circle cx="60" cy="200" r="2.5" />
                  <circle cx="120" cy="140" r="2.5" />
                  <circle cx="180" cy="80" r="2.5" />
                  <circle cx="240" cy="180" r="2.5" />
                  <circle cx="80" cy="120" r="2.5" />
                  <circle cx="140" cy="120" r="2.5" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pcbPattern)" />
          </svg>
        </div>

        {isPortalRoute ? (
          <main className="page" style={{ background: "transparent" }}>
            <section className="section-dark" style={{ minHeight: "100vh", paddingTop: 40 }}>
              <div className="container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                    marginBottom: 24,
                  }}
                >
                  <div className="logo-row">
                    <img src={siteConfig.logoSrc} alt={siteConfig.businessName} className="logo" />
                    <div>
                      <span className="brand-name">{siteConfig.businessName}</span>
                      <span className="sub-brand">RAMeow Secure Portal</span>
                    </div>
                  </div>
                  <a href="/" className="button-ghost">Back to Main Site</a>
                </div>

                <div className="portal-shell">
                  <div className="portal-panel">
                    <p className="portal-kicker">/RAMeow</p>
                    <h1 className="portal-title">Owner Portal</h1>
                    <p className="portal-copy">
                      This is the live RAMeow portal area. RAM&apos;S EYES ONLY! KEEP OUT!
                    </p>

                    <div className="portal-list" style={{ marginTop: 22 }}>
                      {portalCards.map((card) => (
                        <PortalNavCard
                          key={card.title}
                          title={card.title}
                          description={card.description}
                          tag={card.tag}
                        />
                      ))}
                    </div>

                    <div style={{ marginTop: 24 }}>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={async (e) => {
                          e.preventDefault();
                          setDragActive(false);

                          const droppedFile = e.dataTransfer.files?.[0];
                          if (!droppedFile) return;

                          try {
                            await uploadSelectedFile(droppedFile);
                            alert("Upload successful.");
                          } catch {
                            alert("Upload failed.");
                          }
                        }}
                        style={{
                          border: dragActive ? "2px solid #22d3ee" : "2px dashed rgba(255,255,255,.2)",
                          background: dragActive ? "rgba(34,211,238,.08)" : "rgba(255,255,255,.03)",
                          borderRadius: 16,
                          padding: 24,
                          textAlign: "center",
                          marginBottom: 16,
                        }}
                      >
                        <p style={{ margin: 0, fontWeight: 700 }}>Drag and drop a file here</p>
                        <p style={{ marginTop: 8, color: "#cbd5e1" }}>or use the button below</p>

                        <button
                          type="button"
                          className="button-primary"
                          style={{ marginTop: 12 }}
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                        >
                          {uploading ? "Uploading..." : "Choose File"}
                        </button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          style={{ display: "none" }}
                          onChange={async (e) => {
                            const chosenFile = e.target.files?.[0];
                            if (!chosenFile) return;

                            try {
                              await uploadSelectedFile(chosenFile);
                              alert("Upload successful.");
                            } catch {
                              alert("Upload failed.");
                            } finally {
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>

                      {uploading && (
                        <div style={{ marginTop: 12 }}>
                          <div style={{ color: "#cbd5e1", marginBottom: 8 }}>
                            Uploading... {uploadProgress}%
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: 12,
                              borderRadius: 999,
                              background: "rgba(255,255,255,.12)",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${uploadProgress}%`,
                                height: "100%",
                                background: "#22d3ee",
                                transition: "width .2s ease",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop: 32 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 12,
                          flexWrap: "wrap",
                          marginBottom: 12,
                        }}
                      >
                        <h2 style={{ margin: 0 }}>Files</h2>

                        <input
                          type="text"
                          placeholder="Search files..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{
                            minWidth: 260,
                            padding: 12,
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,.15)",
                            background: "#0f172a",
                            color: "white",
                          }}
                        />
                      </div>

                      {filteredFiles.length === 0 ? (
                        <p style={{ color: "#cbd5e1" }}>
                          {searchTerm ? "No matching files found." : "No files uploaded yet."}
                        </p>
                      ) : (
                        <div style={{ display: "grid", gap: 12 }}>
                          {filteredFiles.map((file) => (
                            <div
                              key={file.key}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 12,
                                padding: 14,
                                borderRadius: 12,
                                border: "1px solid rgba(255,255,255,.1)",
                                background: "rgba(255,255,255,.04)",
                              }}
                            >
                              <div style={{ minWidth: 0 }}>
                                <a
                                  href={`/api/download/${encodeURIComponent(file.key)}`}
                                  style={{
                                    color: "#67e8f9",
                                    textDecoration: "none",
                                    fontWeight: 600,
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {file.key}
                                </a>
                                <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 6 }}>
                                  {Math.max(1, Math.round(file.size / 1024))} KB •{" "}
                                  {new Date(file.uploaded).toLocaleString()}
                                </div>
                              </div>

                              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                                {(inferPreviewType(file.key) === "image" ||
                                  inferPreviewType(file.key) === "pdf") && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedPreview(file.key)}
                                    style={{
                                      border: 0,
                                      background: "#334155",
                                      color: "white",
                                      padding: "10px 14px",
                                      borderRadius: 10,
                                      fontWeight: 700,
                                      cursor: "pointer",
                                    }}
                                  >
                                    Preview
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => deleteFile(file.key)}
                                  style={{
                                    border: 0,
                                    background: "#ef4444",
                                    color: "white",
                                    padding: "10px 14px",
                                    borderRadius: 10,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedPreview && (
                      <div
                        style={{
                          marginTop: 24,
                          padding: 20,
                          borderRadius: 16,
                          border: "1px solid rgba(255,255,255,.1)",
                          background: "rgba(255,255,255,.04)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 16,
                          }}
                        >
                          <h3 style={{ margin: 0 }}>Preview</h3>
                          <button
                            type="button"
                            onClick={() => setSelectedPreview(null)}
                            style={{
                              border: 0,
                              background: "#334155",
                              color: "white",
                              padding: "10px 14px",
                              borderRadius: 10,
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            Close
                          </button>
                        </div>

                        {inferPreviewType(selectedPreview) === "image" && (
                          <img
                            src={`/api/download/${encodeURIComponent(selectedPreview)}`}
                            alt={selectedPreview}
                            style={{ maxWidth: "100%", borderRadius: 12 }}
                          />
                        )}

                        {inferPreviewType(selectedPreview) === "pdf" && (
                          <iframe
                            src={`/api/download/${encodeURIComponent(selectedPreview)}`}
                            title={selectedPreview}
                            style={{
                              width: "100%",
                              height: 600,
                              border: "1px solid rgba(255,255,255,.1)",
                              borderRadius: 12,
                              background: "white",
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="portal-panel">
                    <p className="portal-kicker">Dashboard Mockup</p>
                    <h2 className="portal-title">Owner file vault</h2>

                    <div className="portal-dashboard">
                      <div className="portal-stat-grid">
                        <div className="portal-stat">
                          <strong>{files.length}</strong>
                          <span className="portal-file-meta">Saved files</span>
                        </div>
                        <div className="portal-stat">
                          <strong>{filteredFiles.length}</strong>
                          <span className="portal-file-meta">Visible files</span>
                        </div>
                        <div className="portal-stat">
                          <strong>{selectedPreview ? 1 : 0}</strong>
                          <span className="portal-file-meta">Preview open</span>
                        </div>
                      </div>

                      <div className="artifact-grid">
                        <div className="artifact-card">
                          <strong>robots.txt</strong>
                          <pre>{deploymentArtifacts.robots}</pre>
                        </div>
                        <div className="artifact-card">
                          <strong>sitemap.xml</strong>
                          <pre>{deploymentArtifacts.sitemap}</pre>
                        </div>
                        <div className="artifact-card">
                          <strong>Cloudflare Access + R2</strong>
                          <pre>{deploymentArtifacts.accessNotes}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        ) : (
          <>
            <header className="header">
              <div className="container header-inner">
                <div className="header-top">
                  <div className="logo-row">
                    <img src={siteConfig.logoSrc} alt={siteConfig.businessName} className="logo" />
                    <div>
                      <span className="brand-name">{siteConfig.businessName}</span>
                      <span className="sub-brand">Repair Shop + Business IT Solutions</span>
                    </div>
                  </div>
                  <a href={siteConfig.phoneHref} className="button-small">Call {siteConfig.phoneDisplay}</a>
                </div>

                <nav className="nav">
                  <a href="#services">Services</a>
                  <a href="#business">Business IT</a>
                  <a href="#reviews">Reviews</a>
                  <a href="#why-choose-us">Why Choose Us</a>
                  <a href="#contact">Contact</a>
                </nav>
              </div>
            </header>

            <section className="hero">
              <div className="container hero-inner">
                <div className="hero-grid">
                  <div>
                    <div className="badge-row">
                      <div className="pill"><span className="dot" />Harlingen, Texas • Serving the Rio Grande Valley</div>
                    </div>

                    <div className="badge-row">
                      <div className="meta-pill">★★★★★ Rated 4.9–5.0</div>
                      <div className="meta-pill">Same-Day Service Available</div>
                      <div className="meta-pill">Free Basic Diagnostics</div>
                    </div>

                    <h1 className="hero-title">
                      Professional Computer Repair
                      <span className="hero-accent">&amp; Business IT Solutions</span>
                    </h1>

                    <p className="hero-text">
                      Fast, dependable support for homes and businesses across Harlingen and the Rio Grande Valley. From virus removal and laptop repair to custom PCs, upgrades, and small business IT, {siteConfig.businessName} delivers practical solutions that keep your technology working.
                    </p>

                    <div className="hero-buttons">
                      <a href={siteConfig.phoneHref} className="button-primary">Call {siteConfig.phoneDisplay}</a>
                      <a href="#contact" className="button-ghost">Schedule Service</a>
                    </div>

                    <div className="hero-links">
                      <a href="#services" className="button-mini">Services</a>
                      <a href="#business" className="button-mini">Business IT</a>
                      <a href="#reviews" className="button-mini">Reviews</a>
                    </div>

                    <div className="hero-highlights">
                      {highlights.map((item) => (
                        <div key={item} className="highlight-card">{item}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="panel">
                      <div className="panel-header">
                        <div>
                          <p className="panel-label">Trusted Local Technology Support</p>
                          <h2 className="panel-title">Fast help for common repair issues</h2>
                        </div>
                        <div className="panel-call-box">
                          <div className="panel-call-label">Call or Text</div>
                          <div className="panel-call-num">{siteConfig.phoneDisplay}</div>
                        </div>
                      </div>

                      <p className="panel-text">
                        Virus removal, broken screens, slow computers, upgrade work, and business IT support handled by an experienced local technician.
                      </p>

                      <div className="service-list-box">
                        <p className="service-list-title">Popular Requests</p>
                        <div className="service-list">
                          <div className="service-item">Virus &amp; malware cleanup</div>
                          <div className="service-item">Laptop screen replacement</div>
                          <div className="service-item">SSD &amp; memory upgrades</div>
                          <div className="service-item">Small business workstation support</div>
                        </div>
                      </div>
                    </div>

                    <div className="three-stats" style={{ marginTop: 20 }}>
                      <div className="stat-card">
                        <div className="stat-big">25+</div>
                        <div className="stat-label">Years Experience</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-big">RGV</div>
                        <div className="stat-label">Local Service Area</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-big">★★★★★</div>
                        <div className="stat-label">Trusted Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="emergency">
              <div className="container emergency-inner">
                <div>
                  <p className="emergency-title">Emergency &amp; Same-Day Service</p>
                  <p className="emergency-text">Some repairs may be available for same-day service depending on parts, workload, and issue type.</p>
                </div>
                <a href={siteConfig.phoneHref} className="button-ghost">Call Now: {siteConfig.phoneDisplay}</a>
              </div>
            </section>

            <section id="services" className="section">
              <div className="container">
                <p className="section-title-small">Services</p>
                <h2 className="section-title">Computer Repair Services</h2>
                <div className="grid4">
                  {residentialServices.map((service) => (
                    <ServiceCard key={service.title} title={service.title} description={service.description} />
                  ))}
                </div>
              </div>
            </section>

            <section id="business" className="section-muted">
              <div className="container">
                <p className="section-title-small">Business IT Support</p>
                <h2 className="section-title">Small Business IT Solutions</h2>
                <p className="section-text">Support for office computers, networks, security, backups, and workstation deployment for local businesses that need dependable technology help.</p>
                <div className="grid3">
                  {businessFocusCards.map((card) => (
                    <DarkInfoCard key={card.title} title={card.title} description={card.description} />
                  ))}
                </div>
              </div>
            </section>

            <section className="section-dark">
              <div className="container">
                <p className="section-title-small">Custom Systems &amp; Upgrades</p>
                <h2 className="section-title">Custom PCs, Performance Builds, and Upgrades</h2>
                <p className="section-text">Need a new custom system or want to improve the performance of an older computer? Get help with gaming PCs, business workstations, SSD upgrades, memory upgrades, and other hardware improvements.</p>
                <div className="grid3">
                  <DarkInfoCard title="Custom PC Builds" description="Custom desktops built for reliability, gaming, creative work, or general home and office use." />
                  <DarkInfoCard title="Performance Upgrades" description="SSD, RAM, graphics, and component upgrades to improve speed, stability, and overall usability." />
                  <DarkInfoCard title="Business Workstations" description="Purpose-built systems for office productivity, accounting, design, and other professional workloads." />
                </div>
              </div>
            </section>

            <section className="section">
              <div className="container">
                <p className="section-title-small">Common Computer Problems</p>
                <h2 className="section-title">Problems We Fix Every Day</h2>
                <p className="section-text">Many computer problems start small but quickly become frustrating. If your system is experiencing any of the issues below, professional diagnostics can often restore performance and prevent data loss.</p>
                <div className="grid3">
                  {commonProblems.map((problem) => (
                    <ServiceCard key={problem.title} title={problem.title} description={problem.description} />
                  ))}
                </div>
              </div>
            </section>

            <section id="reviews" className="section-muted">
              <div className="container">
                <div className="reviews-grid">
                  <div>
                    <p className="section-title-small">Google Reviews</p>
                    <h2 className="section-title">Trusted by Local Customers</h2>
                    <div className="rating-row">
                      <div className="rating-big">{reviewStats.rating}</div>
                      <div>
                        <div className="stars">★★★★★</div>
                        <p className="small-text" style={{ marginTop: 4 }}>{reviewStats.reviewLabel}</p>
                      </div>
                    </div>
                    <p className="section-text" style={{ marginTop: 20 }}>
                      Read what local customers are saying about {siteConfig.businessName} and see why many clients trust the business for computer repairs, upgrades, and IT support.
                    </p>
                    <div className="review-actions">
                      <a href="https://www.google.com/search?q=RAM%27S+COMPUTER+REPAIR+Harlingen+TX" target="_blank" rel="noreferrer" className="button-primary review-button" aria-label="Read Google reviews for RAM'S COMPUTER REPAIR">
                        <span className="google-badge">G</span>
                        <span>Read Google Reviews</span>
                        <span className="review-stars-inline">★★★★★</span>
                      </a>
                      <div className="meta-pill">Rated highly by RGV customers</div>
                    </div>
                  </div>

                  <div className="reviews-right">
                    <div className="grid2" style={{ marginTop: 0 }}>
                      <DarkInfoCard title="Professional Service" description="Customers value clear communication, honest recommendations, and practical solutions for both home and business systems." />
                      <DarkInfoCard title="Reliable Repairs" description="From malware cleanup to hardware upgrades, many clients return for dependable repair work and trusted advice." />
                      <DarkInfoCard title="Local Reputation" description="Serving Harlingen and the surrounding RGV with personalized support instead of one-size-fits-all service." />
                      <DarkInfoCard title="Business-Friendly Support" description="Small business clients benefit from responsive assistance, workstation support, and ongoing technology help." />
                    </div>
                    <div className="qr-box">
                      <div className="qr-label">Scan Reviews</div>
                      <img src={siteConfig.reviewQrSrc} alt="Google review QR code" className="qr-image" />
                      <p className="small-text" style={{ marginTop: 12 }}>Click the button above to read current Google reviews.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="why-choose-us" className="section">
              <div className="container">
                <p className="section-title-small">Why Choose RAM'S COMPUTER REPAIR</p>
                <h2 className="section-title">Local Service You Can Count On</h2>
                <p className="section-text">Clear communication, practical repair recommendations, and dependable support for both home users and small businesses across the Rio Grande Valley.</p>
                <div className="grid4">
                  {trustReasons.map((reason) => (
                    <DarkInfoCard key={reason.title} title={reason.title} description={reason.description} />
                  ))}
                </div>
              </div>
            </section>

            <section id="service-area" className="section-dark">
              <div className="container">
                <p className="section-title-small">Service Area</p>
                <h2 className="section-title">Serving Harlingen and the Rio Grande Valley</h2>
                <p className="section-text">Computer repair and small business IT support for customers in Harlingen and surrounding RGV communities.</p>

                <div style={{ marginTop: 28, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)" }}>
                  <iframe
                    title="Harlingen Texas Service Area Map"
                    src="https://www.google.com/maps?q=Harlingen%20Texas&output=embed"
                    width="100%"
                    height="380"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="chips" style={{ marginTop: 22 }}>
                  {serviceAreas.map((area) => (
                    <span key={area} className="chip">{area}</span>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <section id="contact" className="section" style={{ paddingBottom: 80 }}>
          <div className="container">
            <div className="cta-box">
              <div className="cta-grid">
                <div>
                  <p className="section-title-small">Schedule Service</p>
                  <h2 className="section-title">Need help with your computer or business IT?</h2>
                  <p className="section-text">Call or text today for appointment availability and free basic diagnostics.</p>
                </div>
                <div className="cta-buttons">
                  <a href={siteConfig.phoneHref} className="button-ghost">{siteConfig.phoneDisplay}</a>
                  <a href={`mailto:${siteConfig.email}`} className="button-ghost">Call or Email for Appointment</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <a href={siteConfig.phoneHref} className="floating-call">Call Now</a>
      </div>
    </>
  );
}
