export const cepMask = (cep: string) => {
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

export const phoneMask = (phone: string) => {
  return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
};

export const formatCnpj = (value: string) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
  value = value.replace(/(\d{4})(\d)/, "$1-$2");
  return value;
}

export const removeMask = (value: string) => {
  return value.replace(/\D/g, "");
}
