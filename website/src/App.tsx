import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Alumni from "./pages/Alumni";
import Tiranga from "./pages/Tiranga";
import CareerCounselling from "./pages/CareerCounselling";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="admin" element={<Admin />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="alumni" element={<Alumni />} />
        <Route path="the-tiranga" element={<Tiranga />} />
        <Route path="career-counselling" element={<CareerCounselling />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
