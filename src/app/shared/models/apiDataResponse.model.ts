import { Character } from "./character.model";

export interface ApiDataResponse {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string,
    };
    results: Character[];
}