export type Task = {
    taskId: string;
    ownerId: string;
    firstName?: string;  // Optional, since it may not always be returned
    lastName?: string;   // Optional, since it may not always be returned
    title: string;
    description: string;
    isDone: boolean;
    date: string;
    isOwner: boolean;    // To indicate if the current user owns this task
  };
  