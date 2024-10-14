export type ContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showPassword: boolean;
  setShowPassword: (tab: boolean) => void;
  togglePasswordVisibility: () => void;
}
