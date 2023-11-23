import { Categoria } from "./categoria.models";

export interface Anime{
    animeId? : number;
    nome : string;
    genero : string;
    nota : number;
    episodios : number;
    categoriaId : number;
    categoria ?: Categoria;
}