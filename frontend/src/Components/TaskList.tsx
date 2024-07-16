import React from 'react';
import {
  Text,
  Group,
  Card,
  ActionIcon,
} from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';


interface Task {
    title: string;
    summary: string;
    id: string;
  }

const TaskListComponent: React.FC<{ tasks: Task[]; onDelete: (index: string) => void; onEdit: (inde:number) => void }> = ({
    tasks,
    onDelete,
    onEdit,
  }) => {
    return (
      <>
        {tasks.map((task, index) => (
          <Card withBorder key={index} mt={'sm'}>
            <Group position={'apart'}>
              <Text weight={'bold'}>{task.title}</Text>
              <Group>
              <ActionIcon
                onClick={() => {
                  onEdit(index);
                }}
                color={'green'}
                variant={'transparent'}
              >
                <Edit />
              </ActionIcon>
              <ActionIcon
                onClick={() => {
                  onDelete(task.id);
                }}
                color={'red'}
                variant={'transparent'}
              >
                <Trash />
              </ActionIcon>
              </Group>
            </Group>
            <Text color={'dimmed'} size={'md'} mt={'sm'}>
              {task.summary ? task.summary : 'No summary was provided for this task'}
            </Text>
          </Card>
        ))}
      </>
    );
  };

export default TaskListComponent;