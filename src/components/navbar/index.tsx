import { Link } from 'react-router-dom';
import { useNavbar } from './useNavbar';
import { LogOut, Menu, X } from 'lucide-react';
import { Button, Drawer } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function Navbar() {
  const {
    activeTab,
    barberShop,
    auth,
    activeDropdown,
    openMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleClickBarberShop,
    handleClickLogout,
    toggleMenu,
  } = useNavbar();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex gap-4 justify-around items-center sm:flex-row">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-primary transition-colors"
        >
          <img
            src="/LogoBarbeiro.svg"
            alt="Logo"
            className="w-24 bg-primary rounded-lg"
          />
        </Link>
        <div className="sm:hidden flex flex-row justify-center items-center ">
          <Button variant="contained" onClick={toggleMenu}>
            <Menu />
          </Button>
          <Drawer
            anchor={'right'}
            open={openMenu}
            onClose={toggleMenu}
            className="text-lg font-bold"
          >
            <div className=" flex flex-col items-center sm:flex-row mt-3 w-44">
              <span onClick={toggleMenu}>
                <X />
              </span>
              <Link
                to={`/`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>
              {auth?.client ? (
                <>
                  {!barberShop && (
                    <Link
                      onClick={handleClickBarberShop}
                      to="/auth/register-barber-shop"
                      className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${
                        activeTab === 'barber'
                          ? 'bg-primary text-white'
                          : 'bg-white hover:bg-primary text-primary'
                      } h-10 px-4 py-2`}
                    >
                      Cadastrar barbearia
                    </Link>
                  )}

                  <SimpleTreeView>
                    {barberShop && (
                      <TreeItem itemId="grid" label="Barbearia">
                        <Link
                          to={`/barber-shop-profile/${barberShop.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Perfil
                        </Link>
                        <Link
                          to={`/`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Gerenciar horários
                        </Link>
                        <Link
                          to={`/barber-shop-service/${barberShop.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Serviços
                        </Link>
                        <Link
                          to={`/`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Agendamentos
                        </Link>
                      </TreeItem>
                    )}

                    <TreeItem itemId="Client" label="Client">
                      <Link
                        to={`/client-profile`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Ver Perfil
                      </Link>
                      <Link
                        to={`/client-appointments`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Histórico Agendamentos
                      </Link>
                      <Link
                        to={`/barber-shop-profile/edit`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Favoritos
                      </Link>
                    </TreeItem>
                  </SimpleTreeView>

                  <span
                    onClick={handleClickLogout}
                    className="flex items-center justify-center"
                  >
                    Sair
                    <LogOut className="w-4 h-4 ml-2" />
                  </span>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className=" text-blue-600 w-32 text-center font-normal mb-2 mt-2 text-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="text-blue-600 w-32 text-center font-normal text-md "
                  >
                    Cadastrar-se
                  </Link>
                </>
              )}
            </div>
          </Drawer>
        </div>

        <div className="hidden sm:flex sm:items-center sm:flex-row gap-3 mt-3">
          {auth?.client ? (
            <>
              {!barberShop && (
                <Link
                  onClick={handleClickBarberShop}
                  to="/auth/register-barber-shop"
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${
                    activeTab === 'barber'
                      ? 'bg-primary text-white'
                      : 'bg-white hover:bg-primary text-primary'
                  } h-10 px-4 py-2`}
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
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${
                      activeTab && activeDropdown === 'barber'
                        ? 'bg-primary text-white'
                        : 'bg-white hover:bg-primary text-primary hover:text-white'
                    } h-10 px-3 py-2`}
                  >
                    Perfil da Barbearia
                  </button>

                  {activeDropdown === 'barber' && (
                    <div className="absolute right-0 w-36 bg-white shadow-lg rounded-md z-10 text-center">
                      <Link
                        to={`/barber-shop-profile/${barberShop.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Ver Perfil
                      </Link>
                      <Link
                        to={`/barber-opening-hours/${barberShop.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Gerenciar horários
                      </Link>
                      <Link
                        to={`/barber-shop-service/${barberShop.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Serviços
                      </Link>
                      <Link
                        to={`/barber-shop-appointments/${barberShop.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
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
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${
                    activeTab && activeDropdown === 'client'
                      ? 'bg-primary text-white'
                      : 'bg-white hover:bg-primary text-primary hover:text-white'
                  } h-10 px-4 py-2`}
                >
                  Perfil Cliente
                </button>

                {activeDropdown === 'client' && (
                  <div className="absolute right-0 w-28 bg-white shadow-lg rounded-md z-10 text-center">
                    <Link
                      to={`/client-profile`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ver Perfil
                    </Link>
                    <Link
                      to={`/client-appointments`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Histórico Agendamentos
                    </Link>
                    <Link
                      to={`/barber-shop-profile/edit`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Favoritos
                    </Link>
                  </div>
                )}
              </div>

              <button
                onClick={handleClickLogout}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors bg-white hover:bg-primary text-primary hover:text-white h-10 px-4 py-2"
              >
                Sair
                <LogOut className="w-4 h-4 ml-2" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${
                  activeTab === 'login'
                    ? 'bg-primary text-white'
                    : 'bg-white hover:bg-primary text-primary hover:text-white'
                } h-10 px-4 py-2`}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors ${
                  activeTab === 'register'
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
