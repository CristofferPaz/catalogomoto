export type ApiError = { error?: { codigo?: string; mensaje?: string; detalles?: unknown[] } };
export type ListResponse<T> = { data: T[]; total: number; filtros: Record<string, unknown> };
