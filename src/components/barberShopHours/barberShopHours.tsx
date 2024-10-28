import { useState } from "react";

export default function BarberShopHours() {
  const [horarios, setHorarios] = useState<{ [key: string]: { abertura: string; fechamento: string } }>({});

  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const handleHorarioChange = (dia: string, tipo: 'abertura' | 'fechamento', valor: string) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [tipo]: valor },
    }));
  };

  // Função para gerar horários de 5 em 5 minutos
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
      {diasSemana.map((dia) => (
        <div key={dia} className="flex items-center space-x-4">
          <span className="w-24">{dia}</span>
          <select
            value={horarios[dia]?.abertura || ''}
            onChange={(e) => handleHorarioChange(dia, 'abertura', e.target.value)}
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
            value={horarios[dia]?.fechamento || ''}
            onChange={(e) => handleHorarioChange(dia, 'fechamento', e.target.value)}
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
