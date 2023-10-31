export default function Footer({ children }) {
  return (
    <div className="bg-primary text-primary-content flex md:hidden flex-row justify-center align-center min-w-full bottom-0 text-2xl font-semibold rounded-t-xl p-4">
      {children}
    </div>
  );
}
