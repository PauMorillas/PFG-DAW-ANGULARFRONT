export interface Dominio {
  id?: number | null;
  dominio: string;
  descripcion?: string | null;
  activo?: boolean;
  negocioDTO?: { id: number | null };
}