// @ts-nocheck
import { useState, useRef, useEffect } from "react";

// ── DARK MODE CSS ──────────────────────────────────────────
const DARK_CSS = `
  :root {
    --rb-bg:       #ffffff;
    --rb-bg2:      #f5f5f5;
    --rb-bg3:      #ebebeb;
    --rb-text:     #111111;
    --rb-text2:    #555555;
    --rb-text3:    #888888;
    --rb-border:   rgba(0,0,0,0.10);
    --rb-border2:  rgba(0,0,0,0.18);

    --rb-green-bg:   #E6F5EE;  --rb-green-br:  #5DCAA5;  --rb-green-col: #0A6E4A;  --rb-green-dk: #064D34;
    --rb-blue-bg:    #EBF3FD;  --rb-blue-br:   #B5D4F4;  --rb-blue-col:  #185FA5;  --rb-blue-dk:  #0C447C;
    --rb-amber-bg:   #FDF3E3;  --rb-amber-br:  #EF9F27;  --rb-amber-col: #92570A;  --rb-amber-dk: #6B3D06;
    --rb-red-bg:     #FEF2F2;  --rb-red-br:    #F09595;  --rb-red-col:   #991B1B;  --rb-red-dk:   #7A1515;
    --rb-purple-bg:  #F3F0FE;  --rb-purple-col:#4B3FC1;
    --rb-gray-bg:    #F3F4F6;  --rb-gray-br:   #D1D5DB;  --rb-gray-col:  #4B5563;

    --rb-tc-bg: #EBF3FD; --rb-tc-br: #B5D4F4; --rb-tc-col: #185FA5; --rb-tc-dk: #0C447C;
    --rb-hm-bg: #E6F5EE; --rb-hm-br: #9FE1CB; --rb-hm-col: #0A6E4A; --rb-hm-dk: #064D34;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --rb-bg:       #1a1a1a;
      --rb-bg2:      #242424;
      --rb-bg3:      #2e2e2e;
      --rb-text:     #f0f0f0;
      --rb-text2:    #a0a0a0;
      --rb-text3:    #666666;
      --rb-border:   rgba(255,255,255,0.10);
      --rb-border2:  rgba(255,255,255,0.18);

      --rb-green-bg:   #0d2e1f;  --rb-green-br:  #1a5c3a;  --rb-green-col: #4ade9a;  --rb-green-dk: #6efbb4;
      --rb-blue-bg:    #0d1f35;  --rb-blue-br:   #1a3a6b;  --rb-blue-col:  #60a5fa;  --rb-blue-dk:  #93c5fd;
      --rb-amber-bg:   #2d1d06;  --rb-amber-br:  #7a4a10;  --rb-amber-col: #fbbf24;  --rb-amber-dk: #fcd34d;
      --rb-red-bg:     #2d0d0d;  --rb-red-br:    #7a1515;  --rb-red-col:   #f87171;  --rb-red-dk:   #fca5a5;
      --rb-purple-bg:  #1e1a3d;  --rb-purple-col:#a78bfa;
      --rb-gray-bg:    #1f2128;  --rb-gray-br:   #374151;  --rb-gray-col:  #9ca3af;

      --rb-tc-bg: #0d1f35; --rb-tc-br: #1a3a6b; --rb-tc-col: #60a5fa; --rb-tc-dk: #93c5fd;
      --rb-hm-bg: #0d2e1f; --rb-hm-br: #1a5c3a; --rb-hm-col: #4ade9a; --rb-hm-dk: #6efbb4;
    }
  }
  * { box-sizing: border-box; }
  body {
    background: var(--rb-bg3);
    color: var(--rb-text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin: 0;
  }
  input, textarea, button, select {
    font-family: inherit;
    color: var(--rb-text);
  }
  input, textarea {
    background: var(--rb-bg);
    border: 1px solid var(--rb-border2);
    color: var(--rb-text);
  }
  input::placeholder, textarea::placeholder { color: var(--rb-text3); }
`;

function GlobalStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = DARK_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

// ── THEME HELPERS ──────────────────────────────────────────
// Replace hardcoded hex with CSS var references
const T = {
  bg:        "var(--rb-bg)",
  bg2:       "var(--rb-bg2)",
  bg3:       "var(--rb-bg3)",
  text:      "var(--rb-text)",
  text2:     "var(--rb-text2)",
  text3:     "var(--rb-text3)",
  border:    "var(--rb-border)",
  border2:   "var(--rb-border2)",

  greenBg:   "var(--rb-green-bg)",   greenBr:  "var(--rb-green-br)",  greenCol: "var(--rb-green-col)",  greenDk: "var(--rb-green-dk)",
  blueBg:    "var(--rb-blue-bg)",    blueBr:   "var(--rb-blue-br)",   blueCol:  "var(--rb-blue-col)",   blueDk:  "var(--rb-blue-dk)",
  amberBg:   "var(--rb-amber-bg)",   amberBr:  "var(--rb-amber-br)",  amberCol: "var(--rb-amber-col)",  amberDk: "var(--rb-amber-dk)",
  redBg:     "var(--rb-red-bg)",     redBr:    "var(--rb-red-br)",    redCol:   "var(--rb-red-col)",    redDk:   "var(--rb-red-dk)",
  purpleBg:  "var(--rb-purple-bg)",  purpleCol:"var(--rb-purple-col)",
  grayBg:    "var(--rb-gray-bg)",    grayBr:   "var(--rb-gray-br)",   grayCol:  "var(--rb-gray-col)",

  tcBg:  "var(--rb-tc-bg)",  tcBr:  "var(--rb-tc-br)",  tcCol:  "var(--rb-tc-col)",  tcDk:  "var(--rb-tc-dk)",
  hmBg:  "var(--rb-hm-bg)",  hmBr:  "var(--rb-hm-br)",  hmCol:  "var(--rb-hm-col)",  hmDk:  "var(--rb-hm-dk)",
};

// ── DATA ───────────────────────────────────────────────────

// Branded merchants — TC and HM always present with full theming
const BRANDED_MERCHANTS = {
  TC: { name:"True Classic",  tagline:"Premium basics",      col:T.tcCol,    bg:T.tcBg,    br:T.tcBr,    dk:T.tcDk    },
  HM: { name:"Hommey",        tagline:"Comfort home goods",  col:T.hmCol,    bg:T.hmBg,    br:T.hmBr,    dk:T.hmDk    },
  TM: { name:"Test Merchant", tagline:"ShipBob test channel",col:T.purpleCol,bg:T.purpleBg,br:"#C4B5FD",  dk:"#5B21B6" },
};

// Palette for auto-generated dynamic merchants
const DYN_PALETTES = [
  { col:"#7C3AED", bg:"#F5F3FF", br:"#C4B5FD", dk:"#5B21B6" },
  { col:"#0891B2", bg:"#ECFEFF", br:"#67E8F9", dk:"#0E7490" },
  { col:"#D97706", bg:"#FFFBEB", br:"#FCD34D", dk:"#B45309" },
  { col:"#BE185D", bg:"#FDF2F8", br:"#F9A8D4", dk:"#9D174D" },
  { col:"#059669", bg:"#ECFDF5", br:"#6EE7B7", dk:"#047857" },
  { col:"#DC2626", bg:"#FEF2F2", br:"#FCA5A5", dk:"#B91C1C" },
];

// Runtime merchant registry — starts with branded, grows dynamically
let MERCHANTS = { ...BRANDED_MERCHANTS };

// Ensure a merchant exists in registry, auto-creating if unknown
const ensureMerchant = (id, name) => {
  if (MERCHANTS[id]) return MERCHANTS[id];
  const idx = Object.keys(MERCHANTS).length % DYN_PALETTES.length;
  const pal = DYN_PALETTES[idx];
  const abbr = id.slice(0, 2).toUpperCase();
  MERCHANTS[id] = {
    name:    name || id,
    tagline: "ShipBob merchant",
    col: pal.col, bg: pal.bg, br: pal.br, dk: pal.dk,
    dynamic: true,
  };
  return MERCHANTS[id];
};

// ── SHIPBOB API ────────────────────────────────────────────
const SB_PROXY = "/api/shipbob";

// Map a ShipBob return object → ReturnBob RMA shape
// Field names confirmed from live API response
const sbReturnToRMA = (ret) => {
  // Merchant comes from channel.name in ShipBob sandbox
  const channelName = (ret.channel?.name || "").toLowerCase();
  const refId       = (ret.reference_id || "").toLowerCase();

  let merId = "TC"; // fallback
const CHANNEL_MAP = {
  178091: "TM",
  178142: "TM",
};
if (CHANNEL_MAP[ret.channel?.id]) {
  merId = CHANNEL_MAP[ret.channel?.id];
} else if (channelName.includes("hommey") || refId.includes("hommey")) {
  merId = "HM";
} else if (channelName.includes("true classic") || refId.includes("tc")) {
  merId = "TC";
} else if (ret.channel?.id) {
  merId = `CH${ret.channel.id}`;
}

  // Auto-register dynamic merchant if not known
  const merName = ret.channel?.name || merId;
  ensureMerchant(merId, merName);

  // inventory array holds the actual items
  const inv     = ret.inventory || [];
  const item    = inv[0] || {};
  const name    = item.name || "ShipBob return";
  const sku     = String(item.id || "—"); // ShipBob inventory ID as SKU
  const qty     = String(inv.reduce((s, i) => s + (i.quantity || 1), 0) || 1);

  // action_requested.action tells us what ShipBob wants done (Restock/Donate/Dispose)
  const action  = item.action_requested?.action || "";
  const reason  = `${ret.return_type || "Return"} — ${action || ret.status || "Pending"}`;

  return {
    id:      String(ret.id),
    mer:     merId,
    sku,
    name,
    var:     ret.fulfillment_center?.name || "—",
    reason,
    qty,
    orderN:  ret.reference_id || "",
    labelBC: ret.tracking_number || "",
    bagBC:   "",
    prev:    false,
    img:     "📦",
    fromSB:  true,
    sbStatus: ret.status || "",
    sbAction: action,
  };
};

