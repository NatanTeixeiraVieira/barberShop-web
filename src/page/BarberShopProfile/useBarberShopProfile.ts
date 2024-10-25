import { useState, useRef } from 'react';

export const useBarberShopProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [barberShop, setBarberShop] = useState({
    name: 'Stylish Cuts Barber Shop',
    cnpj: '12345678901234',
    cep: '12345678',
    street: 'Main Street',
    number: '123',
    neighborhood: 'Downtown',
    city: 'Metropolis',
    state: 'ST',
    phone: '5551234567',
    photoUrl: '/placeholder.svg?height=200&width=200',
    rating: 4.5,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBarberShop((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBarberShop((prev) => ({
          ...prev,
          photoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateBarberShopInfos = () => {};

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5',
    );
  };

  const formatCEP = (cep: string) => {
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  };

  return {
    barberShop,
    isEditing,
    fileInputRef,
    handleInputChange,
    toggleEdit,
    handleImageUpload,
    triggerFileInput,
    formatCNPJ,
    formatCEP,
    formatPhone,
  };
};
