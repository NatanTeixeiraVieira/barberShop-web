import { useEffect, useRef, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { barberShopServiceCache } from '@/constants/requestCacheNames';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createBarberShopService,
  deleteBarberShopService,
  getBarberShopServicesByBarberShopId,
  updateBarberShopService,
} from '@/services/barberService';
import { useParams } from 'react-router-dom';
import {
  BarberShopService as BarberShopServiceType,
  BarberShopServicesList,
  CreateBarberShopService,
  UpdateBarberShopService,
  UpsertBarberShopService,
} from '@/types/barberService';
import { toast } from '@/hooks/useToast';
import Spinner from '@/components/Spinner';

type BarberShopServicesListOptionalId = Omit<BarberShopServiceType, 'id'> & {
  id?: string;
};

export default function BarberShopService() {
  const [services, setServices] = useState<BarberShopServicesListOptionalId[]>(
    [],
  );

  const { barberShopId } = useParams();

  const { data: barberShopService } = useQuery<BarberShopServicesList>({
    queryKey: [barberShopServiceCache],
    queryFn: async () =>
      (await getBarberShopServicesByBarberShopId(barberShopId!)).data,

    retry: false,
    refetchOnWindowFocus: false,
  });

  const {
    mutate: createBarberShopServiceMutatate,
    isPending: isCreateBarberShopServicePending,
  } = useMutation({
    mutationFn: async (dto: CreateBarberShopService) => {
      return (await createBarberShopService(dto)).data;
    },

    onSuccess: (data) => {
      setServices([...services, { ...data }]);
      handleCloseUpsertDialog();
    },

    onError: () => {
      toast({
        title: 'Falha ao atualizar serviço',
        className: 'h-20',
        variant: 'error',
      });
    },
  });

  const {
    mutate: updateBarberShopServiceMutatate,
    isPending: isUpdateBarberShopServicePending,
  } = useMutation({
    mutationFn: async (dto: UpdateBarberShopService) => {
      return (await updateBarberShopService(dto)).data;
    },

    onSuccess: (data) => {
      setServices(
        services.map((service) => (service.id === data.id ? data : service)),
      );
      handleCloseUpsertDialog();
    },

    onError: () => {
      toast({
        title: 'Falha ao atualizar serviço',
        className: 'h-20',
        variant: 'error',
      });
    },
  });

  const {
    mutate: deleteBarberShopServiceMutatate,
    isPending: isDeleteBarberShopServicePending,
  } = useMutation({
    mutationFn: async (barberServiceId: string) => {
      await deleteBarberShopService(barberServiceId);
    },

    onSuccess: () => {
      setServices(
        services.filter(
          (service) => service.id !== currentServiceUpdate.current?.id,
        ),
      );
      setIsDeleteDialogOpen(false);
      currentServiceUpdate.current = null;
    },

    onError: () => {
      toast({
        title: 'Falha ao deletar serviço',
        className: 'h-20',
        variant: 'error',
      });
    },
  });

  useEffect(() => {
    if (barberShopService) {
      setServices(barberShopService);
    }
  }, [barberShopService]);

  const [upsertingService, setUpsertingService] = useState<
    'update' | 'create' | null
  >(null);

  const currentServiceUpdate = useRef<BarberShopServicesListOptionalId | null>(
    null,
  );

  // const [deletingService, setDeletingService] =
  //   useState<BarberShopServicesListOptionalId | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAddService = (newService: CreateBarberShopService) => {
    createBarberShopServiceMutatate(newService);
  };

  const handleCloseUpsertDialog = () => {
    setUpsertingService(null);
    currentServiceUpdate.current = null;
  };

  const handleOpenUpdateDialog = (
    service: BarberShopServicesListOptionalId,
  ) => {
    currentServiceUpdate.current = service;
    setUpsertingService('update');
  };

  const handleOpenDeleteDialog = (
    service: BarberShopServicesListOptionalId,
  ) => {
    currentServiceUpdate.current = service;
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateService = (updatedService: UpdateBarberShopService) => {
    updateBarberShopServiceMutatate(updatedService);
  };

  const handleDeleteService = () => {
    if (currentServiceUpdate.current?.id) {
      deleteBarberShopServiceMutatate(currentServiceUpdate.current.id);
    }
  };

  return (
    <div className="p-4 flex justify-center">
      <Card className="w-full max-w-md bg-paper">
        <CardHeader>
          <h2 className="text-2xl font-bold">Serviços</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    R$ {service.price.toFixed(2)} • {service.duration} min
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleOpenUpdateDialog(service)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="bg-error text-paper"
                    onClick={() => handleOpenDeleteDialog(service)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Dialog open={upsertingService === 'create'}>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-sky-400 hover:bg-sky-500 text-paper"
                onClick={() => setUpsertingService('create')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Serviço
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-paper"
              onClose={handleCloseUpsertDialog}
            >
              <DialogHeader>
                <DialogTitle className="text-primary">
                  Adicionar Novo Serviço
                </DialogTitle>
              </DialogHeader>
              <ServiceForm
                isPenging={isCreateBarberShopServicePending}
                onSubmit={handleAddService}
                barberShopId={barberShopId!}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={upsertingService === 'update'}>
            <DialogContent
              className="bg-paper"
              onClose={handleCloseUpsertDialog}
            >
              <DialogHeader>
                <DialogTitle className="text-primary">
                  Editar Serviço
                </DialogTitle>
              </DialogHeader>
              <ServiceForm
                initialService={currentServiceUpdate.current}
                onSubmit={
                  handleUpdateService as (
                    service: UpsertBarberShopService,
                  ) => void
                }
                barberShopId={barberShopId!}
                isPenging={isUpdateBarberShopServicePending}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="bg-paper">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  Confirmar Exclusão
                </DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja excluir o serviço "
                  {currentServiceUpdate.current?.name}"?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-sky-400 hover:bg-sky-500 text-paper"
                  onClick={handleDeleteService}
                >
                  {isDeleteBarberShopServicePending ? (
                    <Spinner size="sm" />
                  ) : (
                    'Confirmar'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

interface ServiceFormProps {
  initialService?: BarberShopServicesListOptionalId | null;
  onSubmit: (
    service: CreateBarberShopService | UpdateBarberShopService,
  ) => void;
  barberShopId: string;
  isPenging: boolean;
}

function ServiceForm({
  initialService,
  onSubmit,
  barberShopId,
  isPenging,
}: ServiceFormProps) {
  const [name, setName] = useState(initialService?.name || '');
  const [price, setPrice] = useState(initialService?.price.toString() || '');
  const [duration, setDuration] = useState(
    initialService?.duration.toString() || '',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData: UpsertBarberShopService = {
      name,
      price: parseFloat(price),
      duration: parseInt(duration, 10),
      barberShopId,
    };

    if (initialService) {
      onSubmit({ ...serviceData, id: initialService.id });
      return;
    }

    onSubmit(serviceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Preço (R$)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="duration">Duração (minutos)</Label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-sky-400 hover:bg-sky-500 text-paper"
      >
        {isPenging && <Spinner size="sm" />}
        {!isPenging && (
          <>{initialService ? 'Atualizar' : 'Adicionar'} Serviço</>
        )}
      </Button>
    </form>
  );
}