// Fetch all returns from ShipBob via proxy, paginating if needed
const fetchSBReturns = async () => {
  const results = [];
  let page = 1;
  const limit = 50;
  while (true) {
    const res = await fetch(`${SB_PROXY}?endpoint=returns&page=${page}&limit=${limit}`);
    if (!res.ok) {
      let errMsg = `HTTP ${res.status}`;
      try {
        const errJson = await res.json();
        errMsg = errJson.details || errJson.error || errMsg;
      } catch {}
      throw new Error(errMsg);
    }
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data.data || data.items || data.returns || []);
    results.push(...items);
    if (items.length < limit) break;
    page++;
  }
  return results;
};
const USERS = {
  "QR-A01": { name:"Marcus R.", ini:"MR", role:"associate",  id:"A01", mer:"TC" },
  "QR-A02": { name:"Priya S.",  ini:"PS", role:"associate",  id:"A02", mer:"TC" },
  "QR-S01": { name:"Dana K.",   ini:"DK", role:"supervisor", id:"S01", mer:null },
};
const CONDITIONS = [
  { id:"new",     grade:"A", label:"New / Unworn",        detail:"Tags on, never worn, original packaging intact", col:T.greenCol, bg:T.greenBg, br:T.greenBr, route:"direct_restock", steps:["Confirm all tags attached","Check packaging sealed and undamaged","Verify SKU matches system","Place directly in restock Gaylord"], note:"Grade A — direct to restock, no VAS required." },
  { id:"good",    grade:"B", label:"Good — minor issues",  detail:"Tried on, needs rebag or retag before restock",  col:T.blueCol,  bg:T.blueBg,  br:T.blueBr,  route:"vas",            steps:["Inspect garment front and back","Note any minor defects","Confirm SKU label readable","Select VAS steps on next screen"], note:"Grade B — VAS required before restocking." },
  { id:"worn",    grade:"C", label:"Visible wear",         detail:"Pilling, fading, or minor snags present",        col:T.amberCol, bg:T.amberBg, br:T.amberBr, route:"donate",         steps:["Document visible wear or damage","Confirm item is clean and wearable","No retag or rebag required","Route to Donate Gaylord"], note:"Grade C — donate, no VAS required." },
  { id:"damaged", grade:"D", label:"Damaged / Defective",  detail:"Stains, tears, broken hardware or unusable",     col:T.redCol,   bg:T.redBg,   br:T.redBr,   route:"dispose",        steps:["Document all damage","Confirm item cannot be resold","No processing required","Route to Scrap Gaylord"], note:"Grade D — dispose, no VAS required." },
];
const VAS_STEPS = [
  { id:"rebag",   label:"Rebag",             icon:"◻", bt:false, mandatory:false, detail:"Place in fresh polybag and seal",          steps:["Remove item from current packaging","Inspect new polybag for damage","Fold item and place inside","Seal with brand sticker","Verify sticker flush — no air pockets"] },
  { id:"refold",  label:"Refold",            icon:"⊡", bt:false, mandatory:false, detail:"Fold to brand presentation standard",      steps:["Lay item flat on clean surface","Fold sleeves toward centre","Fold bottom third up","Fold top third down","Target: approx 30x22cm"] },
  { id:"retag",   label:"Retag",             icon:"◈", bt:false, mandatory:false, detail:"Replace brand tag and care label",         steps:["Check brand tag present — attach if missing","Ensure care label is readable","Attach hang tag to right seam loop","Confirm price tag removed","Loop only — do not pierce fabric"] },
  { id:"recode",  label:"Recode / Rebarcode",icon:"▣", bt:true,  mandatory:false, detail:"Print new label via Bartender and apply",  steps:["Open Bartender template on print station","Enter SKU from system","Select correct label size","Print and allow 5 seconds to dry","Apply flat — no creases — scan to verify"] },
  { id:"steam",   label:"Steam / Press",     icon:"≋", bt:false, mandatory:false, detail:"Remove wrinkles to presentation standard", steps:["Hang item on steaming rack","Hold steamer 5cm from fabric","Work top to bottom in slow strokes","Allow 30 seconds to cool","Check for remaining creases"] },
  { id:"inspect", label:"Quality inspect",   icon:"◎", bt:false, mandatory:true,  detail:"Final check — no defects, SKU correct",   steps:["Hold at arm's length — check overall presentation","Check seams for loose threads","Confirm SKU label matches system","Verify tags secure","Flag exception or re-grade if any issue found"] },
];
const VAS_OUTCOMES = [
  { id:"restock", label:"Restock", detail:"VAS complete — item meets resale standard", col:T.greenCol, bg:T.greenBg },
  { id:"donate",  label:"Donate",  detail:"Item not suitable for resale after VAS",    col:T.amberCol, bg:T.amberBg },
  { id:"dispose", label:"Dispose", detail:"Item cannot be resold or donated",          col:T.redCol,   bg:T.redBg   },
];
const GAYLORDS = {
  restock: { label:"Restock", gid:"TC-RSTOCK-01", loc:"Zone A · Row 3 · Bay 2", col:T.greenCol, bg:T.greenBg, cap:84,  used:47 },
  donate:  { label:"Donate",  gid:"TC-DONATE-01", loc:"Zone C · Row 1 · Bay 4", col:T.amberCol, bg:T.amberBg, cap:120, used:89 },
  dispose: { label:"Dispose", gid:"TC-SCRAP-01",  loc:"Zone D · Row 2 · Bay 1", col:T.redCol,   bg:T.redBg,   cap:200, used:31 },
};

// ── LIVE SHIFT STATE (starts empty, fills from real work) ──
const HOURS = ["7a","8a","9a","10a","11a","12p","1p","2p","3p","4p"];
const makeEmptyShift = () => ({
  total: 0,
  tgt: 360,
  assocs: [],
  hourly: new Array(HOURS.length).fill(0),
  hours: HOURS,
  mers: Object.keys(MERCHANTS).map(id => ({ id, name: MERCHANTS[id].name, n:0, rs:0, dn:0, dp:0 })),
});
const makeAssocEntry = (user) => ({
  id:  user.id,
  name: user.name,
  ini:  user.ini,
  n:   0,
  tgt: 120,
  gr:  { A:0, B:0, C:0, D:0 },
  vas: 0,
});

const GC = { A:T.greenCol, B:T.blueCol,  C:T.amberCol, D:T.redCol  };
const GB = { A:T.greenBg,  B:T.blueBg,   C:T.amberBg,  D:T.redBg   };
const INIT_ASTATS = { n:0, tgt:60, gr:{A:0,B:0,C:0,D:0}, vas:0, vasUnits:0, rs:0, dn:0, dp:0, exc:0 };

// ── CSV UTILS ──────────────────────────────────────────────
const escCSV = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
const toCSV  = rows => { if (!rows.length) return ""; const h = Object.keys(rows[0]); return [h.join(","), ...rows.map(r => h.map(k => escCSV(r[k])).join(","))].join("\n"); };
const dlCSV  = (name, rows) => { const csv = toCSV(rows); const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv); a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a); };
const normKey   = h => h.toLowerCase().trim().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");
const splitLine = line => { const cols=[]; let cur="", q=false; for (const ch of line) { if (ch==='"') q=!q; else if ((ch===","||ch==="\t")&&!q) { cols.push(cur.trim()); cur=""; } else cur+=ch; } cols.push(cur.trim()); return cols; };
const parseCSV  = txt => { const lines=txt.trim().split(/\r?\n/); const hdrs=splitLine(lines[0]).map(normKey); return lines.slice(1).filter(l=>l.trim()).map(line=>{ const cols=splitLine(line), o={}; hdrs.forEach((h,i)=>{ o[h]=(cols[i]||"").replace(/^"|"$/g,""); }); return o; }); };

const rowToRMA = (row, i, seen) => {
  const g = (...ks) => { for (const k of ks) if (row[k]&&row[k].trim()) return row[k].trim(); return ""; };
  const lb=g("label_barcode"), bb=g("return_bag_barcode"), si=g("outbound_shipment_id"), on=g("order_number"), po=g("po_");
  const base = lb||bb||si||on||po||`row-${i}`;
  const id   = seen.has(base) ? `${base}-${i}` : base;
  seen.add(id);
  const prev = g("return_previously_reported").toLowerCase();
  const rawMer = g("merchant_id","merchant","client","client_id","program","brand").toUpperCase();
  let mer = "TC";
  if (MERCHANTS[rawMer]) { mer = rawMer; } else {
    const rawName = g("merchant_name","merchant","client","brand","program").toLowerCase();
    if (rawName.includes("hommey")) mer = "HM";
    else if (rawName.includes("true classic")||rawName.includes("trueclassic")) mer = "TC";
    const sku = g("sku").toUpperCase();
    if (sku.startsWith("HM")) mer = "HM";
    else if (sku.startsWith("TC")) mer = "TC";
  }
  return { id, mer, sku:g("sku")||"—", name:g("name")||g("sku")||"Uploaded item",
    var:g("size")||g("variant")||"—", reason:g("return_reason")||"Not specified",
    qty:g("quantity")||"1", orderN:on, labelBC:lb, bagBC:bb,
    prev:["true","1","yes"].includes(prev), img:"📦", uploaded:true };
};

// ── SHARED UI ──────────────────────────────────────────────
function Card({ children, style, onClick }) {
  return <div onClick={onClick} style={{ background:T.bg, border:`0.5px solid ${T.border}`, borderRadius:14, padding:"18px 20px", marginBottom:14, cursor:onClick?"pointer":"default", ...style }}>{children}</div>;
}
function Btn({ children, onClick, col, tc="#fff", disabled, style }) {
  const bg = col || T.text;
  return <button onClick={onClick} disabled={disabled} style={{ background:bg, color:tc, border:"none", padding:"16px 20px", borderRadius:12, fontSize:15, fontWeight:600, cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.4:1, width:"100%", textAlign:"center", lineHeight:1.3, ...style }}>{children}</button>;
}
function Ghost({ children, onClick, style }) {
  return <button onClick={onClick} style={{ background:"transparent", color:T.text2, border:`1px solid ${T.border2}`, padding:"13px 20px", borderRadius:12, fontSize:14, cursor:"pointer", width:"100%", textAlign:"center", ...style }}>{children}</button>;
}
function Av({ ini, sz=36, bg, col }) {
  return <div style={{ width:sz, height:sz, borderRadius:"50%", background:bg||T.blueBg, color:col||T.blueCol, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:sz*0.32, flexShrink:0 }}>{ini}</div>;
}
function Tag({ children, col, bg, br }) {
  return <span style={{ background:bg, color:col, border:`1px solid ${br||col}`, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{children}</span>;
}
function SL({ children, mt=4 }) {
  return <div style={{ fontSize:11, fontWeight:700, color:T.text2, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10, marginTop:mt }}>{children}</div>;
}
function MiniBar({ val, max, col, h=6 }) {
  const pct = max>0 ? Math.min(100,Math.round((val/max)*100)) : 0;
  return <div style={{ background:T.bg3, borderRadius:4, height:h, overflow:"hidden" }}><div style={{ width:`${pct}%`, height:h, background:col, borderRadius:4, transition:"width 0.4s" }}/></div>;
}
function StepBar({ steps, cur }) {
  return (
    <div style={{ display:"flex", alignItems:"center", marginBottom:24 }}>
      {steps.map((s,i) => (
        <div key={s} style={{ display:"flex", alignItems:"center", flex:i<steps.length-1?1:0 }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:i<cur?T.greenCol:i===cur?T.text:T.bg2, border:`2px solid ${i<=cur?"transparent":T.border2}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:i<=cur?"#fff":T.text3, flexShrink:0 }}>
              {i<cur?"✓":i+1}
            </div>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.05em", color:i===cur?T.text:T.text3, whiteSpace:"nowrap", textTransform:"uppercase" }}>{s}</div>
          </div>
          {i<steps.length-1 && <div style={{ flex:1, height:2, background:i<cur?T.greenCol:T.border, margin:"0 6px", marginBottom:20, borderRadius:2 }}/>}
        </div>
      ))}
    </div>
  );
}
function ItemCard({ r }) {
  const m = MERCHANTS[r.mer];
  return (
    <Card style={{ marginBottom:16, background:T.bg2 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div style={{ display:"flex", gap:14, alignItems:"center" }}>
          <div style={{ fontSize:30, lineHeight:1 }}>{r.img}</div>
          <div>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:2, color:T.text }}>{r.name}</div>
            <div style={{ fontSize:12, color:T.text2, marginBottom:2 }}>{r.var}</div>
            <div style={{ fontSize:11, color:T.text3, fontFamily:"monospace" }}>{r.sku}</div>
          </div>
        </div>
        {m && <Tag col={m.col} bg={m.bg} br={m.br}>{m.name}</Tag>}
      </div>
      <div style={{ marginTop:12, padding:"8px 12px", background:T.bg, borderRadius:8, border:`0.5px solid ${T.border}` }}>
        <span style={{ fontSize:12, color:T.text3 }}>Return reason: </span>
        <span style={{ fontSize:12, fontWeight:500, color:T.text }}>{r.reason}</span>
      </div>
    </Card>
  );
}
function InstrPanel({ title, steps, note, col, bg, br }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border:`1px solid ${br}`, borderRadius:10, marginBottom:14, overflow:"hidden" }}>
      <div onClick={()=>setOpen(o=>!o)} style={{ background:bg, padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
        <span style={{ fontSize:13, fontWeight:700, color:col }}>{title}</span>
        <span style={{ fontSize:12, color:col, opacity:0.7 }}>{open?"▲ hide":"▼ show"}</span>
      </div>
      {open && (
        <div style={{ padding:"14px 16px", background:T.bg }}>
          <div style={{ background:T.bg2, borderRadius:8, padding:"8px 12px", marginBottom:12, textAlign:"center", fontSize:12, color:T.text3 }}>No image uploaded — text instructions shown</div>
          {steps.map((s,i) => (
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ width:22, height:22, borderRadius:"50%", background:bg, border:`1px solid ${br}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:col, flexShrink:0 }}>{i+1}</div>
              <div style={{ fontSize:13, color:T.text, lineHeight:1.55, paddingTop:2 }}>{s}</div>
            </div>
          ))}
          {note && <div style={{ marginTop:10, padding:"8px 12px", background:bg, borderRadius:8, fontSize:12, color:col, fontWeight:600 }}>{note}</div>}
        </div>
      )}
    </div>
  );
}
function ExcFlag({ onClick }) {
  return (
    <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:12 }}>
      <button onClick={onClick} style={{ fontSize:12, fontWeight:700, color:T.amberCol, background:T.amberBg, border:`1px solid ${T.amberBr}`, borderRadius:8, padding:"7px 14px", cursor:"pointer" }}>⚑ Flag exception</button>
    </div>
  );
}

