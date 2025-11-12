import { api } from "./axios";

export async function fetchTasks() {
            const res = await api.get("/task");
            return res.data;
}


export async function createTask(data: { title: string; description: string }) {
            const res = await api.post("/task", data);
            return res.data;
}

export async function updateTask(taskId: string, data: { title: string; description: string }) {
            const res = await api.put(`/task/${taskId}`, data);
            return res.data;
}
