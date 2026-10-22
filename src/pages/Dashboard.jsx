import { useState } from "react";
import { ShortenForm,StatsCards,LinkList,AnalyticsPanel } from "../features"

// ---------- MOCK DATA (delete when your backend is ready) ----------
const mockStats = [
  { label: "Total links", value: "24", change: 12.5 },
  { label: "Total clicks", value: "1,284", change: 8.2 },
  { label: "Avg. clicks / link", value: "53", change: -3.1 },
];

const mockLinks = [
  { id: 1, short: "snip.ly/a1B2c3", original: "https://github.com/yourname/luxe-e-commerce", clicks: 482, createdAt: "2 days ago" },
  { id: 2, short: "snip.ly/x9Y8z7", original: "https://yourportfolio.dev/projects/spendlens", clicks: 311, createdAt: "5 days ago" },
  { id: 3, short: "snip.ly/q4W5e6", original: "https://example.com/a/very/long/article/url?utm_source=twitter", clicks: 97, createdAt: "1 week ago" },
];

const mockAnalytics = {
  timeSeries: [
    { label: "Mon", value: 32 }, { label: "Tue", value: 58 }, { label: "Wed", value: 41 },
    { label: "Thu", value: 77 }, { label: "Fri", value: 95 }, { label: "Sat", value: 63 }, { label: "Sun", value: 48 },
  ],
  devices: [
    { label: "Mobile", value: 62 }, { label: "Desktop", value: 31 }, { label: "Tablet", value: 7 },
  ],
  countries: [
    { label: "India", value: 54 }, { label: "United States", value: 21 },
    { label: "Germany", value: 11 }, { label: "Others", value: 14 },
  ],
};

export const DashBoard = () => {
  const [url, setUrl] = useState("");
  const [selectedId, setSelectedId] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const [range, setRange] = useState("7d");

  const selected = mockLinks.find((l) => l.id === selectedId);

  const handleCopy = (link) => {
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/60 via-white to-white">
      <main className="mx-auto max-w-5xl space-y-12 px-4 py-12">
        <ShortenForm
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        />

        <StatsCards stats={mockStats} />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-bold text-slate-900">Your links</h2>
            <LinkList
              links={mockLinks}
              selectedId={selectedId}
              copiedId={copiedId}
              onSelect={setSelectedId}
              onCopy={handleCopy}
            />
          </div>

          <div className="lg:col-span-3">
            {/* key= makes the panel re-run its animations when you switch links */}
            <AnalyticsPanel
              key={selectedId + range}
              title={selected?.short}
              range={range}
              onRangeChange={setRange}
              {...mockAnalytics}
            />
          </div>
        </div>
      </main>
    </div>
  );
}