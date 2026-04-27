export interface Actividad {
	id?: string;
	nombre: string;
	bac: number;
	porcentajeAvancePlanificado: number;
	porcentajeAvanceReal: number;
	costoActual: number;
	proyectoId: string;
	proyecto?: {
		id: string;
		nombre: string;
		descripcion?: string;
	};
}
