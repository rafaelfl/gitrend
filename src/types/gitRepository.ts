export interface GitRepository {
    id: string;
    name: string;
    fullName: string;
    isPrivate: boolean;
    htmlUrl: string;
    description: string;
    language: string;
    forksCount: number;
    starsCount: number;
    isFavorite: boolean;
}