// ── UPLOAD SCREEN ──────────────────────────────────────────
function UploadScreen({ rmas, onUpload, onBack }) {
  const [preview,  setPreview]  = useState(null);
  const [drag,     setDrag]     = useState(false);
  const [err,      setErr]      = useState(null);
  const [result,   setResult]   = useState(null);
  const [sbStatus, setSbStatus] = useState("idle");
  const [sbMsg,    setSbMsg]    = useState("");
  const fileRef = useRef();

  const syncShipBob = async () => {
    setSbStatus("loading"); setSbMsg(""); setErr(null); setResult(null);
    try {
      const raw = await fetchSBReturns();
      if (!raw.length) {
        setSbStatus("error");
        setSbMsg("No returns found in ShipBob. Check your account has active returns.");
        return;
      }
      const newRMAs = {};
      const newMers = new Set();
      raw.forEach((ret, i) => {
        try {
          const rma = sbReturnToRMA(ret);
          newRMAs[rma.id] = rma;
          newMers.add(rma.mer);
        } catch (mapErr) {
          console.error(`Failed to map return ${i}:`, mapErr, ret);
        }
      });
      const loaded = Object.keys(newRMAs).length;
      if (loaded === 0) {
        setSbStatus("error");
        setSbMsg("Returns were fetched but could not be mapped. Check console for details.");
        return;
      }
      onUpload(newRMAs, [...newMers]);
      setSbStatus("success");
      setSbMsg(`✓ ${loaded} return${loaded !== 1 ? "s" : ""} synced from ShipBob across ${newMers.size} merchant${newMers.size !== 1 ? "s" : ""}`);
    } catch (e) {
      setSbStatus("error");
      setSbMsg(`Error: ${e.message || "Could not connect to ShipBob"}`);
    }
  };

  const handle = file => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const rows = parseCSV(e.target.result);
        if (!rows.length) { setErr("File appears empty"); return; }
        const known = ["sku","label_barcode","order_number","name","return_reason","outbound_shipment_id"];
        if (!known.some(k=>Object.keys(rows[0]).includes(k))) { setErr("Headers not recognised — check column names"); return; }
        setPreview(rows); setErr(null);
      } catch { setErr("Could not parse file — check format"); }
    };
    reader.readAsText(file);
  };
  const commit = () => {
    const newRMAs={}, seen=new Set(); let dupes=0;
    preview.forEach((row,i) => {
      const m = rowToRMA(row,i,seen);
      const base = row["label_barcode"]?.trim()||row["return_bag_barcode"]?.trim()||row["outbound_shipment_id"]?.trim()||row["order_number"]?.trim()||"";
      if (base && m.id!==base) dupes++;
      newRMAs[m.id] = m;
    });
    setResult({ total:preview.length, loaded:Object.keys(newRMAs).length, dupes });
    onUpload(newRMAs, []); setPreview(null);
  };
  const SAMPLE = [
    {"po #":"PO-10042","outbound shipment id":"SHP-88821","name":"Classic Crew Tee","sku":"TC-CREW-GRY-M","label barcode":"LBL-TC-0042","return bag barcode":"BAG-TC-9921","order number":"ORD-20948","return reason":"Too small","quantity":"1","return previously reported":"false"},
    {"po #":"PO-10043","outbound shipment id":"SHP-88822","name":"Cloud Slipper","sku":"HM-SLIPPER-BLK-8","label barcode":"LBL-HM-0031","return bag barcode":"BAG-HM-0041","order number":"ORD-20949","return reason":"Colour not as expected","quantity":"1","return previously reported":"false"},
  ];

  return (
    <div style={{ minHeight:"100vh", background:T.bg3 }}>
      <div style={{ background:T.bg, borderBottom:`1px solid ${T.border}`, padding:"14px 20px", display:"flex", alignItems:"center", gap:14 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:T.text2, lineHeight:1 }}>‹</button>
        <div><div style={{ fontSize:16, fontWeight:700, color:T.text }}>Load returns</div><div style={{ fontSize:12, color:T.text2, marginTop:1 }}>Sync from ShipBob or upload a CSV</div></div>
      </div>
      <div style={{ padding:16, maxWidth:560, margin:"0 auto" }}>

        <Card style={{ border:`1.5px solid ${T.blueBr}`, background:T.blueBg, marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:T.bg, border:`1px solid ${T.blueBr}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>📦</div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:T.blueCol }}>Sync from ShipBob</div>
              <div style={{ fontSize:12, color:T.blueCol, opacity:0.8, marginTop:2 }}>Pulls all active returns — any merchant</div>
            </div>
          </div>
          {sbStatus === "idle" && (
            <Btn onClick={syncShipBob} col={T.blueCol} style={{ fontSize:14, padding:"13px" }}>↻ Sync returns from ShipBob now</Btn>
          )}
          {sbStatus === "loading" && (
            <div style={{ textAlign:"center", padding:"14px 0" }}>
              <div style={{ fontSize:13, color:T.blueCol, fontWeight:600 }}>Fetching from ShipBob…</div>
              <div style={{ fontSize:11, color:T.blueCol, opacity:0.7, marginTop:4 }}>This may take a few seconds</div>
            </div>
          )}
          {sbStatus === "success" && (
            <div style={{ background:T.greenBg, border:`1px solid ${T.greenBr}`, borderRadius:10, padding:"12px 14px" }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.greenCol }}>{sbMsg}</div>
              <button onClick={()=>{setSbStatus("idle");setSbMsg("");}} style={{ marginTop:8, fontSize:12, color:T.blueCol, background:"none", border:"none", cursor:"pointer", padding:0 }}>Sync again</button>
            </div>
          )}
          {sbStatus === "error" && (
            <div style={{ background:T.redBg, border:`1px solid ${T.redBr}`, borderRadius:10, padding:"12px 14px" }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.redCol }}>⚠ {sbMsg}</div>
              <button onClick={()=>{setSbStatus("idle");setSbMsg("");}} style={{ marginTop:8, fontSize:12, color:T.blueCol, background:"none", border:"none", cursor:"pointer", padding:0 }}>Try again</button>
            </div>
          )}
        </Card>

        <div style={{ display:"flex", alignItems:"center", gap:10, margin:"18px 0" }}>
          <div style={{ flex:1, height:1, background:T.border }}/>
          <div style={{ fontSize:11, color:T.text3, fontWeight:600 }}>or upload a CSV file manually</div>
          <div style={{ flex:1, height:1, background:T.border }}/>
        </div>

        <input ref={fileRef} type="file" accept=".csv,.tsv,.txt,.xlsx,.xls" onChange={e=>handle(e.target.files[0])} style={{ display:"none" }}/>
        <div onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);handle(e.dataTransfer.files[0]);}} onClick={()=>fileRef.current.click()}
          style={{ border:`2px dashed ${drag?T.blueCol:T.border2}`, background:drag?T.blueBg:T.bg2, borderRadius:16, padding:"36px 20px", textAlign:"center", cursor:"pointer", marginBottom:14 }}>
          <div style={{ fontSize:30, marginBottom:8 }}>📂</div>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:4, color:T.text }}>Tap to select CSV file</div>
          <div style={{ fontSize:12, color:T.text2 }}>CSV · TSV · Excel</div>
        </div>

        {err && <div style={{ background:T.redBg, border:`1px solid ${T.redBr}`, borderRadius:10, padding:"10px 14px", fontSize:13, color:T.redCol, marginBottom:12 }}>{err}</div>}

        {result && (
          <Card style={{ background:result.loaded===result.total?T.greenBg:T.amberBg, border:`1px solid ${result.loaded===result.total?T.greenBr:T.amberBr}`, marginBottom:16 }}>
            <div style={{ fontSize:14, fontWeight:700, color:result.loaded===result.total?T.greenCol:T.amberCol, marginBottom:10 }}>{result.loaded===result.total?"✓":"⚠"} {result.loaded} of {result.total} rows loaded</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[["In file",result.total,T.text],["Loaded",result.loaded,T.greenCol],["Dupes fixed",result.dupes,result.dupes>0?T.amberCol:T.greenCol]].map(([l,v,c])=>(
                <div key={l} style={{ textAlign:"center", background:T.bg, borderRadius:8, padding:"10px 6px" }}>
                  <div style={{ fontSize:20, fontWeight:700, color:c }}>{v}</div>
                  <div style={{ fontSize:10, fontWeight:700, color:T.text2, marginTop:2, textTransform:"uppercase", letterSpacing:"0.05em" }}>{l}</div>
                </div>
              ))}
            </div>
            {result.dupes>0 && <div style={{ marginTop:10, fontSize:12, color:T.amberCol }}>Duplicate IDs auto-fixed — all rows loaded.</div>}
          </Card>
        )}

        {preview && (
          <>
            <Card style={{ background:T.greenBg, border:`1px solid ${T.greenBr}`, marginBottom:12 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.greenCol, marginBottom:8 }}>✓ {preview.length} RMAs ready to import</div>
              {preview.slice(0,3).map((r,i) => {
                const pid = r["label_barcode"]||r["return_bag_barcode"]||r["outbound_shipment_id"]||r["order_number"]||`Row ${i+1}`;
                const isPrev = ["true","1","yes"].includes((r["return_previously_reported"]||"").toLowerCase());
                return (
                  <div key={i} style={{ padding:"6px 0", borderBottom:i<Math.min(2,preview.length-1)?`1px solid ${T.greenBr}`:"none" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:12, color:T.greenCol, fontWeight:700 }}>{pid}</span>
                      <div style={{ display:"flex", gap:6 }}>
                        {isPrev && <span style={{ fontSize:10, background:T.amberBg, color:T.amberCol, border:`1px solid ${T.amberBr}`, borderRadius:10, padding:"1px 7px", fontWeight:700 }}>Prev</span>}
                        <span style={{ fontSize:11, color:T.greenCol }}>Qty: {r["quantity"]||"1"}</span>
                      </div>
                    </div>
                    <div style={{ fontSize:11, color:T.greenCol, marginTop:2, opacity:0.8 }}>{r["name"]||r["sku"]||"—"} · {r["return_reason"]||"—"}</div>
                  </div>
                );
              })}
              {preview.length>3 && <div style={{ fontSize:11, color:T.greenCol, marginTop:6, opacity:0.7 }}>+{preview.length-3} more</div>}
            </Card>
            <Btn onClick={commit} col={T.greenCol} style={{ marginBottom:10 }}>Add {preview.length} RMAs to queue →</Btn>
            <Ghost onClick={()=>setPreview(null)}>Cancel</Ghost>
          </>
        )}

        {!preview && !result && (
          <>
            <div style={{ textAlign:"center", margin:"8px 0 10px", fontSize:12, color:T.text3 }}>— or download a sample template —</div>
            <Ghost onClick={()=>dlCSV("returnbob_template.csv", SAMPLE)}>↓ Download CSV template</Ghost>
          </>
        )}

        <Card style={{ background:T.bg2, marginTop:20 }}>
          <SL mt={0}>Current queue · {Object.keys(rmas).length} items</SL>
          {Object.entries(MERCHANTS).map(([id,m]) => {
            const ct = Object.values(rmas).filter(r=>r.mer===id).length;
            if (ct === 0 && m.dynamic) return null;
            return (
              <div key={id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom:`0.5px solid ${T.border}`, fontSize:13 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:ct>0?m.col:T.border2 }}/>
                  <span style={{ color:T.text2 }}>{m.name}</span>
                  {m.dynamic && <span style={{ fontSize:10, background:T.grayBg, color:T.grayCol, border:`1px solid ${T.grayBr}`, borderRadius:10, padding:"1px 6px" }}>ShipBob</span>}
                </div>
                <span style={{ fontWeight:700, color:T.text }}>{ct} items</span>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}


// ── EXCEPTION SCREEN ───────────────────────────────────────
function ExcScreen({ rmaId, onSave, onClose }) {
  const [reason, setReason] = useState("");
  const [notes,  setNotes]  = useState("");
  const [photo,  setPhoto]  = useState(null);
  const fileRef = useRef();
  const REASONS = ["Wrong item received","Damaged in transit","Missing components","Label mismatch","Customer claim dispute","Other"];
  const onPhoto = e => { const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>setPhoto(ev.target.result); r.readAsDataURL(f); };
  return (
    <div style={{ minHeight:"100vh", background:T.bg3 }}>
      <div style={{ background:T.bg, borderBottom:`1px solid ${T.border}`, padding:"14px 20px", display:"flex", alignItems:"center", gap:14 }}>
        <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:T.text2, lineHeight:1 }}>‹</button>
        <div><div style={{ fontSize:16, fontWeight:700, color:T.text }}>Flag exception</div><div style={{ fontSize:12, color:T.text2, marginTop:1 }}>Item held for supervisor review</div></div>
      </div>
      <div style={{ padding:16, maxWidth:560, margin:"0 auto" }}>
        <div style={{ background:T.amberBg, border:`1px solid ${T.amberBr}`, borderRadius:12, padding:"12px 16px", marginBottom:18, fontSize:13, color:T.amberCol }}>
          <strong>{rmaId}</strong> will be removed from queue and flagged for reconciliation.
        </div>
        <SL mt={0}>Select reason</SL>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
          {REASONS.map(r => (
            <div key={r} onClick={()=>setReason(r)} style={{ padding:"12px", borderRadius:10, border:`2px solid ${reason===r?T.amberCol:T.border2}`, background:reason===r?T.amberBg:T.bg, cursor:"pointer", fontSize:13, fontWeight:reason===r?700:400, color:reason===r?T.amberCol:T.text, textAlign:"center" }}>{r}</div>
          ))}
        </div>
        <SL>Notes (optional)</SL>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Describe the issue…" rows={3} style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:`1px solid ${T.border2}`, background:T.bg, color:T.text, fontSize:13, resize:"none", outline:"none", boxSizing:"border-box", marginBottom:18 }}/>
        <SL>Photo (optional)</SL>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onPhoto} style={{ display:"none" }}/>
        {photo
          ? <div style={{ position:"relative", marginBottom:18 }}><img src={photo} alt="" style={{ width:"100%", borderRadius:10, maxHeight:200, objectFit:"cover" }}/><button onClick={()=>setPhoto(null)} style={{ position:"absolute", top:8, right:8, background:"rgba(0,0,0,0.65)", color:"#fff", border:"none", borderRadius:20, padding:"4px 12px", fontSize:12, cursor:"pointer" }}>Remove</button></div>
          : <Ghost onClick={()=>fileRef.current.click()} style={{ marginBottom:18 }}>📷 Take photo with iPad camera</Ghost>
        }
        <Btn onClick={()=>reason&&onSave({reason,notes,photo})} disabled={!reason} col={T.amberCol} style={{ marginBottom:10 }}>Flag exception &amp; hold item</Btn>
        <Ghost onClick={onClose}>Cancel — continue processing</Ghost>
      </div>
    </div>
  );
}

// ── QR LOGIN ───────────────────────────────────────────────
function QRLogin({ onLogin }) {
  const [scanning, setScanning] = useState(false);
  const [done,     setDone]     = useState(false);
  const [pct,      setPct]      = useState(0);
  const tmr = useRef();
  const scan = id => {
    setScanning(true); setPct(0);
    let p=0; tmr.current=setInterval(()=>{ p+=1.8; setPct(p); if(p>=100) clearInterval(tmr.current); }, 20);
    setTimeout(()=>{ setScanning(false); setDone(true); setTimeout(()=>onLogin(USERS[id]), 500); }, 2200);
  };
  return (
    <div style={{ minHeight:"100vh", background:T.bg3, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:28 }}>
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <div style={{ width:56, height:56, borderRadius:16, background:T.text, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:24 }}>📦</div>
        <div style={{ fontSize:30, fontWeight:800, letterSpacing:"-0.5px", marginBottom:6, color:T.text }}>ReturnBob</div>
        <div style={{ fontSize:14, color:T.text2 }}>Warehouse Returns Platform</div>
      </div>
      <Card style={{ width:"100%", maxWidth:340, padding:"28px 24px", marginBottom:0 }}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ fontSize:15, fontWeight:700, marginBottom:4, color:T.text }}>Scan your badge</div>
          <div style={{ fontSize:13, color:T.text2 }}>Hold QR code up to camera</div>
        </div>
        <div style={{ width:"100%", aspectRatio:"1", borderRadius:14, border:`2px dashed ${T.border2}`, background:T.bg2, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", marginBottom:20 }}>
          {[["0%","0%"],["100%","0%"],["0%","100%"],["100%","100%"]].map(([l,t],i) => (
            <div key={i} style={{ position:"absolute", left:l==="100%"?undefined:12, right:l==="100%"?12:undefined, top:t==="100%"?undefined:12, bottom:t==="100%"?12:undefined, width:22, height:22, borderTop:t==="100%"?"none":`3px solid ${T.text}`, borderBottom:t==="100%"?`3px solid ${T.text}`:"none", borderLeft:l==="100%"?"none":`3px solid ${T.text}`, borderRight:l==="100%"?`3px solid ${T.text}`:"none", borderRadius:3 }}/>
          ))}
          {!scanning&&!done&&<div style={{ textAlign:"center" }}><div style={{ fontSize:48, color:T.text3, marginBottom:8, lineHeight:1 }}>▣</div><div style={{ fontSize:12, color:T.text3 }}>Position badge here</div></div>}
          {scanning&&<div style={{ position:"absolute", inset:0 }}><div style={{ position:"absolute", left:0, right:0, height:2, background:T.blueCol, top:`${pct}%` }}/><div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ background:T.blueBg, borderRadius:20, padding:"7px 18px", fontSize:13, color:T.blueCol, fontWeight:700 }}>Scanning…</div></div></div>}
          {done&&<div style={{ textAlign:"center" }}><div style={{ width:54, height:54, borderRadius:"50%", background:T.greenBg, border:`2px solid ${T.greenCol}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 10px", color:T.greenCol }}>✓</div><div style={{ fontSize:14, fontWeight:700, color:T.greenCol }}>Authenticated</div></div>}
        </div>
        <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:16 }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.text3, textAlign:"center", marginBottom:12, textTransform:"uppercase", letterSpacing:"0.07em" }}>Demo — tap to simulate</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
            {[["QR-A01","Marcus R.","Associate"],["QR-A02","Priya S.","Associate"]].map(([id,name,role]) => (
              <button key={id} onClick={()=>scan(id)} disabled={scanning||done} style={{ padding:"12px 8px", borderRadius:10, border:`1px solid ${T.border2}`, background:T.bg2, cursor:"pointer", textAlign:"center", opacity:scanning||done?0.5:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{name}</div>
                <div style={{ fontSize:11, color:T.text2, marginTop:2 }}>{role}</div>
              </button>
            ))}
          </div>
          <button onClick={()=>scan("QR-S01")} disabled={scanning||done} style={{ width:"100%", padding:"12px", borderRadius:10, border:`1px solid ${T.blueBr}`, background:T.blueBg, cursor:"pointer", opacity:scanning||done?0.5:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.blueCol }}>Dana K. — Supervisor</div>
            <div style={{ fontSize:11, color:T.blueCol, opacity:0.7, marginTop:2 }}>Full analytics + reports</div>
          </button>
        </div>
      </Card>
    </div>
  );
}

