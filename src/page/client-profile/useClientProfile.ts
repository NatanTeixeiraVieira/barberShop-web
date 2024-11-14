import { clientByIdCache } from '@/constants/requestCacheNames';
import { getLoggedClient, updateClientProfile } from '@/services/client';
import {
  Client,
  ClientProfileFormData,
  UpdateClientProfileDto,
} from '@/types/client';
import { phoneMask, removeMask } from '@/utils/mask';
import { clientProfileSchema } from '@/validations/schemas/clientProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [avatarImage, setAvatarImage] = useState('');

  const queryClient = useQueryClient();

  const { data: client, isFetching: isLoading } = useQuery<Client>({
    queryKey: [clientByIdCache],
    queryFn: async () => (await getLoggedClient()).data,

    retry: false,
    refetchOnWindowFocus: false,
  });
  console.log('🚀 ~ useClientProfile ~ client:', client);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ClientProfileFormData>({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
  });

  const {
    mutate: updateClientProfileMutate,
  } = useMutation({
    mutationFn: async (dto: UpdateClientProfileDto) => {
      await updateClientProfile(dto);
      return dto;
    },
    onSuccess: (_, variables) => {
      setIsEditing(false);
      queryClient.setQueryData<Client>([clientByIdCache], (previousCache) => {
        if (previousCache) {
          return {
            ...previousCache,
            ...variables,
          };
        }

        return previousCache;
      });
    },

    onError: () => {},
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (client) {
      setAvatarImage(client.photoUrl);
    }
  }, [client]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setClient((prev) => ({ ...prev, [name]: value }));
  // };

  const handlePhoneMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = phoneMask(e.target.value);
    setValue("phoneNumber", formattedPhone)
  }


  const submit = handleSubmit((data: ClientProfileFormData) => {

    data.phoneNumber = removeMask(getValues("phoneNumber"))
    updateClientProfileMutate({
      fileList: data.file,
      ...data,
    });
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      submit();
      return;
    }

    if (client) {
      Object.entries(client).forEach(([key, value]) => {
        setValue(key as keyof ClientProfileFormData, value?.toString() ?? '');
      });
    }

    setIsEditing(!isEditing);
  };

  const handleCancleEdit = () => {

    if (client) {
      Object.entries(client).forEach(([key, value]) => {
        setValue(key as keyof ClientProfileFormData, value?.toString() ?? '');
      });
    }

    setIsEditing(false);
    setAvatarImage('')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await fetch('/api/client-profile', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(client),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to save client information');
  //     }

  //     const data = await response.json();
  //     setClient(data);
  //     setIsEditing(false);
  //     toast({
  //       title: 'Success',
  //       description: 'Client information updated successfully.',
  //     });
  //   } catch (error) {
  //     console.error('Error saving client information:', error);
  //     toast({
  //       title: 'Error',
  //       description: 'Failed to update client information. Please try again.',
  //       variant: 'destructive',
  //     });
  //   } finally {
  //   }
  // };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setClient((prev) => ({ ...prev, photoUrl: reader.result as string }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatPhone = (phone: string) => {
    console.log('🚀 ~ formatPhone ~ phone:', phone);
    return phone?.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  };

  return {
    client,
    errors,
    isEditing,
    isLoading,
    avatarImage,
    fileInputRef,
    register,
    formatPhone,
    handlePhoneMask,
    triggerFileInput,
    handleCancleEdit,
    handleToggleEdit,
    handleImageUpload,
  };
};
