import React from "react";
import useDetailsBarberShop from "./useDetailsBarberShop";
import { Link } from "react-router-dom";
import Schedule from "../Schedule";
import { Star } from "lucide-react";

const BarberShopDetails: React.FC = () => {
  const { barberShopServices, isLoading, hasServices, barberShop, auth } = useDetailsBarberShop();

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md my-8">
      <div className="flex items-center mb-4">
        <Link to='/' className="text-gray-500 hover:text-gray-700">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div className=" w-full flex flex-col items-center gap-2 sm:justify-between sm:flex-row">
          <h1 className="text-2xl font-bold">{barberShop?.name}</h1>

          {barberShop && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={`${barberShop.id}${i}`}
                  className={`w-4 h-4 ${i < Math.floor(barberShop.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                    }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">
                {barberShop.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

      </div>

      <h2 className="text-xl font-semibold mb-2">Lista de serviços</h2>

      {isLoading ? (
        <p className="text-gray-600">Carregando serviços...</p>
      ) : hasServices ? (
        barberShopServices?.map((service) => (
          <div key={service.id} className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">{service.name}</p>
              <p className="text-sm text-gray-600">R$ {service.price}</p>
              <p className="text-sm text-gray-600">Duração: {service.duration} min</p>
            </div>
            {auth?.token ? (
              <Schedule />
            ) : (
              <Link
                to="/auth/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary transition-colors bg-white hover:bg-primary text-primary hover:text-white h-10 px-4 py-2"
              >
                Login
              </Link>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">Nenhum serviço encontrado.</p>
      )}
    </div>
  );
};

export default BarberShopDetails;