// ── SHELL ──────────────────────────────────────────────────
function Shell({ user, mode, onMode, onLogout, onReset, children }) {
  const sup = user.role==="supervisor";
  return (
    <div style={{ minHeight:"100vh", background:T.bg3 }}>
      <div style={{ background:T.bg, borderBottom:`1px solid ${T.border}`, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Av ini={user.ini} sz={34} bg={sup?T.purpleBg:T.blueBg} col={sup?T.purpleCol:T.blueCol}/>
          <div>
            <div style={{ fontSize:14, fontWeight:700, lineHeight:1.2, color:T.text }}>{user.name}</div>
            <div style={{ fontSize:11, color:T.text2, marginTop:1 }}>{sup?"Supervisor":`Associate · ${user.mer?MERCHANTS[user.mer]?.name:"—"}`}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {!sup && (
            <div style={{ display:"flex", background:T.bg2, borderRadius:10, padding:3, border:`1px solid ${T.border}` }}>
              {["process","stats"].map(md => (
                <button key={md} onClick={()=>onMode(md)} style={{ padding:"6px 14px", borderRadius:8, border:"none", fontSize:12, fontWeight:mode===md?700:400, background:mode===md?T.bg:"transparent", color:mode===md?T.text:T.text2, cursor:"pointer", boxShadow:mode===md?"0 1px 4px rgba(0,0,0,0.15)":"none" }}>
                  {md==="process"?"⬡ Process":"◫ My stats"}
                </button>
              ))}
            </div>
          )}
          <button onClick={onReset} title="Reset entire shift" style={{ fontSize:11, fontWeight:700, color:T.amberCol, background:T.amberBg, border:`1px solid ${T.amberBr}`, borderRadius:8, padding:"6px 12px", cursor:"pointer" }}>↺ Reset shift</button>
          <button onClick={onLogout} title="Log out — queue stays active" style={{ fontSize:11, color:T.text2, background:"none", border:`1px solid ${T.border2}`, borderRadius:8, padding:"6px 10px", cursor:"pointer" }}>Out</button>
        </div>
      </div>
      <div style={{ padding:16, maxWidth:560, margin:"0 auto" }}>{children}</div>
    </div>
  );
}

// ── PROCESSING ─────────────────────────────────────────────
function MerchSelect({ rmas, onSelect, onUpload }) {
  const total = Object.keys(rmas).length;
  return (
    <>
      <div style={{ marginBottom:22, paddingTop:4 }}>
        <div style={{ fontSize:22, fontWeight:800, marginBottom:4, color:T.text }}>Good morning 👋</div>
        <div style={{ fontSize:14, color:T.text2 }}>Select a program to start processing returns</div>
      </div>
      {total>0 && (
        <div style={{ background:T.blueBg, border:`1px solid ${T.blueBr}`, borderRadius:10, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:T.blueCol, flexShrink:0 }}/>
          <div style={{ fontSize:13, color:T.blueCol }}><strong>{total}</strong> item{total!==1?"s":""} in shared queue — visible to all associates</div>
        </div>
      )}
      <SL mt={0}>Your programs</SL>
      {Object.entries(MERCHANTS).map(([id,m]) => {
        const ct = Object.values(rmas).filter(r=>r.mer===id).length;
        return (
          <Card key={id} onClick={()=>onSelect(id)} style={{ display:"flex", alignItems:"center", gap:16, border:`1.5px solid ${m.br}`, background:m.bg, cursor:"pointer", padding:"20px" }}>
            <div style={{ width:52, height:52, borderRadius:14, background:T.bg, border:`1.5px solid ${m.br}`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:14, color:m.col, flexShrink:0 }}>{id}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:17, fontWeight:800, color:m.dk, marginBottom:2 }}>{m.name}</div>
              <div style={{ fontSize:13, color:m.col, marginBottom:8 }}>{m.tagline}</div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:ct>0?m.col:T.border2 }}/>
                <div style={{ fontSize:12, color:m.col, fontWeight:600 }}>{ct} item{ct!==1?"s":""} in queue</div>
              </div>
            </div>
            <div style={{ fontSize:24, color:m.col, opacity:0.5 }}>›</div>
          </Card>
        );
      })}
      <Ghost onClick={onUpload} style={{ marginTop:4 }}>↑ Upload RMA file (CSV / Excel)</Ghost>
    </>
  );
}

