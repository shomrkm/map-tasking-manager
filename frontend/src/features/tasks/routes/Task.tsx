import { useParams } from 'react-router-dom';

import { Avatar } from '@/components/Avatar';
import { Spinner, TaskStatusBadge, LevelBadge, PriorityBadge } from '@/components/Elements';
import { Map } from '@/components/Map';
import { Comments } from '@/features/comments/';

import { useTask } from '../api/getTask';
import { MapTargets } from '../components/MapTargets';

export const Task = () => {
  const { taskId } = useParams();

  const taskQuery = useTask({ taskId: taskId as string });

  if (taskQuery.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner className="w-32 h-32" />
      </div>
    );
  }

  if (!taskQuery.data) {
    return <div>No Tasks</div>;
  }

  return (
    <>
      <div className="overflow-y-scroll flex-col flex-wrap m-4 space-y-4">
        <h1 className="text-2xl font-bold text-gray-700">{`#${taskQuery.data.id} ${taskQuery.data.title}`}</h1>
        <div className="flex w-full bg-white shadow-sm">
          <div className="flex-col flex-1 p-4 ml-4 space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center p-4 mb-2 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="col-span-1 text-base text-gray-700">Status</h3>
              <div className="col-span-2">
                <TaskStatusBadge status={taskQuery.data.status} />
              </div>
              <h3 className="col-span-1 text-base text-gray-700">Level</h3>
              <div className="col-span-2">
                <LevelBadge level={taskQuery.data.level} />
              </div>
              <h3 className="col-span-1 text-base text-gray-700">Priority</h3>
              <div className="col-span-2">
                <PriorityBadge priority={taskQuery.data.priority} />
              </div>
              <h3 className="col-span-1 text-base text-gray-700">Target</h3>
              <div className="col-span-2">
                <MapTargets targets={taskQuery.data.target} />
              </div>
              <h3 className="col-span-1 text-base text-gray-700">Assigned User</h3>
              <div className="col-span-2 justify-items-center items-center">
                <div className="flex gap-2 justify-start">
                  {taskQuery.data.assignedUsers.map((user) => (
                    <Avatar key={user._id} name={user.name} avatar={user.avatar} />
                  ))}
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-700 prose">Description</h2>
            <p className="text-base">{taskQuery.data.description}</p>
            <h2 className="text-xl font-bold text-gray-700 prose">Detail</h2>
            <div className="overflow-hidden">
              <p className="text-base">{taskQuery.data.detail}</p>
            </div>
          </div>
          <Map
            zoom={14}
            center={[39.6987, 141.1378]}
            data={taskQuery.data.area.coordinates}
            className="hidden lg:flex justify-center w-[40rem] h-[40rem] align-middle"
          />
        </div>
        <div className="h-96 bg-gray-100">
          <Comments taskId={taskQuery.data._id} />
        </div>
      </div>
    </>
  );
};
