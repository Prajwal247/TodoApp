import React from 'react';
import {
  Title,
  Group,
  Avatar,
  Menu,
  MenuItem,
} from '@mantine/core';
import { User } from 'tabler-icons-react';

const HeaderComponent: React.FC<{onLogout: () => void }> = ({
    onLogout,
  }) => {

  
    return (
      <Group position={'apart'}>
        <Title
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          My Tasks
        </Title>
        <Group>
        <Menu
          control={
            <Avatar size="sm" onClick={(e) => e.stopPropagation()}>
              <User size={20} />
            </Avatar>
          }
          position="bottom"
          zIndex={1000}
        >
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
        </Group>
      </Group>
    );
  };

  export default HeaderComponent;