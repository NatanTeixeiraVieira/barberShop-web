export const cepMask = (cep: string | undefined) => {
  if (!cep) return '';

  return cep
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d{1,3})/, '$1-$2');
};

export const phoneMask = (phone: string) => {
  console.log('🚀 ~ phoneMask ~ phone:', phone);
  if (!phone) return '';

  return phone
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1');
};

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d{2})(\d+?)/, '$1-$2');
};

export const removeMask = (value: string | undefined) => {
  if (!value) return value;

  return value.replace(/\D/g, '');
};
