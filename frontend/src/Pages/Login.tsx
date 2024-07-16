import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  TextInput,
  Group,
  Title,
  Paper,
  PasswordInput,
  Text,
  Alert
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../Context/Auth';
import axios from 'axios';

const schema = yup.object().shape({
  username: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const {isAuthenticated, login } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if(isAuthenticated){
      navigate('/')
    }
  },[])
  const handleLogin = async (data: any) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', data.username);
      formData.append('password', data.password);
  
      const response = await axios.post('http://127.0.0.1:8000/token', formData);
      console.log('Login success:', response.data);
      login(response.data.access_token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', 'Invalid Credentials');
      setLoginError('Login failed. Please try again.');
    }
  };

  const toRegistration = () => {
    navigate('/registration');
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Login</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...register('username')}
            error={errors.username?.message}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...register('password')}
            error={errors.password?.message}
            required
            mt="md"
          />
          <Group position="apart" mt="md">
            <Button type="submit">Login</Button>
          </Group>
        </form>
        {loginError && (
          <Alert color="red" mt="md">
            {loginError}
          </Alert>
        )}
        <Text align="center" mt="md">
          Don't have an account yet?{' '}
          <Button variant="subtle" onClick={toRegistration}>
            Register
          </Button>
        </Text>
      </Paper>
    </Container>
  );
};

export default Login;
