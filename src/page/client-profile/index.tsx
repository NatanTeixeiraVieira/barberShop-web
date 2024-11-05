import { Phone, Edit2, Check, Upload, Mail, UserCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useClientProfile } from './useClientProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ClientProfile() {
  const profile = useClientProfile();

  return (
    <div className="bg-primary flex justify-center p-4">
      <div className="bg-paper rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        {profile.client && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="size-16">
                    <AvatarImage src={profile.avatarImage} />
                    <AvatarFallback>
                      <UserCircle2 className="size-12" />
                    </AvatarFallback>
                  </Avatar>
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
                    className="font-bold text-xl"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{profile.client.name}</h1>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={profile.handleToggleEdit}
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

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-500" />
                <p className="text-gray-700">{profile.client.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-gray-500" />
                {profile.isEditing ? (
                  <Input
                    {...profile.register('phoneNumber')}
                    placeholder="Phone Number"
                  />
                ) : (
                  <p className="text-gray-700">
                    {profile.formatPhone(profile.client.phoneNumber)}
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
