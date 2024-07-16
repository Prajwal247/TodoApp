import React, { useRef } from 'react';
import {
  Button,
  Modal,
  TextInput,
  Group,
} from '@mantine/core';

interface Task {
  title: string;
  summary: string;
}

const TaskModal: React.FC<{
  opened: boolean;
  task: Task;
  onClose: () => void;
  onCreate: (title: string, summary: string, isNew: boolean) => void;
}> = ({ opened, task, onClose, onCreate }) => {
  const taskTitle = useRef<HTMLInputElement>(null);
  const taskSummary = useRef<HTMLInputElement>(null);

  const handleCreateTask = () => {
    const title = taskTitle.current?.value || '';
    const summary = taskSummary.current?.value || '';
    
    const isNew = task.title?false:true;
    onCreate(title, summary, isNew);
  };

  return (
    <Modal
      opened={opened}
      size={'md'}
      title={task.title!==''?'Edit Taks':'New Task'}
      withCloseButton={false}
      onClose={onClose}
      centered
    >
      <TextInput
        mt={'md'}
        ref={taskTitle}
        placeholder={'Task Title'}
        required
        label={'Title'}
        defaultValue={task.title} // Set default value from task prop
      />
      <TextInput
        ref={taskSummary}
        mt={'md'}
        placeholder={'Task Summary'}
        label={'Summary'}
        defaultValue={task.summary} // Set default value from task prop
      />
      <Group mt={'md'} position={'apart'}>
        <Button onClick={onClose} variant={'subtle'}>
          Cancel
        </Button>
        <Button onClick={handleCreateTask}>{task.title !== ""?'Edit Task':'Create Task'}</Button>
      </Group>
    </Modal>
  );
};

export default TaskModal;
