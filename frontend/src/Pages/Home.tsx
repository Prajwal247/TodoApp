import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Text,
  TextInput,
  Pagination,
  Box
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';


import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';


import TaskModal from '../Components/Model';
import HeaderComponent from '../Components/Header';
import TaskListComponent from '../Components/TaskList';

import { useAuth } from '../Context/Auth';
import axios from 'axios';

interface Task {
  id: string;
	title: string;
	summary: string;
  }
// App Component
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [opened, setOpened] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [itemperPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedItem, setPaginatedItem] = useState<Task[]>([]);
  const [tasksPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTask, setCurrentTask] = useState<Task>({ title: '', summary: '', id:'' })
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setTotalPages(Math.ceil(tasks.length / itemperPage)); 
    setPaginatedItem(tasks.slice(currentPage, currentPage + 5))
  },[tasks])

  useEffect(() => {
    let filteredTasks:any =  tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredTasks.length / itemperPage)); 
    setPaginatedItem(filteredTasks.slice(currentPage, currentPage + 5))

  },[searchTerm])

  useEffect(() => {
	if(!isAuthenticated){
		navigate('/login')
	}
  },[isAuthenticated])

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const fetchTodos = async() =>{
    try {
      const response = await axios.get('http://127.0.0.1:8000/todos/');
      setTasks(response.data)      
    } catch (error) {
      console.error('Login error:', 'Invalid Credentials');
    }  
  }
  useEffect(() => {
    fetchTodos()
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  
  const createTask = async(title: string, summary: string, isNew: boolean) => {
	if(isNew){
    try {
      const response = await axios.post('http://127.0.0.1:8000/todos/', { title, summary }); 
       if(response.status == 200){
        let id = response.data.id;
        const newTask = { title, summary, id };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
       }
    } catch (error) {
      console.error('Create todo error:', 'Invalid Credentials');
    }  
		
	}else{
    let id = currentTask.id;
      const index = tasks.findIndex(todo => todo.id === id);
      const updatedTasks = tasks;
      updatedTasks[index] = {title, summary, id};
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setTotalPages(Math.ceil(updatedTasks.length / itemperPage)); 
      setPaginatedItem(updatedTasks.slice(currentPage, currentPage + 5))
		  setCurrentTask({ title: '', summary: '',id:'' })

	}
	setOpened(false);
  };

  const deleteTask = async(index: string) => {
    const response = await axios.delete(`http://127.0.0.1:8000/todos/${index}`); 
       if(response.status == 200){
        const clonedTasks = [...tasks];
        let todos = clonedTasks.filter(todo => todo.id !== index);
        setTasks(todos);
        saveTasks(todos);
       }
  };

  const editTask = (index:number) => {
	const clonedTasks = [...tasks]
	setCurrentTask(clonedTasks[index])
	setOpened(true)
  }

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;


  const handleLogout = () => {
    console.log('Logging out...');
    logout();
  };

  const handlePagination = (e:any) => {
    const startIndex = (e - 1) * 5;
    setPaginatedItem(tasks.slice(startIndex, startIndex + 5))
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, defaultRadius: 'md' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className="App">
          <TaskModal
            opened={opened}
			task={currentTask}
            onClose={() => setOpened(false)}
            onCreate={createTask}
          />
          <Container size={550} my={40}>
            <HeaderComponent onLogout={handleLogout} />
            <Button onClick={() => setOpened(true)} fullWidth mt={'md'}>
              New Task
            </Button>
            <TextInput
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              variant="filled"
              size="sm"
              style={{ width: '100%' }}
              mt="md"
            />
            {paginatedItem.length > 0 ? (
				<>
              	<TaskListComponent tasks={paginatedItem} onDelete={deleteTask} onEdit={editTask}/>
				  <Box mt={20}>
			  	<Pagination total={totalPages} siblings={1} onChange={(e) => handlePagination(e)}/>
	            </Box>
				</>
            ) : (
              <Text size={'lg'} mt={'md'} color={'dimmed'}>
                No tasks found
              </Text>
            )}
            
          </Container>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
