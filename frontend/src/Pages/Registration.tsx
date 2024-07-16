import React from 'react';
import {
  Button,
  Container,
  TextInput,
  Group,
  Title,
  Paper,
  PasswordInput,
  Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Confirm Password is required'),
});

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: any) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', {
        username: data.email,
        password: data.password,
      });

      // Handle success, e.g., navigate to a different page or show a success message
      console.log('Registration successful:', response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Registration failed:', "error occured");
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Register</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(handleRegister)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message}
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
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            required
            mt="md"
          />
          <Group position="apart" mt="md">
            <Button type="submit">Register</Button>
          </Group>
        </form>
        <Text align="center" mt="md">
          Already have an account?{' '}
          <Button variant="subtle" onClick={handleNavigateToLogin}>
            Login
          </Button>
        </Text>
      </Paper>
    </Container>
  );
};

export default Registration;
