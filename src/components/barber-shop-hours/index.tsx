import { useBarberShopContext } from '@/context/formBarberShopContext';

export default function BarberShopHours() {
  const { hoursBarberShop, setBarberShopHours } = useBarberShopContext();

  const daysWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setBarberShopHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(time);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Horários de Funcionamento</h3>
      {daysWeek.map((day) => (
        <div key={day} className="flex items-center space-x-4">
          <span className="w-24">{day}</span>
          <select
            value={hoursBarberShop[day]?.start || ''}
            onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
            className="w-32"
          >
            <option value="">Selecione</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <span>até</span>
          <select
            value={hoursBarberShop[day]?.end || ''}
            onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
            className="w-32"
          >
            <option value="">Selecione</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
