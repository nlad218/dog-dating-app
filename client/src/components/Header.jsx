export default function Header({ children }) {
  return (
    <header className="flex flex-row justify-between p-4">
      <h1 className="">Snif</h1>
      <nav>{children}</nav>
    </header>
  );
}