function ScanScreen({ mer, rmas, onResult, onBack }) {
  const [inp, setInp] = useState("");
  const [err, setErr] = useState(null);
  const [scanning, setScanning] = useState(false);
  const m     = MERCHANTS[mer];
  const queue = Object.entries(rmas).filter(([,v])=>v.mer===mer);
  const lookup = val => {
    const rec = rmas[val.trim()];
    if (!rec) { setErr(`No RMA found for "${val.trim()}"`); return; }
    if (rec.mer!==mer) { setErr(`This item belongs to ${MERCHANTS[rec.mer]?.name} — wrong queue.`); return; }
    setErr(null); onResult(rec, val.trim());
  };
  const simScan = () => {
    setScanning(true);
    setTimeout(()=>{ setScanning(false); if(queue.length){ const k=queue[Math.floor(Math.random()*queue.length)][0]; onResult(rmas[k],k); } }, 1400);
  };
  return (
    <>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:T.text2, lineHeight:1 }}>‹</button>
        <Tag col={m.col} bg={m.bg} br={m.br}>{m.name}</Tag>
        <span style={{ fontSize:13, color:T.text2 }}>Scan next item</span>
      </div>
      <div onClick={simScan} style={{ background:scanning?T.text:T.bg2, border:`2px dashed ${scanning?T.blueCol:T.border2}`, borderRadius:18, padding:"48px 20px", textAlign:"center", cursor:"pointer", marginBottom:16 }}>
        {scanning
          ? <div><div style={{ fontSize:38, color:T.blueBr, marginBottom:8 }}>◎</div><div style={{ fontSize:14, color:T.blueBg, fontWeight:700 }}>Scanning…</div></div>
          : <div><div style={{ fontSize:50, color:T.text3, marginBottom:10, lineHeight:1 }}>▣</div><div style={{ fontSize:15, color:T.text2, fontWeight:600 }}>Tap to scan item barcode</div><div style={{ fontSize:12, color:T.text3, marginTop:4 }}>iPhone / iPad camera</div></div>}
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:10 }}>
        <input value={inp} onChange={e=>{setInp(e.target.value);setErr(null);}} onKeyDown={e=>e.key==="Enter"&&lookup(inp)} placeholder="Or type RMA ID…" style={{ flex:1, padding:"13px 14px", fontSize:14, borderRadius:10, border:`1px solid ${T.border2}`, background:T.bg, color:T.text, outline:"none" }}/>
        <button onClick={()=>lookup(inp)} style={{ padding:"13px 18px", background:T.text, color:T.bg, border:"none", borderRadius:10, fontSize:15, cursor:"pointer", fontWeight:700 }}>→</button>
      </div>
      {err && <div style={{ background:T.redBg, border:`1px solid ${T.redBr}`, borderRadius:10, padding:"10px 14px", fontSize:13, color:T.redCol, marginBottom:10 }}>{err}</div>}
      {queue.length===0 && <div style={{ background:T.amberBg, border:`1px solid ${T.amberBr}`, borderRadius:10, padding:"10px 14px", fontSize:13, color:T.amberCol, marginBottom:10 }}>Queue empty — supervisor can load an RMA file for this shift</div>}
      <Card style={{ background:T.bg2, marginTop:8 }}>
        <SL mt={0}>{m.name} — queue ({queue.length})</SL>
        {queue.map(([k,v]) => (
          <div key={k} onClick={()=>lookup(k)} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`0.5px solid ${T.border}`, cursor:"pointer" }}>
            <div style={{ fontSize:22, lineHeight:1 }}>{v.img}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{v.name}</div>
              <div style={{ fontSize:11, color:T.text2, marginTop:2 }}>{v.var!=="—"?`${v.var} · `:""}{v.reason}</div>
              <div style={{ fontSize:10, color:T.text3, marginTop:1, fontFamily:"monospace" }}>{k}{v.orderN?` · ${v.orderN}`:""}</div>
            </div>
            {v.prev && <span style={{ fontSize:10, background:T.amberBg, color:T.amberCol, border:`1px solid ${T.amberBr}`, borderRadius:10, padding:"2px 8px", flexShrink:0, fontWeight:700 }}>Prev</span>}
          </div>
        ))}
      </Card>
    </>
  );
}

function CondScreen({ rec, rmaId, onSel, onExc }) {
  return (
    <>
      <StepBar steps={["Condition","VAS","Transfer"]} cur={0}/>
      <ItemCard r={rec}/>
      <ExcFlag onClick={onExc}/>
      {CONDITIONS.map(c => (
        <Card key={c.id} onClick={()=>onSel(c)} style={{ cursor:"pointer", padding:"16px 18px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:54, height:54, borderRadius:14, background:c.bg, border:`2px solid ${c.br}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <div style={{ fontSize:20, fontWeight:800, color:c.col }}>{c.grade}</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:3 }}>{c.label}</div>
              <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:5 }}>{c.detail}</div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:c.bg, border:`1px solid ${c.br}`, borderRadius:20, padding:"3px 10px" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:c.col }}/>
                <span style={{ fontSize:11, fontWeight:700, color:c.col }}>{c.route==="direct_restock"?"Direct to restock":c.route==="vas"?"Send to VAS":c.route==="donate"?"Donate":"Dispose"}</span>
              </div>
            </div>
            <div style={{ fontSize:20, color:"var(--color-text-tertiary)" }}>›</div>
          </div>
          <div style={{ marginTop:12 }}>
            <InstrPanel title={`Grade ${c.grade} instructions`} steps={c.steps} note={c.note} col={c.col} bg={c.bg} br={c.br}/>
          </div>
        </Card>
      ))}
    </>
  );
}

function VASSelScreen({ rec, cond, onConfirm }) {
  const [sel, setSel] = useState({ inspect:true });
  const count  = Object.values(sel).filter(Boolean).length;
  const toggle = id => { if (id==="inspect") return; setSel(p=>({...p,[id]:!p[id]})); };
  return (
    <>
      <StepBar steps={["Condition","VAS","Transfer"]} cur={1}/>
      <ItemCard r={rec}/>
      <div style={{ background:cond.bg, border:`1px solid ${cond.br}`, borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
        <div style={{ fontSize:12, fontWeight:700, color:cond.col, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:2 }}>Grade {cond.grade} — select VAS steps</div>
        <div style={{ fontSize:13, color:cond.col }}>Quality inspect is always required</div>
      </div>
      {VAS_STEPS.map(step => {
        const on = !!sel[step.id];
        return (
          <Card key={step.id} style={{ padding:"14px 16px", border:`1.5px solid ${on?(step.bt?"#85B7EB":"#5DCAA5"):"var(--color-border-tertiary)"}`, background:on?(step.bt?"#EBF3FD":"#E6F5EE"):"var(--color-background-primary)" }}>
            <div onClick={()=>toggle(step.id)} style={{ display:"flex", alignItems:"center", gap:14, cursor:step.mandatory?"default":"pointer", marginBottom:on?12:0 }}>
              <div style={{ width:30, height:30, borderRadius:9, background:on?(step.bt?"#185FA5":"#0A6E4A"):"var(--color-background-secondary)", border:`1.5px solid ${on?"transparent":"var(--color-border-secondary)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:on?"#fff":"var(--color-text-secondary)", fontSize:14, fontWeight:700 }}>
                {on?"✓":step.icon}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                  <span style={{ fontSize:14, fontWeight:700 }}>{step.label}</span>
                  {step.bt && <span style={{ fontSize:10, fontWeight:700, background:"#185FA5", color:"#fff", padding:"2px 8px", borderRadius:20 }}>Bartender</span>}
                  {step.mandatory && <span style={{ fontSize:10, fontWeight:700, background:"#FEF2F2", color:"#991B1B", border:"1px solid #F09595", padding:"2px 8px", borderRadius:20 }}>Required</span>}
                </div>
                <div style={{ fontSize:12, color:"var(--color-text-secondary)" }}>{step.detail}</div>
              </div>
            </div>
            {on && <InstrPanel title={`${step.label} — how to`} steps={step.steps} col={step.bt?"#185FA5":"#0A6E4A"} bg={step.bt?"#EBF3FD":"#E6F5EE"} br={step.bt?"#85B7EB":"#5DCAA5"}/>}
          </Card>
        );
      })}
      <Btn onClick={()=>count>0&&onConfirm(VAS_STEPS.filter(s=>sel[s.id]))} disabled={count===0} style={{ marginTop:4, padding:17, fontSize:16 }}>
        Start VAS — {count} step{count!==1?"s":""} selected →
      </Btn>
    </>
  );
}

function VASWorkScreen({ rec, cond, steps, onDone }) {
  const [idx,  setIdx]  = useState(0);
  const [btP,  setBtP]  = useState(false);
  const [btS,  setBtS]  = useState(false);
  const [btSc, setBtSc] = useState(false);
  const [photo,setPhoto]= useState(null);
  const fileRef = useRef();
  const cur    = steps[idx];
  const isLast = idx===steps.length-1;
  const canGo  = cur?.bt ? (btP&&btS) : true;
  const next   = () => { if(isLast){ onDone(); return; } setBtP(false); setBtS(false); setBtSc(false); setPhoto(null); setIdx(i=>i+1); };
  const onPhoto = e => { const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>setPhoto(ev.target.result); r.readAsDataURL(f); };
  if (!cur) return null;
  return (
    <>
      <StepBar steps={["Condition","VAS","Transfer"]} cur={1}/>
      <ItemCard r={rec}/>
      <div style={{ display:"flex", gap:4, marginBottom:18 }}>
        {steps.map((_,i)=><div key={i} style={{ flex:1, height:4, borderRadius:3, background:i<idx?"#0A6E4A":i===idx?"#111":"var(--color-background-secondary)" }}/>)}
      </div>
      <Card style={{ background:cur.bt?"#EBF3FD":cond.bg, border:`1.5px solid ${cur.bt?"#85B7EB":cond.br}`, marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
          <div style={{ fontSize:22, color:cur.bt?"#185FA5":cond.col, lineHeight:1 }}>{cur.icon}</div>
          <div>
            <div style={{ fontSize:16, fontWeight:700, color:cur.bt?"#0C447C":cond.col }}>{cur.label}</div>
            {cur.bt && <span style={{ fontSize:10, fontWeight:700, background:"#185FA5", color:"#fff", padding:"2px 8px", borderRadius:20 }}>Bartender print required</span>}
          </div>
        </div>
        <div style={{ fontSize:13, color:cur.bt?"#185FA5":cond.col, opacity:0.9 }}>{cur.detail}</div>
      </Card>
      <InstrPanel title={`${cur.label} — instructions`} steps={cur.steps} col={cur.bt?"#185FA5":cond.col} bg={cur.bt?"#EBF3FD":cond.bg} br={cur.bt?"#85B7EB":cond.br}/>
      {cur.bt ? (
        <>
          <Card style={{ background:btP?"#E6F5EE":"var(--color-background-primary)", border:`1px solid ${btP?"#5DCAA5":"var(--color-border-tertiary)"}`, marginBottom:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:btP?0:12 }}>
              <div><div style={{ fontSize:14, fontWeight:700 }}>1. Print label</div><div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>Send to Bartender printer</div></div>
              {btP && <div style={{ fontSize:18, color:"#0A6E4A" }}>✓</div>}
            </div>
            {!btP && <Btn onClick={()=>setTimeout(()=>setBtP(true),900)} col="#185FA5" style={{ padding:"11px", fontSize:13 }}>▣ Send to Bartender printer</Btn>}
          </Card>
          <Card style={{ background:btS?"#E6F5EE":btP?"var(--color-background-primary)":"var(--color-background-secondary)", border:`1px solid ${btS?"#5DCAA5":"var(--color-border-tertiary)"}`, marginBottom:14, opacity:btP?1:0.5 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:btS?0:12 }}>
              <div><div style={{ fontSize:14, fontWeight:700 }}>2. Apply &amp; scan to verify</div><div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>Affix label then scan</div></div>
              {btS && <div style={{ fontSize:18, color:"#0A6E4A" }}>✓</div>}
            </div>
            {!btS && btP && <div onClick={()=>{setBtSc(true);setTimeout(()=>{setBtSc(false);setBtS(true);},1200);}} style={{ background:btSc?"#111":"var(--color-background-secondary)", border:"2px dashed var(--color-border-secondary)", borderRadius:10, padding:"16px", textAlign:"center", cursor:"pointer" }}>
              {btSc ? <div style={{ fontSize:13, color:"#aaa" }}>◎ Scanning…</div> : <div><div style={{ fontSize:26, color:"var(--color-text-secondary)", marginBottom:6 }}>▣</div><div style={{ fontSize:13, color:"var(--color-text-secondary)" }}>Tap to scan new barcode</div></div>}
            </div>}
          </Card>
        </>
      ) : (
        <Card style={{ background:"var(--color-background-secondary)", marginBottom:14, textAlign:"center" }}>
          <div style={{ fontSize:14, color:"var(--color-text-secondary)" }}>Complete this step, then tap confirm</div>
          <div style={{ fontSize:12, color:"var(--color-text-tertiary)", marginTop:4 }}>Step {idx+1} of {steps.length}</div>
        </Card>
      )}
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onPhoto} style={{ display:"none" }}/>
      {photo
        ? <div style={{ position:"relative", marginBottom:14 }}><img src={photo} alt="" style={{ width:"100%", borderRadius:12, maxHeight:180, objectFit:"cover" }}/><button onClick={()=>setPhoto(null)} style={{ position:"absolute", top:8, right:8, background:"rgba(0,0,0,0.65)", color:"#fff", border:"none", borderRadius:20, padding:"4px 12px", fontSize:12, cursor:"pointer" }}>Retake</button></div>
        : <Ghost onClick={()=>fileRef.current.click()} style={{ marginBottom:14, fontSize:13 }}>📷 Take step photo (optional)</Ghost>
      }
      <Btn onClick={next} disabled={!canGo} col={isLast?"#0A6E4A":"#111"} style={{ padding:17, fontSize:16 }}>
        {isLast ? "✓ All steps done — choose outcome →" : "Confirm & continue →"}
      </Btn>
    </>
  );
}

function VASOutScreen({ rec, onOutcome, onExc }) {
  return (
    <>
      <StepBar steps={["Condition","VAS","Transfer"]} cur={1}/>
      <ItemCard r={rec}/>
      <Card style={{ background:"#E6F5EE", border:"1px solid #5DCAA5", marginBottom:14 }}>
        <div style={{ fontSize:14, fontWeight:700, color:"#0A6E4A" }}>✓ VAS complete — choose final disposition</div>
      </Card>
      <ExcFlag onClick={onExc}/>
      {VAS_OUTCOMES.map(o => (
        <div key={o.id} onClick={()=>onOutcome(o.id)} style={{ background:o.bg, border:`1.5px solid ${o.col}33`, borderRadius:14, padding:"18px", marginBottom:12, cursor:"pointer", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:17, fontWeight:700, color:o.col, marginBottom:4 }}>{o.label}</div>
            <div style={{ fontSize:13, color:o.col, opacity:0.8 }}>{o.detail}</div>
          </div>
          <div style={{ fontSize:22, color:o.col, opacity:0.4 }}>›</div>
        </div>
      ))}
    </>
  );
}

function TransferScreen({ rec, disp, onComplete, onSwitch }) {
  const [scanned,   setScanned]   = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const g = GAYLORDS[disp];
  if (confirmed) return (
    <>
      <div style={{ textAlign:"center", padding:"40px 16px 28px" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:T.greenBg, border:`2.5px solid ${T.greenCol}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, margin:"0 auto 18px", color:T.greenCol }}>✓</div>
        <div style={{ fontSize:24, fontWeight:800, marginBottom:6, color:T.text }}>Item processed</div>
        <div style={{ fontSize:14, color:T.text2, marginBottom:4 }}>{rec.name}</div>
        <div style={{ fontSize:13, color:T.text3 }}>Placed in {g.gid}</div>
      </div>
      <Card style={{ background:T.bg2, marginBottom:16 }}>
        {[["Product",rec.name],["SKU",rec.sku],["Disposition",g.label],["Gaylord",g.gid],["Location",g.loc],["Time",new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})]].map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`0.5px solid ${T.border}`, fontSize:13 }}>
            <span style={{ color:T.text2 }}>{k}</span>
            <span style={{ fontWeight:700, color:T.text }}>{v}</span>
          </div>
        ))}
      </Card>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <Btn onClick={onComplete} col={T.text} style={{ fontSize:15, padding:15 }}>Next item →</Btn>
        <Ghost onClick={onSwitch} style={{ fontSize:15, padding:15 }}>Switch program</Ghost>
      </div>
    </>
  );
  return (
    <>
      <StepBar steps={["Condition","VAS","Transfer"]} cur={2}/>
      <ItemCard r={rec}/>
      <Card style={{ background:g.bg, border:`1.5px solid ${g.col}44`, marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:700, color:g.col, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Route to Gaylord</div>
        <div style={{ fontSize:22, fontWeight:800, color:g.col, marginBottom:2 }}>{g.gid}</div>
        <div style={{ fontSize:13, color:g.col, opacity:0.7, marginBottom:14 }}>{g.loc}</div>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:g.col, marginBottom:6 }}><span style={{ fontWeight:600 }}>Fill level</span><span style={{ fontWeight:700 }}>{g.used}/{g.cap}</span></div>
        <div style={{ background:"rgba(0,0,0,0.08)", borderRadius:6, height:8 }}><div style={{ width:`${Math.round((g.used/g.cap)*100)}%`, height:8, borderRadius:6, background:g.col }}/></div>
      </Card>
      <div onClick={()=>!scanned&&setTimeout(()=>setScanned(true),1000)} style={{ background:scanned?T.greenBg:T.bg2, border:`2px dashed ${scanned?T.greenCol:T.border2}`, borderRadius:16, padding:"32px 20px", textAlign:"center", cursor:scanned?"default":"pointer", marginBottom:16 }}>
        {scanned
          ? <div><div style={{ fontSize:28, color:T.greenCol, marginBottom:6 }}>✓</div><div style={{ fontSize:15, fontWeight:700, color:T.greenCol }}>Gaylord scanned</div><div style={{ fontSize:12, color:T.greenCol, marginTop:2, opacity:0.7 }}>{g.gid}</div></div>
          : <div><div style={{ fontSize:40, color:T.text3, marginBottom:8, lineHeight:1 }}>▣</div><div style={{ fontSize:14, color:T.text2, fontWeight:600 }}>Tap to scan Gaylord barcode</div></div>}
      </div>
      <Btn onClick={()=>setConfirmed(true)} disabled={!scanned} col={T.greenCol} style={{ padding:17, fontSize:16 }}>✓ Confirm transfer</Btn>
    </>
  );
}

