"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import { CreateOpeningHoursDto, CreateOpeningHoursDtoArray } from "@/types/barberOpeningHours"

const daysOfWeek = [
  { name: "Domingo", shortName: "Dom" },
  { name: "Segunda", shortName: "Seg" },
  { name: "Terça", shortName: "Ter" },
  { name: "Quarta", shortName: "Qua" },
  { name: "Quinta", shortName: "Qui" },
  { name: "Sexta", shortName: "Sex" },
  { name: "Sábado", shortName: "Sáb" }
]

function generateTimeSlots() {
  const slots = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

type TimeRange = { from: string; to: string }

function convertToOpeningHoursDtoArray(
  openingHours: { [key: string]: TimeRange[] },
  barberShopId: string
) {
  const weekdays: CreateOpeningHoursDto[] = [];

  // Itera sobre cada dia da semana no objeto openingHours
  for (const [weekday, timeRanges] of Object.entries(openingHours)) {
    // Para cada faixa de horário no array de TimeRange
    timeRanges.forEach(timeRange => {
      const dto = {
        weekday: weekday,
        start: timeRange.from,
        end: timeRange.to,
        barberShopId: barberShopId
      }

      weekdays.push(dto);
    });
  }

  return { weekdays };
}

export default function Component() {
  const [workDays, setWorkDays] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(daysOfWeek.map(day => [day.name, false]))
  )
  const [schedule, setSchedule] = useState<{ [key: string]: TimeRange[] }>(
    Object.fromEntries(daysOfWeek.map(day => [day.name, [{ from: "", to: "" }]]))
  )
  console.log("🚀 ~ Component ~ schedule:", convertToOpeningHoursDtoArray(schedule, '07d439d9-58b6-4f82-92a2-bc491abbf035'))

  console.log(schedule)

  const toggleWorkDay = (day: string, checked: boolean) => {
    setWorkDays(prev => ({ ...prev, [day]: checked }))
  }

  const handleTimeChange = (day: string, index: number, type: 'from' | 'to', time: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].map((range, i) =>
        i === index ? { ...range, [type]: time } : range
      )
    }))
  }

  const addTimeRange = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], { from: "09:00", to: "17:00" }]
    }))
  }

  const removeTimeRange = (day: string, index: number) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }))
  }


  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Selecione os dias de trabalho</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {daysOfWeek.map(day => (
              <div key={day.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`workday-${day.name}`}
                  checked={workDays[day.name]}
                  onCheckedChange={(checked) => toggleWorkDay(day.name, checked as boolean)}
                />
                <Label htmlFor={`workday-${day.name}`}>{day.shortName}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {daysOfWeek.filter(day => workDays[day.name]).map(day => (
          <Card key={day.name}>
            <CardHeader>
              <CardTitle>{day.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule[day.name].map((range, index) => (
                  <div key={index} className="space-y-2 pb-4 border-b last:border-b-0">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`from-${day.name}-${index}`}>De:</Label>
                      <Select
                        value={range.from}
                        onValueChange={(time) => handleTimeChange(day.name, index, 'from', time)}
                      >
                        <SelectTrigger id={`from-${day.name}-${index}`} className="w-[120px]">
                          <SelectValue placeholder="Início" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(slot => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`to-${day.name}-${index}`}>Até:</Label>
                      <Select
                        value={range.to}
                        onValueChange={(time) => handleTimeChange(day.name, index, 'to', time)}
                      >
                        <SelectTrigger id={`to-${day.name}-${index}`} className="w-[120px]">
                          <SelectValue placeholder="Fim" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(slot => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {schedule[day.name].length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeTimeRange(day.name, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => addTimeRange(day.name)}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Adicionar horário
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
