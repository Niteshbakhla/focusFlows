import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";


import {
            Dialog,
            DialogContent,
            DialogHeader,
            DialogTitle,
            DialogTrigger,
} from "../../../components/ui/dialog";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useState } from "react";
import { createTask, fetchTasks } from "../../../api/task";
import TaskItem from "../../../components/TaskItem";

export function TasksPage() {
            const queryClient = useQueryClient();

            // ✅ Fetch tasks
            const { data, isPending, error } = useQuery({
                        queryKey: ["tasks"],
                        queryFn: fetchTasks,
            });

            // ✅ Modal state
            const [open, setOpen] = useState(false);
            const [title, setTitle] = useState("");
            const [description, setDescription] = useState("");

            // ✅ Create task mutation
            const mutation = useMutation({
                        mutationFn: createTask,
                        onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["tasks"] });
                                    setOpen(false); // close modal
                                    setTitle("");
                                    setDescription("");
                        },
            });

            const handleSubmit = (e: { preventDefault: () => void; }) => {
                        e.preventDefault();
                        mutation.mutate({ title, description });
            };

            return (
                        <div className="w-full p-4">
                                    <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>

                                    {/* ✅ Add Task Modal */}
                                    <Dialog open={open} onOpenChange={setOpen}>
                                                <DialogTrigger asChild>
                                                            <Button className="mb-6">+ Add Task</Button>
                                                </DialogTrigger>

                                                <DialogContent>
                                                            <DialogHeader>
                                                                        <DialogTitle>Add New Task</DialogTitle>
                                                            </DialogHeader>

                                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                                        <div>
                                                                                    <Label className="mb-2">Title</Label>
                                                                                    <Input
                                                                                                value={title}
                                                                                                onChange={(e) => setTitle(e.target.value)}
                                                                                                placeholder="Task title"
                                                                                    />
                                                                        </div>

                                                                        <div>
                                                                                    <Label className="mb-2">Description</Label>
                                                                                    <Input
                                                                                                value={description}
                                                                                                onChange={(e) => setDescription(e.target.value)}
                                                                                                placeholder="Task description"
                                                                                    />
                                                                        </div>

                                                                        {mutation.isError && (
                                                                                    <p className="text-red-500">Failed to create task</p>
                                                                        )}

                                                                        <Button className="w-full" disabled={mutation.isPending}>
                                                                                    {mutation.isPending ? "Adding..." : "Add Task"}
                                                                        </Button>
                                                            </form>
                                                </DialogContent>
                                    </Dialog>

                                    {/* ✅ Loading */}
                                    {isPending && <p>Loading tasks...</p>}

                                    {/* ✅ Error */}
                                    {error && <p className="text-red-500">Failed to load tasks</p>}

                                    {/* ✅ Task List */}
                                    <div className="space-y-4">
                                                {data?.tasks?.map((task: any) => (
                                                            <TaskItem key={task._id} task={task} />
                                                ))}
                                    </div>
                        </div>
            );
}
