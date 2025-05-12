import { spreadsheetUrl } from "@/lib/env";
import { Job } from "./types";

export const getAll = async () => {
    const res = await fetch(spreadsheetUrl);
    const data = await res.json();
    return data;
}

export const getById = async (id: string) => {
    const data = await getAll();
    const res=data.find((item: Job) => Number(item.id) === Number(id));
    return res;
}
