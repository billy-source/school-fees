export const SCHOOL = import.meta.env.VITE_SCHOOL_NAME || "My School";
export const money = (n) => `KES ${Number(n || 0).toLocaleString()}`;
export const today = () => new Date().toLocaleDateString("en-CA");
export const errMsg = (e) => e?.message || "Something went wrong.";

export const input = "w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-blue-600";
export const btn = "rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50";

export function downloadCSV(filename, rows) {
  const cell = (v) => {
    let s = String(v ?? "");
    if (typeof v === "string" && /^[=+\-@]/.test(s)) s = "'" + s; // stops spreadsheet formula tricks
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = rows.map((r) => r.map(cell).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = filename;
  a.click();
}