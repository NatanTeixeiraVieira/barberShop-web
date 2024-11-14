import { Star, Search, UserCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useHome } from './useHome';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import Spinner from '@/components/Spinner';

export default function Home() {
  const {
    barberShop,
    currentPage,
    searchInputRef,
    isFetching,
    handleSearchBarber,
    handleLoadMore,
  } = useHome();

  return (
    <div className="p-4 text-zinc-100 mx-auto md:w-[40rem]">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Encontre o seu barbeiro favorito</h1>
      </header>

      <div className="relative mb-6">
        <Input
          type="text"
          className="w-full pl-10 pr-4 text-base py-2 rounded-full bg-secondary text-zinc-100 placeholder-teal-200 border-none focus:ring-2 focus:ring-white"
          ref={searchInputRef}
        />
        <Search
          onClick={handleSearchBarber}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-200"
        />
      </div>

      <div className="space-y-4">
        {isFetching && (
          <div className="w-full text-center">
            <Spinner size="lg" />
          </div>
        )}
        {!isFetching &&
          barberShop &&
          barberShop.data?.map((barber) => (
            <div key={barber.id} className="bg-slate-100 rounded-lg p-4 flex gap-4 items-center text-gray-800">

              <Avatar className="size-16">
                <AvatarImage src={barber.photoUrl} />
                <AvatarFallback>
                  <UserCircle2 className="size-12" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-grow">
                <h2 className="font-semibold">{barber.name}</h2>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`${barber.id}${i}`}
                      className={`w-4 h-4 ${i < Math.floor(barber.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">
                    {barber.rating}
                  </span>
                </div>
              </div>
              <Link
                to={`/details-barber-shop/${barber.id}`}
                  className='border border-slate-400 px-4 py-1 rounded-md bg-white hover:bg-primary text-black hover:text-white'
              >
                  Ver Perfil
              </Link>
            </div>
          ))}
      </div>
      {barberShop && barberShop.meta?.totalPages > currentPage && (
        <div className="w-full flex justify-center mt-4">
          <Button variant="secondary" onClick={handleLoadMore}>
            Carregar mais
          </Button>
        </div>
      )}
    </div>
  );
}
