import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <Header>
        <Nav />
      </Header>
      <main className="h-full">CONTENT GOES HERE</main>
      <Footer>
        <Nav />
      </Footer>
    </>
  );
}
