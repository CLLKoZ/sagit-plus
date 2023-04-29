import { toast } from "react-toastify";
import { getCSV } from "./map";
import { printCSV } from "./utilidades";

export const downloadCSV = (evaluation, form) =>{
    if (form) {
      const CSV = getCSV(evaluation, form);
      printCSV(CSV);
    } else {
      toast.warning('Seleccione un formulario', {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {background: '#0f1f52'}
      });
    }
  }
  