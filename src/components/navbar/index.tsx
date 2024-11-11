import { Link } from 'react-router-dom';
import useNavbar from './useNavbar';

export default function Navbar() {
  const {
    activeTab,
    barberShop,
    auth,
    activeDropdown,
    handleMouseEnter,
    handleMouseLeave,
    handleClickBarberShop,
    handleClickLogout,

  } = useNavbar();



  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col justify-around items-center sm:flex-row">
        <Link to="/" className="text-xl font-bold text-gray-800 hover:text-primary transition-colors">
          <img src="/LogoBarbeiro.svg" alt="Logo" className="w-24 bg-primary rounded-lg" />
        </Link>

        <div className="space-x-2 flex flex-col items-center sm:flex-row gap-3 mt-3">
          {auth?.token ? (
            <>
              {!barberShop && (
                <Link
                  onClick={handleClickBarberShop}
                  to="/auth/register-barber-shop"
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${activeTab === 'barber' ? 'bg-primary text-white' : 'bg-white hover:bg-primary text-primary'} h-10 px-4 py-2`}
                >
                  Cadastrar barbearia
                </Link>
              )}

              {barberShop && (
                <div
                  className="relative dropdown"
                  onMouseEnter={() => handleMouseEnter('barber')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${activeTab && activeDropdown === 'barber' ? 'bg-primary text-white' : 'bg-white hover:bg-primary text-primary hover:text-white'} h-10 px-3 py-2`}
                  >
                    Perfil da Barbearia
                  </button>

                  {activeDropdown === 'barber' && (
                    <div className="absolute right-0 w-36 bg-white shadow-lg rounded-md z-10 text-center">
                      <Link to={`/barber-shop-profile/${barberShop.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Ver Perfil
                      </Link>
                      <Link to={`/`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Gerenciar horários
                      </Link>
                      <Link to={`/`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Agendamentos
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <div
                className="relative dropdown"
                onMouseEnter={() => handleMouseEnter('client')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${activeTab && activeDropdown === 'client' ? 'bg-primary text-white' : 'bg-white hover:bg-primary text-primary hover:text-white'} h-10 px-4 py-2`}
                >
                  Perfil Cliente
                </button>

                {activeDropdown === 'client' && (
                  <div className="absolute right-0 w-28 bg-white shadow-lg rounded-md z-10 text-center">
                    <Link to={`/client-profile/${auth.client.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Ver Perfil
                    </Link>
                    <Link to={`/client-appointments`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Histórico Agendamentos
                    </Link>
                    <Link to={`/barber-shop-profile//edit`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Favoritos
                    </Link>
                  </div>
                )}
              </div>

              <button
                onClick={handleClickLogout}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors bg-white hover:bg-primary text-primary hover:text-white h-10 px-4 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${activeTab === 'login' ? 'bg-primary text-white' : 'bg-white hover:bg-primary text-primary hover:text-white'} h-10 px-4 py-2`}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${activeTab === 'register' ? 'bg-primary text-white' : 'bg-white hover:bg-primary text-primary hover:text-white'} h-10 px-4 py-2`}
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
