import toast from "react-hot-toast";

export type ToastType = "success" | "error" | "warning" | "info";

const useToast = () => {
  const showToast = (message: string, type: ToastType) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;

      default:
        toast.success(message);
        break;
    }
  };

  return { showToast };
};

export default useToast;
