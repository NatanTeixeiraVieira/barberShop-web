export const cepMask = (cep: string) => {
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

export const phoneMask = (phone: string) => {
  return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
};
