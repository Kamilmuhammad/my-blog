import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
    return (
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 min-h-screen text-white text-source">
            <div className="container mx-auto px-6 lg:px-20 cursor-default">
                <Navbar />
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
