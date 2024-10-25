import { MapPin, Phone, Star, Edit2, Check, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useBarberShopProfile } from './useBarberShopProfile';

interface BarberShopInfo {
  name: string;
  cnpj: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  photoUrl: string;
  rating: number;
}

export default function BarberShopProfile() {
  const profile = useBarberShopProfile();

  return (
    <div className="flex items-center justify-center p-1 sm:p-4">
      <div className="bg-paper rounded-lg shadow-lg max-w-2xl w-full overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={profile.barberShop.photoUrl}
                  alt={profile.barberShop.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {profile.isEditing && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0"
                    onClick={profile.triggerFileInput}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
                <input
                  type="file"
                  ref={profile.fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={profile.handleImageUpload}
                />
              </div>
              {profile.isEditing ? (
                <Input
                  name="name"
                  value={profile.barberShop.name}
                  onChange={profile.handleInputChange}
                  className="font-bold text-xl"
                />
              ) : (
                <h1 className="text-2xl font-bold">
                  {profile.barberShop.name}
                </h1>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={profile.toggleEdit}>
              {profile.isEditing ? (
                <Check className="h-4 w-4" />
              ) : (
                <Edit2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-500" />
              {profile.isEditing ? (
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="street"
                    value={profile.barberShop.street}
                    onChange={profile.handleInputChange}
                    placeholder="Street"
                  />
                  <Input
                    name="number"
                    value={profile.barberShop.number}
                    onChange={profile.handleInputChange}
                    placeholder="Number"
                  />
                  <Input
                    name="neighborhood"
                    value={profile.barberShop.neighborhood}
                    onChange={profile.handleInputChange}
                    placeholder="Neighborhood"
                  />
                  <Input
                    name="city"
                    value={profile.barberShop.city}
                    onChange={profile.handleInputChange}
                    placeholder="City"
                  />
                  <Input
                    name="state"
                    value={profile.barberShop.state}
                    onChange={profile.handleInputChange}
                    placeholder="State"
                  />
                </div>
              ) : (
                <p className="text-gray-700">
                  {profile.barberShop.street}, {profile.barberShop.number},{' '}
                  {profile.barberShop.neighborhood}, {profile.barberShop.city},{' '}
                  {profile.barberShop.state}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-gray-500" />
              {profile.isEditing ? (
                <Input
                  name="phone"
                  value={profile.barberShop.phone}
                  onChange={profile.handleInputChange}
                />
              ) : (
                <p className="text-gray-700">
                  {profile.formatPhone(profile.barberShop.phone)}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400" />
              <p className="text-gray-700">
                {profile.barberShop.rating.toFixed(1)} / 5.0
              </p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <h2 className="text-lg font-semibold mb-2">
              Additional Information
            </h2>
            <div className="space-y-1">
              <Label htmlFor="cnpj">CNPJ:</Label>
              {profile.isEditing ? (
                <Input
                  id="cnpj"
                  name="cnpj"
                  value={profile.barberShop.cnpj}
                  onChange={profile.handleInputChange}
                />
              ) : (
                <p className="text-gray-700">
                  {profile.formatCNPJ(profile.barberShop.cnpj)}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="cep">CEP:</Label>
              {profile.isEditing ? (
                <Input
                  id="cep"
                  name="cep"
                  value={profile.barberShop.cep}
                  onChange={profile.handleInputChange}
                />
              ) : (
                <p className="text-gray-700">
                  {profile.formatCEP(profile.barberShop.cep)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
