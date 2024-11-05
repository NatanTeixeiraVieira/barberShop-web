import {
  useBarberShopContext,
  valuesBarberShop,
} from '@/context/formBarberShopContext';

export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];
export const useFormBarberShop = () => {
  const { formBarberShop, setFormBarberShop } = useBarberShopContext();

  const handleChange = (field: string, value: string) => {
    setFormBarberShop((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const barberShopData = {
    ...formBarberShop,
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/api/barber-shop/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(barberShopData),
      });

      if (response.ok) {
        console.log('Barbearia cadastrada com sucesso!');
      } else {
        console.error('Erro ao cadastrar barbearia');
      }

      setFormBarberShop(valuesBarberShop);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return {
    formBarberShop,
    handleChange,
    handleSubmit,
    brazilianStates,
  };
};
