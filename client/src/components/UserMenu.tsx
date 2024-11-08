// src/components/UserMenu.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOutIcon } from 'lucide-react'; // O el icono que prefieras
import { UserInfo } from '@/types';

interface UserMenuProps {
  user: UserInfo;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer'>
          <Avatar>
            <AvatarImage src='' alt='User Profile' />
            <AvatarFallback>{user.nombre[0]}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      {/* Contenido del Dropdown */}
      <DropdownMenuContent className='w-56 p-2 bg-white border border-gray-200 rounded-lg shadow-md'>
        <DropdownMenuLabel className='font-semibold'>
          {user.nombre}
          <h5 className='text-xs text-muted-foreground'>{user.email}</h5>
        </DropdownMenuLabel>
        <DropdownMenuItem className='text-sm text-muted-foreground'>
          {user.rol}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className='text-red-600 hover:bg-red-50'
        >
          <LogOutIcon className='mr-2' />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
