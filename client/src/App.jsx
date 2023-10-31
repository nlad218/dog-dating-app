import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

import LandingPage from "./pages/Home";

export default function App() {
  return (
    <>
      <Header>
        <Nav />
      </Header>
      <main className="h-full">
        <LandingPage />
      </main>
      <Footer>
        <Nav />
      </Footer>
    </>
  );
}
