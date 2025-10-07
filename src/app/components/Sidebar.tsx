// components/Sidebar.tsx
export default function Sidebar() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="font-serif text-cream text-2xl font-semibold">Gian Paul Ramirez</h1>
      <p className="font-serif text-body">The Developer of Software</p>

      <nav className="space-y-2">
        <a href="/" className="block px-3 py-2 rounded-xl bg-button border border-golden/20">
          Resume
        </a>
        <a href="/projects" className="block px-3 py-2 rounded-xl bg-button border border-golden/20">
          GitHub
        </a>
        <a href="/about" className="block px-3 py-2 rounded-xl bg-button border border-golden/20">
          Contact Me
        </a>
      </nav>
    </div>
  );
}
