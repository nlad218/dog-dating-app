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
      <div className="flex justify-center items-center p-4">
        <Outlet />
      </div>
      <Footer>
        <Nav />
      </Footer>
    </>
  );
}
