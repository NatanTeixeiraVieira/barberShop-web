export type AppContextType = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  //React.Dispatch:  É um tipo que representa uma função que aceita um valor (ou uma função) como argumento e, em seguida, executa essa ação.
  // <React.SetStateAction<string>>: É um tipo que pode ser usado para atualizar o estado. Pode ser um valor direto ou uma função que recebe o estado atual e retorna o novo estado.
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  togglePasswordVisibility: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
};
