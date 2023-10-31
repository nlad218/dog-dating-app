import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header>
        <Nav />
      </Header>
      <Outlet />
      <Footer>
        <Nav />
      </Footer>
    </>
  );
}