function ProcFlow({ user, rmas, onDone, onUpload }) {
  const [step,    setStep]    = useState("merchant");
  const [mer,     setMer]     = useState(null);
  const [rec,     setRec]     = useState(null);
  const [rmaId,   setRmaId]   = useState(null);
  const [cond,    setCond]    = useState(null);
  const [vs,      setVs]      = useState([]);
  const [disp,    setDisp]    = useState(null);
  const [showExc, setShowExc] = useState(false);
  const [showUp,  setShowUp]  = useState(false);

  const toScan = () => { setRec(null);setRmaId(null);setCond(null);setVs([]);setDisp(null);setStep("scan"); };
  const toMer  = () => { setMer(null);setRec(null);setRmaId(null);setCond(null);setVs([]);setDisp(null);setStep("merchant"); };

  const onCond = c => {
    setCond(c);
    if      (c.route==="direct_restock") { setDisp("restock"); setStep("transfer"); }
    else if (c.route==="vas")            { setStep("vas_sel"); }
    else if (c.route==="donate")         { setDisp("donate");  setStep("transfer"); }
    else                                 { setDisp("dispose"); setStep("transfer"); }
  };

  const onExcSave = data => { onDone(null,rmaId,data,cond?.grade,null); setShowExc(false); toScan(); };
  const handleComplete = d => { onDone(d,rmaId,null,cond?.grade,vs.map(s=>s.id)); toScan(); };
  const handleSwitch   = d => { onDone(d,rmaId,null,cond?.grade,vs.map(s=>s.id)); toMer(); };

  if (showUp)  return <UploadScreen rmas={rmas} onUpload={(r, newMerIds)=>{onUpload(r, newMerIds||[]);setShowUp(false);}} onBack={()=>setShowUp(false)}/>;
  if (showExc) return <ExcScreen rmaId={rmaId} onSave={onExcSave} onClose={()=>setShowExc(false)}/>;

  return (
    <>
      {step==="merchant" && <MerchSelect rmas={rmas} onSelect={id=>{setMer(id);setStep("scan");}} onUpload={()=>setShowUp(true)}/>}
      {step==="scan"     && <ScanScreen mer={mer} rmas={rmas} onResult={(r,id)=>{setRec(r);setRmaId(id);setStep("cond");}} onBack={toMer}/>}
      {step==="cond"     && rec && <CondScreen rec={rec} rmaId={rmaId} onSel={onCond} onExc={()=>setShowExc(true)}/>}
      {step==="vas_sel"  && rec && <VASSelScreen rec={rec} cond={cond} onConfirm={s=>{setVs(s);setStep("vas_work");}}/>}
      {step==="vas_work" && rec && <VASWorkScreen rec={rec} cond={cond} steps={vs} onDone={()=>setStep("vas_out")}/>}
      {step==="vas_out"  && rec && <VASOutScreen rec={rec} onOutcome={d=>{setDisp(d);setStep("transfer");}} onExc={()=>setShowExc(true)}/>}
      {step==="transfer" && rec && disp && <TransferScreen rec={rec} disp={disp} onComplete={()=>handleComplete(disp)} onSwitch={()=>handleSwitch(disp)}/>}
    </>
  );
}

