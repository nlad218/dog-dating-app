export default function Header({ children }) {
  return (
    <header className="flex flex-row justify-center md:justify-between p-4 prose sticky top-0 min-w-full">
      <h1>Snif</h1>
      <div className="hidden md:inline">{children}</div>
    </header>
  );
}
