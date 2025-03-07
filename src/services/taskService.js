import {Task} from '../models/Task.js';
import {User} from '../models/User.js';

const TASKS_LIMIT = {
    free: 10,
    preminum: 100,
}

export const canCreateTask = async (userId) => {
    const user = await User.findOne({_id: userId});
    const maxTasks = TASKS_LIMIT[user.plan];
    const existingTasks = await Task.find({user: userId});

    return existingTasks.length < maxTasks;
}