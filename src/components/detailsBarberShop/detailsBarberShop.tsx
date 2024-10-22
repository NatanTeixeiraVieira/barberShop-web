import { Star, ChevronLeft, MoreHorizontal, Heart, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

interface BarberShop {
  id: string,
  name: string
}

interface ApiBarberShop {
  props: BarberShop,
}


export default function DetailBarberShop() {

  const [ barberShop, setBarberShop ] = useState<BarberShop | null>(null);

  const {barberShopId} = useParams<{barberShopId: string}>()

  useEffect(() => {
    const fetchBarberShop = async () => {
      try {
        const responseBarber = await fetch(`http://localhost:3333/api/client/v1/${barberShopId}`)

        if (!responseBarber.ok) {
          throw new Error(`Erro nao requisição`)
        }
        const jsonData: ApiBarberShop = await responseBarber.json();
        setBarberShop(jsonData.props)
        console.log("🚀 ~ fetchBarberShop ~ jsonData:", jsonData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBarberShop()
  }, [barberShopId])

  return (
    <div className="bg-sky-400 min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <ChevronLeft className="text-gray-600" />
          <MoreHorizontal className="text-gray-600" />
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{barberShop?.name}</h2>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                ))}
                <span className="ml-2 text-gray-600">4.7</span>
              </div>
            </div>
            <Heart className="text-gray-400" />
          </div>
          <h3 className="mt-6 mb-4 text-lg font-semibold">Lista de serviços</h3>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Corte masculino</p>
                  <p className="text-sm text-gray-600">R$ 29,90</p>
                </div>
                <button className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors">
                  Agendar
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Natãn</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              </div>
              <ChevronRight className="text-gray-600" />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Muito bom este cortador, muito educado e atencioso. Recomendo demais!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
