import * as repository from '../repositories/moto.repository.js';
import type { MotoInput } from '../repositories/moto.repository.js';

export const createMoto = (input: MotoInput) => repository.create(input);
export const updateMoto = (id: number, input: Partial<MotoInput>) => repository.update(id, input);
export const listMotos = (filters: repository.MotoFilters) => repository.list(filters);
