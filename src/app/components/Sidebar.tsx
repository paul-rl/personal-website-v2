// components/Sidebar.tsx
export default function Sidebar() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="font-serif text-cream text-2xl font-semibold">Gian Paul Ramirez</h1>
      <p className="font-serif text-body">The Developer of Software</p>

      <nav className="space-y-2">
        <a href="/" className="font-serif block px-3 py-2 rounded-xl bg-button border border-golden/20">
          Resume
        </a>
        <a href="/projects" className="font-serif block px-3 py-2 rounded-xl bg-button border border-golden/20">
          GitHub
        </a>
        <a href="/about" className="font-serif block px-3 py-2 rounded-xl bg-button border border-golden/20">
          Contact Me
        </a>
      </nav>
      <p className="font-sans text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo risus, semper sed nulla eu, interdum suscipit sapien. Proin maximus vel orci ac euismod. Quisque nec lacus ullamcorper, cursus orci a, ullamcorper mauris. In non interdum neque. Phasellus blandit mauris lacus, nec maximus tellus pretium vitae. Praesent urna lacus, interdum non ultrices at, porta scelerisque ligula. Sed eros velit, vulputate non pretium ac, gravida at lorem. In posuere in ex non condimentum.</p>
    </div>
  );
}
