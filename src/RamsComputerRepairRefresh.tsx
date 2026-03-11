import logo from "../assets/logo.png";
import reviewQr from "../assets/review-qr.png";
import React, { useEffect, useMemo, useRef, useState } from "react";
import RAMeowPortal from "./components/RAMeowPortal";
import PublicSite from "./components/PublicSite";

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

  const portalCards = [
    {
      title: "Cloudflare Access protection",
      description: "Protect the RAMeow route behind Cloudflare Zero Trust so only approved identities can reach the portal.",
      tag: "Access",
    },
    {
      title: "R2-backed file vault",
      description: "Store forms, contracts, backups, invoices, and business files in Cloudflare R2 through a Worker-controlled upload flow.",
      tag: "Storage",
    },
    {
      title: "Deploy-ready SEO files",
      description: "Keep robots.txt, sitemap.xml, and security headers ready for GitHub and Cloudflare Pages deployment.",
      tag: "SEO",
    },
  ];

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
        .hero-highlights, .grid4, .grid3, .grid2, .three-stats, .reviews-right, .portal-shell, .portal-list, .portal-dashboard, .portal-stat-grid { display:grid; gap:16px; }
        .hero-highlights { grid-template-columns: repeat(2, minmax(0,1fr)); max-width:700px; margin-top:24px; }
        .grid4 { grid-template-columns: repeat(4, minmax(0,1fr)); margin-top:28px; }
        .grid3 { grid-template-columns: repeat(3, minmax(0,1fr)); margin-top:28px; }
        .grid2 { grid-template-columns: repeat(2, minmax(0,1fr)); margin-top:24px; }
        .three-stats { grid-template-columns: repeat(3, minmax(0,1fr)); }
        .reviews-right { grid-template-columns: 1fr 240px; align-items:start; gap:24px; }
        .portal-shell { grid-template-columns: .95fr 1.05fr; margin-top:28px; }
        .portal-stat-grid { grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; }
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
  <RAMeowPortal
    siteConfig={{
      businessName: siteConfig.businessName,
      logoSrc: siteConfig.logoSrc,
    }}
    portalCards={portalCards}
    files={files}
    uploading={uploading}
    uploadProgress={uploadProgress}
    dragActive={dragActive}
    selectedPreview={selectedPreview}
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    setDragActive={setDragActive}
    setSelectedPreview={setSelectedPreview}
    fileInputRef={fileInputRef}
    filteredFiles={filteredFiles}
    inferPreviewType={inferPreviewType}
    uploadSelectedFile={uploadSelectedFile}
    deleteFile={deleteFile}
  />
        ) : (
            <PublicSite
    siteConfig={{
      businessName: siteConfig.businessName,
      phoneDisplay: siteConfig.phoneDisplay,
      phoneHref: siteConfig.phoneHref,
      location: siteConfig.location,
      email: siteConfig.email,
      domain: siteConfig.domain,
      logoSrc: siteConfig.logoSrc,
      reviewQrSrc: siteConfig.reviewQrSrc,
    }}
    residentialServices={residentialServices}
    businessFocusCards={businessFocusCards}
    commonProblems={commonProblems}
    trustReasons={trustReasons}
    serviceAreas={serviceAreas}
    reviewStats={reviewStats}
    highlights={highlights}
  />
);
}
