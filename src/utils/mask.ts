export const cepMask = (cep: string) => {
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

export const phoneMask = (phone: string) => {
  if (!phone) return '';

  return phone
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1');
};

export const formatCnpj = (value: string) => {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/, '$1.$2');
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
  value = value.replace(/(\d{4})(\d)/, '$1-$2');
  return value;
};

export const removeMask = (value: string | undefined) => {
  if (!value) return value;

  return value.replace(/\D/g, '');
};
