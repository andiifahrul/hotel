import Navbar from '../componenpublic/Navbar';
import Footer from '../componenpublic/Footer';


const AppLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;