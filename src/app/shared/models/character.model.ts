import { Origin } from "./originCharacter.model";
import { Location } from "./locationCharacter.model";

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    image: string;
    url: string;

    episode: string[];
    location: Location;
    origin: Origin;
}