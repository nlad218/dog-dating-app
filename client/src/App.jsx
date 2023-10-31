import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <Header>
        <Nav />
      </Header>
      <main className="card bg-primary text-primary-content">
        <div className="card-body">
          <h1 className="card-title">Welcome to the front end &gt;:)</h1>
          Hopefully this is all working
        </div>
      </main>
      <Footer>
        <Nav />
      </Footer>
    </>
  );
}
