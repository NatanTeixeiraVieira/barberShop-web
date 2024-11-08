import { useAppContext } from '@/context/appContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { activeTab, setActiveTab, isAuthenticate, setIsAuthenticate } = useAppContext();

  const navigate = useNavigate()

  const handleClickBarberShop = () => {
    setActiveTab('barber');
  };

  const handleClickLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticate(false)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-[#38BDF8] transition-colors"
        >
          <img
            src="/LogoBarbeiro.svg"
            alt="Logo"
            className="w-24 bg-primary rounded-lg"
          />
        </Link>
        <div className="space-x-2">
          {isAuthenticate ? (
            <>
              <Link
                onClick={handleClickBarberShop}
                to="/auth/register-barber-shop"
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'barber'
                    ? 'bg-primary text-white'
                    : 'bg-white hover:bg-primary text-primary'
                  } border border-primary  hover:text-white h-10 px-4 py-2`}
              >
                Cadastrar barbearia
              </Link>

              <button
                onClick={handleClickLogout}
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary hover:text-white h-10 px-4 py-2 bg-white hover:bg-primary text-primary hover:text-white `}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary   ${activeTab === 'login'
                    ? 'bg-primary text-white'
                    : 'bg-white hover:bg-primary text-primary'
                  } hover:text-white h-10 px-4 py-2`}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#38BDF8] ${activeTab === 'register'
                    ? 'bg-primary text-white'
                    : 'bg-white hover:bg-primary text-primary hover:text-white'
                  } h-10 px-4 py-2`}
              >
                Cadastrar-se
              </Link>
            </>
          )}


        </div>
      </div>
    </nav>
  );
}
