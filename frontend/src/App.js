import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1 mt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
