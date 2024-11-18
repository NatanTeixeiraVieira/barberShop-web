import {
  Phone,
  Edit2,
  Check,
  Upload,
  Mail,
  UserCircle2,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useClientProfile } from './useClientProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Arrow from '@/components/arrow';
import { phoneMask } from '@/utils/mask';
import Spinner from '@/components/spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/toaster';

export default function ClientProfile() {
  const profile = useClientProfile();

  return (
    <div className="flex justify-center p-4 mt-24 ">
      <div className="bg-paper rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        {profile.client && (
          <div className="p-6 space-y-10">
            <div className="flex items-start justify-between ">
              <Button
                variant="ghost"
                size="icon"
                onClick={profile.handleCancelEdit}
              >
                {profile.isEditing ? (
                  profile.isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900" />
                  ) : (
                    <X />
                  )
                ) : (
                  <Arrow to="/" />
                )}
              </Button>
              <div className="flex flex-col items-center justify-center gap-1 ">
                <div className="relative">
                  <Avatar className="size-28">
                    <AvatarImage src={profile.avatarImage} />
                    <AvatarFallback>
                      <UserCircle2 className="size-24" />
                    </AvatarFallback>
                  </Avatar>

                  {profile.isEditing && (
                    <>
                      <Button
                        variant="default"
                        size="icon"
                        className="absolute bottom-0 right-0 size-7 z-10"
                        onClick={profile.triggerFileInput}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Input
                        type="file"
                        {...profile.register('file', {
                          onChange: profile.handleImageUpload,
                        })}
                        ref={(event) => {
                          profile.register('file').ref(event);
                          profile.fileInputRef.current = event;
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        style={{ bottom: '0', right: '0' }}
                        accept="image/*"
                      />
                    </>
                  )}
                </div>
                {profile.isEditing ? (
                  <Input
                    {...profile.register('name')}
                    className="font-bold text-xl"
                    helperText={profile.errors.name?.message}
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
                    <>
                      {!profile.isPending && <Check className="size-5" />}
                      {profile.isPending && <Spinner size="sm" />}
                    </>
                  )
                ) : (
                  <Edit2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className=" flex flex-col justify-start gap-10">
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-500" />
                <p className="text-gray-700">{profile.client.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-gray-500" />
                {profile.isEditing ? (
                  <Input
                    type="tel"
                    {...profile.register('phoneNumber', {
                      onChange: profile.handlePhoneMask,
                    })}
                    placeholder="42988887777"
                    helperText={profile.errors.phoneNumber?.message}
                  />
                ) : (
                  <p className="text-gray-700">
                    {phoneMask(profile.client.phoneNumber)}
                  </p>
                )}
              </div>
            </div>

            <div className="text-left">
              <button
                type="button"
                onClick={profile.handleDeleteClientButtonClick}
                className={`inline-flex mt-8 items-center bg-error hover:bg-error text-paper justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border border-error h-10 px-4 py-2`}
              >
                Deletar Barbearia
              </button>
            </div>
          </div>
        )}
      </div>
      <Dialog open={profile.isConfirmDeleteClientDialogOpen}>
        <DialogContent className="bg-paper">
          <DialogHeader>
            <DialogTitle className="text-error">Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir essa barbearia
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={profile.handleCloseDeleteDialog}>
              Cancelar
            </Button>
            <Button
              className="bg-error hover:bg-error text-paper"
              onClick={profile.handleConfirmClientDelete}
            >
              {profile.isDeleteClientPending ? (
                <Spinner size="sm" />
              ) : (
                'Confirmar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
