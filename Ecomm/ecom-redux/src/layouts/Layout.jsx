import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryStrip from "../components/CategoryStrip";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <CategoryStrip />
      <main className="flex-1 container-max py-6">{children}</main>
      <Footer />
    </div>
  );
}