// ── ASSOCIATE STATS ────────────────────────────────────────
function AssocDash({ stats }) {
  const total    = stats.n||0;
  const rs       = stats.rs||0, dn=stats.dn||0, dp=stats.dp||0, exc=stats.exc||0, vas=stats.vas||0, vasUnits=stats.vasUnits||0;
  const maxH     = Math.max(...stats.hourly,1);
  const pctOf    = v => total>0?Math.round((v/total)*100):0;
  return (
    <>
      <SL mt={8}>Today's summary</SL>
      <Card>
        <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:18 }}>
          <div style={{ fontSize:56, fontWeight:800, lineHeight:1 }}>{total}</div>
          <div style={{ fontSize:15, color:"var(--color-text-secondary)" }}>items processed</div>
        </div>
        {total>0 && (
          <div style={{ display:"flex", borderRadius:8, overflow:"hidden", height:12, marginBottom:16 }}>
            <div style={{ flex:rs, background:"#0A6E4A" }}/><div style={{ flex:dn, background:"#92570A" }}/><div style={{ flex:dp, background:"#991B1B" }}/><div style={{ flex:exc, background:"#6B7280" }}/>
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            { label:"Restocked",  val:rs,  col:"#0A6E4A", bg:"#E6F5EE", br:"#5DCAA5", desc:"Back in sellable stock" },
            { label:"Donated",    val:dn,  col:"#92570A", bg:"#FDF3E3", br:"#EF9F27", desc:"Sent to donation" },
            { label:"Disposed",   val:dp,  col:"#991B1B", bg:"#FEF2F2", br:"#F09595", desc:"Scrapped or destroyed" },
            { label:"Exceptions", val:exc, col:"#4B5563", bg:"#F3F4F6", br:"#D1D5DB", desc:"Flagged for review" },
          ].map(({ label,val,col,bg,br,desc }) => (
            <div key={label} style={{ background:bg, border:`1px solid ${br}`, borderRadius:12, padding:"12px 14px" }}>
              <div style={{ fontSize:26, fontWeight:800, color:col, marginBottom:2 }}>{val}</div>
              <div style={{ fontSize:13, fontWeight:700, color:col }}>{label}</div>
              <div style={{ fontSize:11, color:col, opacity:0.7, marginTop:2 }}>{pctOf(val)}% · {desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <SL>VAS work performed</SL>
      <Card>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div style={{ textAlign:"center", background:T.blueBg, borderRadius:12, padding:"14px 10px" }}>
            <div style={{ fontSize:32, fontWeight:800, color:T.blueCol }}>{vasUnits}</div>
            <div style={{ fontSize:13, fontWeight:700, color:T.blueCol, marginTop:2 }}>Items through VAS</div>
            <div style={{ fontSize:11, color:T.blueCol, opacity:0.7, marginTop:2 }}>needed prep work</div>
          </div>
          <div style={{ textAlign:"center", background:T.purpleBg, borderRadius:12, padding:"14px 10px" }}>
            <div style={{ fontSize:32, fontWeight:800, color:T.purpleCol }}>{vas}</div>
            <div style={{ fontSize:13, fontWeight:700, color:T.purpleCol, marginTop:2 }}>VAS actions done</div>
            <div style={{ fontSize:11, color:T.purpleCol, opacity:0.7, marginTop:2 }}>rebag, retag, etc.</div>
          </div>
        </div>
      </Card>

      <SL>Item conditions</SL>
      <Card>
        <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:14 }}>How items arrived from customers</div>
        {[
          { grade:"A", label:"Like new",       sub:"Tags on, never worn",      col:GC.A, bg:GB.A },
          { grade:"B", label:"Good condition",  sub:"Minor issues, needed VAS", col:GC.B, bg:GB.B },
          { grade:"C", label:"Visible wear",    sub:"Pilling, fading, snags",   col:GC.C, bg:GB.C },
          { grade:"D", label:"Damaged",         sub:"Stains, tears, unusable",  col:GC.D, bg:GB.D },
        ].map(({ grade,label,sub,col,bg }) => {
          const n=stats.gr[grade]||0, pct=pctOf(n);
          return (
            <div key={grade} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ width:36, height:36, borderRadius:9, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:14, color:col, flexShrink:0 }}>{grade}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <div><span style={{ fontSize:13, fontWeight:700 }}>{label}</span><span style={{ fontSize:11, color:"var(--color-text-tertiary)", marginLeft:8 }}>{sub}</span></div>
                  <span style={{ fontSize:13, fontWeight:700, color:col }}>{n}</span>
                </div>
                <MiniBar val={n} max={total||1} col={col} h={6}/>
              </div>
            </div>
          );
        })}
      </Card>

      <SL>Items by hour</SL>
      <Card>
        <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:80 }}>
          {stats.hourly.map((v,i) => {
            const h=Math.round((v/maxH)*68), isMax=v>0&&v===Math.max(...stats.hourly);
            return <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
              {v>0&&<div style={{ fontSize:9, fontWeight:700, color:"var(--color-text-tertiary)" }}>{v}</div>}
              <div style={{ width:"100%", height:h||0, background:isMax?"#0A6E4A":"#185FA5", borderRadius:"4px 4px 0 0", opacity:v>0?0.85:0 }}/>
            </div>;
          })}
        </div>
        <div style={{ display:"flex", gap:5, marginTop:8 }}>
          {stats.hours.map((h,i) => <div key={i} style={{ flex:1, fontSize:9, fontWeight:700, color:"var(--color-text-tertiary)", textAlign:"center" }}>{h}</div>)}
        </div>
      </Card>
    </>
  );
}

