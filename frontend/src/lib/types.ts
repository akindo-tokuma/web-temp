export type Job = {
    id: number
    jobTitle: string
    description: string
    location: string
    pay: string
    shift: string
    xmlOutputed: Date | null;
    csvOutputed: Date | null;
}