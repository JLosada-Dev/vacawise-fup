// src/services/generateReportServices.ts
import { toast } from '@/hooks/use-toast';

const URL_GENERAR_REPORTE = import.meta.env.VITE_URL_GENERAR_REPORTE;

export interface ReportResponse {
  numero_etiqueta: string;
  raza: string;
  registros: {
    fecha: string;
    tipo_registro: string;
    detalles: string;
    cantidad_leche: number;
    usuario: string;
    rol: string;
  }[];
}

/**
 * Obtiene el reporte de un bovino específico por su número de etiqueta
 * @param tagNumber - Número de etiqueta del bovino
 */
export async function fetchCowReport(
  tagNumber: string
): Promise<ReportResponse> {
  try {
    const response = await fetch(`${URL_GENERAR_REPORTE}/${tagNumber}`);

    if (!response.ok) {
      throw new Error(
        `Error al obtener el reporte. Estado: ${response.status}`
      );
    }

    const data = await response.json();

    toast({
      title: 'Reporte generado',
      description: `Reporte del bovino ${tagNumber} generado exitosamente.`,
      variant: 'success',
    });

    return data;
  } catch (error) {
    toast({
      title: 'Error al generar reporte',
      description:
        'No se pudo generar el reporte. Verifica el número de etiqueta e intenta nuevamente.',
      variant: 'destructive',
    });
    throw error;
  }
}
