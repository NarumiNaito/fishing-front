import Footer from "@/components/layouts/Footer/Footer";
import Header from "@/components/layouts/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