// ── SUPERVISOR DASHBOARD ───────────────────────────────────
function SupDash({ shift, log, excs, rmas, onUpload }) {
  const [tab, setTab] = useState("overview");
  const maxH    = Math.max(...shift.hourly, 1);
  const totPct  = shift.tgt > 0 ? Math.round((shift.total / shift.tgt) * 100) : 0;

  const genDisp = () => dlCSV(`returnbob_disposition_${new Date().toISOString().slice(0,10)}.csv`, log.map(e=>({ timestamp:e.ts, rma_id:e.rmaId, merchant:MERCHANTS[e.mer]?.name||e.mer, product:e.name, sku:e.sku, return_reason:e.reason, grade:e.grade||"—", disposition:e.disp||"exception", gaylord:e.disp?GAYLORDS[e.disp]?.gid:"—", associate:e.assoc })));
  const genVAS  = () => { const rows=[]; log.filter(e=>e.vs?.length).forEach(e=>e.vs.forEach(s=>rows.push({timestamp:e.ts,rma_id:e.rmaId,merchant:MERCHANTS[e.mer]?.name,product:e.name,sku:e.sku,vas_step:s,associate:e.assoc,final_outcome:e.disp}))); if(!rows.length){alert("No VAS actions yet.");return;} dlCSV(`returnbob_vas_${new Date().toISOString().slice(0,10)}.csv`,rows); };
  const genExc  = () => { if(!excs.length){alert("No exceptions yet.");return;} dlCSV(`returnbob_exceptions_${new Date().toISOString().slice(0,10)}.csv`, excs.map(e=>({timestamp:e.ts,rma_id:e.rmaId,merchant:MERCHANTS[e.mer]?.name||e.mer,product:e.name,sku:e.sku,reason:e.reason,notes:e.notes||"—",photo_attached:e.photo?"Yes":"No",associate:e.assoc,status:"Pending review"}))); };

  // ── Derive live per-associate stats from the log ──
  const liveAssocs = shift.assocs.map(a => {
    const myLog = log.filter(e => e.assoc === a.name);
    const myExcs = excs.filter(e => e.assoc === a.name);
    const gr = { A:0, B:0, C:0, D:0 };
    let vasTotal = 0;
    myLog.forEach(e => {
      if (e.grade) gr[e.grade] = (gr[e.grade]||0) + 1;
      vasTotal += (e.vs?.length || 0);
    });
    return {
      ...a,
      n:   myLog.length + myExcs.length,
      gr,
      vas: vasTotal,
    };
  });

  // ── Derive live per-merchant stats from the log ──
  const liveMers = shift.mers.map(m => {
    const merLog = log.filter(e => e.mer === m.id);
    const merExcs = excs.filter(e => e.mer === m.id);
    return {
      ...m,
      n:  merLog.length + merExcs.length,
      rs: merLog.filter(e => e.disp === "restock").length,
      dn: merLog.filter(e => e.disp === "donate").length,
      dp: merLog.filter(e => e.disp === "dispose").length,
    };
  });

  return (
    <>
      <div style={{ display:"flex", gap:6, marginBottom:20, background:"var(--color-background-secondary)", borderRadius:12, padding:4, border:"1px solid var(--color-border-tertiary)" }}>
        {["overview","associates","merchants","reports"].map(t => (
          <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:"9px 4px", borderRadius:9, border:"none", fontSize:12, fontWeight:tab===t?700:400, background:tab===t?"var(--color-background-primary)":"transparent", color:tab===t?"var(--color-text-primary)":"var(--color-text-secondary)", cursor:"pointer", textTransform:"capitalize", boxShadow:tab===t?"0 1px 4px rgba(0,0,0,0.1)":"none" }}>{t}</button>
        ))}
      </div>

      {tab==="overview" && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:4 }}>
            {[
              ["Total processed", shift.total,          "var(--color-text-primary)"],
              ["Attainment",      `${totPct}%`,          totPct>=80?"#0A6E4A":"#92570A"],
              ["Associates",      liveAssocs.length,     "var(--color-text-primary)"],
              ["Exceptions",      excs.length,           "#4B5563"],
            ].map(([l,v,c]) => (
              <Card key={l} style={{ marginBottom:0 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"var(--color-text-secondary)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>{l}</div>
                <div style={{ fontSize:28, fontWeight:800, color:c }}>{v}</div>
              </Card>
            ))}
          </div>

          {/* Live disposition breakdown */}
          {shift.total > 0 && (
            <>
              <SL mt={18}>Shift disposition breakdown</SL>
              <Card>
                {(() => {
                  const rs = log.filter(e=>e.disp==="restock").length;
                  const dn = log.filter(e=>e.disp==="donate").length;
                  const dp = log.filter(e=>e.disp==="dispose").length;
                  const exc = excs.length;
                  const tot = shift.total;
                  return (
                    <>
                      <div style={{ display:"flex", borderRadius:8, overflow:"hidden", height:12, marginBottom:14 }}>
                        <div style={{ flex:rs, background:"#0A6E4A" }}/><div style={{ flex:dn, background:"#92570A" }}/><div style={{ flex:dp, background:"#991B1B" }}/><div style={{ flex:exc, background:"#6B7280" }}/>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
                        {[["Restock",rs,"#0A6E4A","#E6F5EE","#5DCAA5"],["Donate",dn,"#92570A","#FDF3E3","#EF9F27"],["Dispose",dp,"#991B1B","#FEF2F2","#F09595"],["Exception",exc,"#4B5563","#F3F4F6","#D1D5DB"]].map(([l,v,c,bg,br])=>(
                          <div key={l} style={{ background:bg, border:`1px solid ${br}`, borderRadius:10, padding:"10px 6px", textAlign:"center" }}>
                            <div style={{ fontSize:20, fontWeight:800, color:c }}>{v}</div>
                            <div style={{ fontSize:10, fontWeight:700, color:c, marginTop:2 }}>{l}</div>
                            <div style={{ fontSize:9, color:c, opacity:0.7, marginTop:1 }}>{tot>0?Math.round((v/tot)*100):0}%</div>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </Card>
            </>
          )}

          <SL mt={shift.total>0?4:18}>Shared RMA queue</SL>
          <Card style={{ border:`1px solid ${T.blueBr}`, background:T.blueBg }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:T.blueCol }}>Shift queue</div>
                <div style={{ fontSize:12, color:T.blueCol, opacity:0.8, marginTop:2 }}>Visible to all associates</div>
              </div>
              <div style={{ fontSize:28, fontWeight:800, color:T.blueCol }}>{Object.keys(rmas).length}</div>
            </div>
            {Object.entries(MERCHANTS).map(([id,m]) => {
              const ct = Object.values(rmas).filter(r=>r.mer===id).length;
              return (
                <div key={id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderTop:`0.5px solid ${T.blueBr}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:ct>0?m.col:T.blueBr }}/>
                    <span style={{ fontSize:13, fontWeight:600, color:T.blueCol }}>{m.name}</span>
                  </div>
                  <span style={{ fontSize:13, fontWeight:700, color:T.blueCol }}>{ct} item{ct!==1?"s":""}</span>
                </div>
              );
            })}
            <button onClick={onUpload} style={{ marginTop:12, width:"100%", padding:"10px", borderRadius:10, border:`1px solid ${T.blueCol}`, background:T.bg, color:T.blueCol, fontSize:13, fontWeight:700, cursor:"pointer" }}>
              ↑ Load RMA file for today's shift
            </button>
          </Card>

          <SL mt={4}>Throughput by hour</SL>
          <Card>
            <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:100 }}>
              {shift.hourly.map((v,i) => { const h=Math.round((v/maxH)*86),isMax=v===Math.max(...shift.hourly)&&v>0; return <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}><div style={{ fontSize:9, fontWeight:700, color:"var(--color-text-tertiary)" }}>{v||""}</div><div style={{ width:"100%", height:h||0, background:isMax?"#0A6E4A":"#185FA5", borderRadius:"4px 4px 0 0", opacity:0.85 }}/></div>; })}
            </div>
            <div style={{ display:"flex", gap:4, marginTop:8 }}>{shift.hours.map((h,i) => <div key={i} style={{ flex:1, fontSize:9, fontWeight:700, color:"var(--color-text-tertiary)", textAlign:"center" }}>{h}</div>)}</div>
          </Card>

          {excs.length>0 && (
            <>
              <SL>Exceptions pending review</SL>
              {excs.map((e,i) => (
                <Card key={i} style={{ border:`1px solid ${T.amberBr}`, background:T.amberBg }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:T.amberCol }}>{e.rmaId}</div>
                      <div style={{ fontSize:12, color:T.amberCol, marginTop:2 }}>{e.name} · {e.reason}</div>
                      <div style={{ fontSize:11, color:T.amberCol, marginTop:2, opacity:0.7 }}>By {e.assoc} · {e.ts}</div>
                    </div>
                    {e.photo && <img src={e.photo} alt="" style={{ width:48, height:48, borderRadius:8, objectFit:"cover" }}/>}
                  </div>
                  {e.notes && <div style={{ marginTop:8, fontSize:12, color:T.amberCol, background:"rgba(255,255,255,0.1)", borderRadius:8, padding:"6px 10px" }}>{e.notes}</div>}
                </Card>
              ))}
            </>
          )}
        </>
      )}

      {tab==="associates" && (
        <>
          {liveAssocs.length === 0 && (
            <Card style={{ textAlign:"center", padding:"32px 20px" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>👋</div>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:6, color:T.text }}>No associates on shift yet</div>
              <div style={{ fontSize:13, color:T.text2 }}>Associates will appear here once they log in and process items.</div>
            </Card>
          )}
          {liveAssocs.map(a => {
            const p   = a.tgt > 0 ? Math.round((a.n / a.tgt) * 100) : 0;
            const tot = Object.values(a.gr).reduce((s,v)=>s+v, 0);
            const barCol = p>=80?T.greenCol:p>=50?T.amberCol:T.redCol;
            return (
              <Card key={a.id}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <Av ini={a.ini} sz={42}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:15, color:T.text }}>{a.name}</div>
                    <div style={{ fontSize:12, color:T.text2, marginTop:1 }}>{a.id} · {a.vas} VAS actions</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:24, fontWeight:800, color:barCol }}>{a.n}</div>
                    <div style={{ fontSize:11, color:T.text3 }}>of {a.tgt}</div>
                  </div>
                </div>
                <MiniBar val={a.n} max={a.tgt} col={barCol} h={8}/>
                <div style={{ display:"flex", gap:6, marginTop:12 }}>
                  {Object.entries(a.gr).map(([g,n]) => (
                    <div key={g} style={{ flex:1, background:GB[g], border:`1px solid ${GC[g]}44`, borderRadius:9, padding:"8px 4px", textAlign:"center" }}>
                      <div style={{ fontSize:12, fontWeight:800, color:GC[g] }}>{g}</div>
                      <div style={{ fontSize:16, fontWeight:700, color:GC[g] }}>{n}</div>
                      <div style={{ fontSize:9, fontWeight:700, color:GC[g], opacity:0.8 }}>{tot>0?Math.round((n/tot)*100):0}%</div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </>
      )}

      {tab==="merchants" && liveMers.map(mer => {
        const mc  = MERCHANTS[mer.id];
        const tot = mer.rs + mer.dn + mer.dp;
        return (
          <Card key={mer.id}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div><div style={{ fontSize:16, fontWeight:700 }}>{mer.name}</div><div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:1 }}>{mer.n} units today</div></div>
              <Tag col={mc.col} bg={mc.bg} br={mc.br}>{mer.id}</Tag>
            </div>
            {tot > 0
              ? <div style={{ display:"flex", borderRadius:8, overflow:"hidden", height:12, marginBottom:14 }}>
                  <div style={{ flex:mer.rs, background:"#0A6E4A" }}/><div style={{ flex:mer.dn, background:"#92570A" }}/><div style={{ flex:mer.dp, background:"#991B1B" }}/>
                </div>
              : <div style={{ height:12, background:"var(--color-background-tertiary)", borderRadius:8, marginBottom:14 }}/>
            }
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[["Restock",mer.rs,"#0A6E4A","#E6F5EE"],["Donate",mer.dn,"#92570A","#FDF3E3"],["Dispose",mer.dp,"#991B1B","#FEF2F2"]].map(([l,v,c,bg]) => (
                <div key={l} style={{ textAlign:"center", background:bg, borderRadius:10, padding:"10px 8px" }}>
                  <div style={{ fontSize:20, fontWeight:800, color:c }}>{v}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:c, marginTop:2 }}>{l}</div>
                  <div style={{ fontSize:10, color:c, opacity:0.7 }}>{tot>0?Math.round((v/tot)*100):0}%</div>
                </div>
              ))}
            </div>
            {mer.n === 0 && <div style={{ marginTop:10, fontSize:12, color:"var(--color-text-tertiary)", textAlign:"center" }}>No items processed for this merchant yet</div>}
          </Card>
        );
      })}

      {tab==="reports" && (
        <>
          <SL mt={8}>Download CSV reports</SL>
          {[
            { title:"Disposition report",      sub:`Every item processed · ${log.length} records`,                                     icon:"◫", col:"#185FA5", bg:"#EBF3FD", br:"#B5D4F4", fn:genDisp },
            { title:"VAS actions report",       sub:`Steps per item per associate · ${log.filter(e=>e.vs?.length).length} VAS events`, icon:"◈", col:"#0A6E4A", bg:"#E6F5EE", br:"#9FE1CB", fn:genVAS },
            { title:"Exception reconciliation", sub:`Flagged items · ${excs.length} exceptions`,                                       icon:"⚑", col:"#92570A", bg:"#FDF3E3", br:"#EF9F27", fn:genExc },
          ].map(r => (
            <Card key={r.title} onClick={r.fn} style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer", border:`1px solid ${r.br}`, background:r.bg, padding:"16px 18px" }}>
              <div style={{ width:44, height:44, borderRadius:12, background:"var(--color-background-primary)", border:`1px solid ${r.br}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:r.col, flexShrink:0 }}>{r.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:r.col }}>{r.title}</div>
                <div style={{ fontSize:12, color:r.col, opacity:0.7, marginTop:2 }}>{r.sub}</div>
              </div>
              <div style={{ fontSize:13, color:r.col, fontWeight:700 }}>↓ CSV</div>
            </Card>
          ))}
          <Card style={{ background:T.bg2, marginTop:8 }}>
            <SL mt={0}>Recent activity</SL>
            {log.length===0 && <div style={{ fontSize:12, color:T.text3 }}>No items processed yet this shift</div>}
            {log.slice(-8).reverse().map((e,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`0.5px solid ${T.border}`, fontSize:12 }}>
                <span style={{ color:T.text2, fontFamily:"monospace", fontSize:11 }}>{e.rmaId}</span>
                <Tag col={e.disp==="restock"?T.greenCol:e.disp==="donate"?T.amberCol:T.redCol} bg={e.disp==="restock"?T.greenBg:e.disp==="donate"?T.amberBg:T.redBg} br={e.disp==="restock"?T.greenBr:e.disp==="donate"?T.amberBr:T.redBr}>{e.disp||"exception"}</Tag>
                <span style={{ color:T.text3 }}>{e.assoc}</span>
              </div>
            ))}
          </Card>
        </>
      )}
    </>
  );
}

// ── SUP WRAPPER ────────────────────────────────────────────
function SupDashWrapper({ shift, log, excs, rmas, onUpload }) {
  const [showUp, setShowUp] = useState(false);
  if (showUp) return <UploadScreen rmas={rmas} onUpload={(r, newMerIds)=>{ onUpload(r, newMerIds||[]); setShowUp(false); }} onBack={()=>setShowUp(false)}/>;
  return <SupDash shift={shift} log={log} excs={excs} rmas={rmas} onUpload={()=>setShowUp(true)}/>;
}

// ── ROOT ───────────────────────────────────────────────────
export default function App() {
  const [rmas,  setRmas]  = useState({});
  const [user,  setUser]  = useState(null);
  const [mode,  setMode]  = useState("process");
  const [shift, setShift] = useState(makeEmptyShift());
  const [astats,setAstats]= useState(null);
  const [log,   setLog]   = useState([]);
  const [excs,  setExcs]  = useState([]);
  const [key,   setKey]   = useState(0);

  const login = u => {
    setUser(u);
    setMode(u.role==="supervisor" ? "dashboard" : "process");
    if (u.role === "associate") {
      // Add associate to shift's assocs list if not already there
      setShift(p => {
        if (p.assocs.find(a => a.id === u.id)) return p;
        return { ...p, assocs: [...p.assocs, makeAssocEntry(u)] };
      });
      setAstats({ ...INIT_ASTATS, hours: HOURS, hourly: new Array(HOURS.length).fill(0) });
    }
  };

  // Determine current hour bucket index (0–9 for 7a–4p)
  const hourBucket = () => {
    const h = new Date().getHours();
    const idx = h - 7; // 7am = index 0
    return Math.max(0, Math.min(HOURS.length - 1, idx));
  };

  const onDone = (disp, rmaId, excData, grade, vasIds) => {
    const r  = rmas[rmaId] || {};
    const ts = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
    const g  = grade || "A";
    const bucket = hourBucket();

    // Remove from queue
    setRmas(prev => { const next = {...prev}; delete next[rmaId]; return next; });

    if (excData) {
      setExcs(p => [...p, { ts, rmaId, mer:r.mer, name:r.name, sku:r.sku, reason:excData.reason, notes:excData.notes, photo:excData.photo, assoc:user?.name }]);
      // Update shift totals for exception
      setShift(p => {
        const n = { ...p, hourly:[...p.hourly] };
        n.total += 1;
        n.hourly[bucket] += 1;
        return n;
      });
      setAstats(p => { if(!p) return p; const h=[...p.hourly]; h[bucket]+=1; return {...p, n:p.n+1, exc:(p.exc||0)+1, hourly:h}; });
      return;
    }

    const hasVAS = vasIds && vasIds.length > 0;

    // Append to log
    setLog(p => [...p, { ts, rmaId, mer:r.mer, name:r.name, sku:r.sku, reason:r.reason, disp, grade:g, vs:vasIds||[], assoc:user?.name }]);

    // Update shared shift counters
    setShift(p => {
      const n = { ...p, hourly:[...p.hourly], mers:p.mers.map(m=>({...m})) };
      n.total += 1;
      n.hourly[bucket] += 1;
      const m = n.mers.find(m => m.id === r.mer);
      if (m) {
        m.n  += 1;
        if (disp==="restock") m.rs += 1;
        else if (disp==="donate")  m.dn += 1;
        else if (disp==="dispose") m.dp += 1;
      }
      return n;
    });

    // Update this associate's personal stats
    setAstats(p => {
      if (!p) return p;
      const gr = {...p.gr}; gr[g] = (gr[g]||0) + 1;
      const h  = [...p.hourly]; h[bucket] += 1;
      return { ...p, n:p.n+1, gr, hourly:h,
        vas:      (p.vas||0)      + (vasIds?.length||0),
        vasUnits: (p.vasUnits||0) + (hasVAS ? 1 : 0),
        rs:       (p.rs||0)       + (disp==="restock"  ? 1 : 0),
        dn:       (p.dn||0)       + (disp==="donate"   ? 1 : 0),
        dp:       (p.dp||0)       + (disp==="dispose"  ? 1 : 0),
      };
    });
  };

  // "Out" — log current user out but keep shared queue, shift data, log, excs intact
  const logout = () => {
    setUser(null); setMode("process"); setAstats(null); setKey(k=>k+1);
  };

  // "Reset" — wipe everything, start a brand new shift
  const resetAll = () => {
    setUser(null); setMode("process"); setRmas({});
    setShift(makeEmptyShift());
    setAstats(null); setLog([]); setExcs([]); setKey(k=>k+1);
  };

  if (!user) return <><GlobalStyles/><QRLogin key={key} onLogin={login}/></>;
  return (
    <>
      <GlobalStyles/>
      <Shell user={user} mode={mode} onMode={setMode} onLogout={logout} onReset={resetAll}>
        {user.role==="supervisor" && <SupDashWrapper shift={shift} log={log} excs={excs} rmas={rmas} onUpload={(r, newMerIds=[])=>{
        // Register any new dynamic merchants into shift.mers
        if (newMerIds.length) {
          setShift(p => {
            const existing = new Set(p.mers.map(m=>m.id));
            const extras = newMerIds.filter(id=>!existing.has(id)).map(id=>({ id, name:MERCHANTS[id]?.name||id, n:0, rs:0, dn:0, dp:0 }));
            return extras.length ? { ...p, mers:[...p.mers, ...extras] } : p;
          });
        }
        setRmas(p=>({...p,...r}));
      }}/>}
        {user.role==="associate"  && mode==="process" && <ProcFlow key={`f-${key}`} user={user} rmas={rmas} onDone={onDone} onUpload={(r, newMerIds=[])=>{
        if (newMerIds.length) {
          setShift(p => {
            const existing = new Set(p.mers.map(m=>m.id));
            const extras = newMerIds.filter(id=>!existing.has(id)).map(id=>({ id, name:MERCHANTS[id]?.name||id, n:0, rs:0, dn:0, dp:0 }));
            return extras.length ? { ...p, mers:[...p.mers, ...extras] } : p;
          });
        }
        setRmas(p=>({...p,...r}));
      }}/>}
        {user.role==="associate"  && mode==="stats"   && astats && <AssocDash stats={astats}/>}
      </Shell>
    </>
  );
}
