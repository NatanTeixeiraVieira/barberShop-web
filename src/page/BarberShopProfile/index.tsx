import {
  MapPin,
  Phone,
  Star,
  Edit2,
  Check,
  Upload,
  UserCircle2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useBarberShopProfile } from './useBarberShopProfile';
import { phoneMask } from '@/utils/mask';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { register } from 'module';

export default function BarberShopProfile() {
  const profile = useBarberShopProfile();

  return (
    <div className="flex justify-center sm:p-4">
      <div className="bg-white flex rounded-lg shadow-lg sm:max-w-[90vw] w-full overflow-hidden">
        {profile.barberShop && (
          <div className="px-6 py-12 space-y-4 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="size-16">
                    <AvatarImage src={profile.avatarImage} />
                    <AvatarFallback>
                      <UserCircle2 className="size-12" />
                    </AvatarFallback>
                  </Avatar>
                  {/* <img
                    src={profile.barberShop.photoUrl}
                    alt={profile.barberShop.name}
                    className="w-16 h-16 rounded-full object-cover"
                  /> */}
                  {profile.isEditing && (
                    <Button
                      variant="default"
                      size="icon"
                      className="absolute bottom-0 right-0 size-7"
                      onClick={profile.triggerFileInput}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                  <Input
                    type="file"
                    {...profile.register('file', {
                      onChange: profile.handleImageUpload,
                    })}
                    ref={(event) => {
                      profile.register('file').ref(event);
                      profile.fileInputRef.current = event;
                    }}
                    className="opacity-0 absolute"
                    accept="image/*"
                    helperText={profile.errors.file?.message}
                  />
                </div>
                {profile.isEditing ? (
                  <Input
                    {...profile.register('name')}
                    helperText={profile.errors.name?.message}
                    className="font-bold text-xl"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">
                    {profile.barberShop.name}
                  </h1>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={profile.toggleEdit}
                disabled={profile.isLoading}
              >
                {profile.isEditing ? (
                  profile.isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )
                ) : (
                  <Edit2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="space-y-6">
              {(profile.barberShop.street ||
                profile.barberShop.city ||
                profile.barberShop.state) && (
                <div className="flex items-start space-x-2">
                  <MapPin className="text-gray-500 mt-1 flex-shrink-0" />
                  {profile.isEditing ? (
                    <div className="grid grid-cols-2 gap-6 w-full">
                      <Input
                        id="cep"
                        placeholder="CEP"
                        {...profile.register('cep')}
                        helperText={profile.errors.cep?.message}
                      />
                      <Input
                        {...profile.register('street')}
                        helperText={profile.errors.street?.message}
                        placeholder="Rua"
                      />
                      <Input
                        {...profile.register('number')}
                        helperText={profile.errors.number?.message}
                        placeholder="Número"
                      />
                      <Input
                        {...profile.register('neighborhood')}
                        helperText={profile.errors.neighborhood?.message}
                        placeholder="Bairro"
                      />
                      <Input
                        {...profile.register('city')}
                        helperText={profile.errors.city?.message}
                        placeholder="Cidade"
                      />
                      <Input
                        {...profile.register('state')}
                        helperText={profile.errors.state?.message}
                        placeholder="Estado"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-700">{profile.renderAddress()}</p>
                  )}
                </div>
              )}
              {profile.barberShop.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-500" />
                  {profile.isEditing ? (
                    <Input
                      {...profile.register('phone')}
                      helperText={profile.errors.phone?.message}
                      placeholder="Telefone"
                    />
                  ) : (
                    <p className="text-gray-700">
                      {phoneMask(profile.barberShop.phone)}
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400" />
                <p className="text-gray-700">
                  {profile.barberShop.rating.toFixed(1)} / 5.0
                </p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <h2 className="text-lg font-semibold mb-2">
                Informações adicionais
              </h2>
              <div className="space-y-1 sm:w-1/2">
                <Label htmlFor="cnpj">CNPJ:</Label>
                {profile.isEditing ? (
                  <Input
                    id="cnpj"
                    {...profile.register('cnpj')}
                    helperText={profile.errors.cnpj?.message}
                  />
                ) : (
                  <p className="text-gray-700">
                    {profile.formatCNPJ(profile.barberShop.cnpj)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}