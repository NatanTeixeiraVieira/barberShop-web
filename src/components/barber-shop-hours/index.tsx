"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, MinusCircle } from "lucide-react"

const daysOfWeek = [
  { name: "Domingo", shortName: "Dom" },
  { name: "Segunda", shortName: "Seg" },
  { name: "Terça", shortName: "Ter" },
  { name: "Quarta", shortName: "Qua" },
  { name: "Quinta", shortName: "Qui" },
  { name: "Sexta", shortName: "Sex" },
  { name: "Sábado", shortName: "Sáb" }
]

function BarberShopHours() {
  const slots = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
    }
  }
  return slots
}

const timeSlots = BarberShopHours()

export default function Component() {
  const [workDays, setWorkDays] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(daysOfWeek.map(day => [day.name, false]))
  )
  const [schedule, setSchedule] = useState<{ [key: string]: string[] }>(
    Object.fromEntries(daysOfWeek.map(day => [day.name, ["09:00", "17:00"]]))
  )

  const toggleWorkDay = (day: string, checked: boolean) => {
    setWorkDays(prev => ({ ...prev, [day]: checked }))
  }

  const handleTimeChange = (day: string, index: number, time: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].map((t, i) => i === index ? time : t)
    }))
  }

  const addTimeSlot = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], ""]
    }))
  }

  const removeTimeSlot = (day: string, index: number) => {
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
                  onCheckedChange={(checked) => toggleWorkDay(day.name, !!checked)}
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
                {schedule[day.name].map((time, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Select
                      value={time}
                      onValueChange={(newTime) => handleTimeChange(day.name, index, newTime)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(slot => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeTimeSlot(day.name, index)}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => addTimeSlot(day.name)}
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
