import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { updateTask } from "../api/task";

export default function TaskItem({ task }: { task: any }) {
            const queryClient = useQueryClient();
            const [open, setOpen] = useState(false);
            const [title, setTitle] = useState(task.title);
            const [description, setDescription] = useState(task.description);
            
            const updateMutation = useMutation({
                        mutationFn: (data: any) => updateTask(task._id, data),
                        onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["tasks"] });
                                    setOpen(false);
                        }
            });

            return (
                        <div className="p-4 border rounded-lg flex justify-between items-center">

                                    {/* Task Text */}
                                    <div>
                                                <h3 className="font-semibold">{task.title}</h3>
                                                <p className="text-gray-600">{task.description}</p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3">

                                                {/* ✅ EDIT MODAL */}
                                                <Dialog open={open} onOpenChange={setOpen}>
                                                            <DialogTrigger asChild>
                                                                        <Button variant="secondary">Edit</Button>
                                                            </DialogTrigger>

                                                            <DialogContent>
                                                                        <DialogHeader>
                                                                                    <DialogTitle>Edit Task</DialogTitle>
                                                                        </DialogHeader>

                                                                        <form onSubmit={(e) => {
                                                                                    e.preventDefault();
                                                                                    updateMutation.mutate({ title, description });
                                                                        }} className="space-y-4">

                                                                                    <div>
                                                                                                <Label>Title</Label>
                                                                                                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                                                                                    </div>

                                                                                    <div>
                                                                                                <Label>Description</Label>
                                                                                                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                                                                                    </div>

                                                                                    <Button className="w-full" disabled={updateMutation.isPending}>
                                                                                                {updateMutation.isPending ? "Updating..." : "Update Task"}
                                                                                    </Button>
                                                                        </form>
                                                            </DialogContent>
                                                </Dialog>

                                                {/* ✅ SOON → DELETE BUTTON */}
                                                <Button variant="destructive">Delete</Button>

                                    </div>
                        </div>
            );
}
