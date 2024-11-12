import RootLayout from '@/layouts/RootLayout';
import { MaxWidthWrapper, DataChart } from '@/components';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/contexts/UserContext';
import { CalendarCheck2, ClipboardList } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logo } from '@/assets/images';
import { Production, UsersInfo } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  getUsers,
  getTotalCows,
  getProduction,
  getTotalUsers,
  toggleUserStatus,
} from '@/API/services/index';
import StatusButton from '@/components/StatusButton';

function Dashboard() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<UsersInfo[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalCows, setTotalCows] = useState<number>(0);
  const [production, setProduction] = useState<Production>({
    daily: 0,
    monthly: 0,
    yearly: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersData, totalUsersData, totalCowsData, productionData] =
          await Promise.all([
            getUsers(),
            getTotalUsers(),
            getTotalCows(),
            getProduction(),
          ]);

        setUsers(usersData);
        setTotalUsers(totalUsersData);
        setTotalCows(totalCowsData);
        setProduction(productionData);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await toggleUserStatus(userId, currentStatus);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id_usuario === userId
            ? { ...user, estado: !currentStatus }
            : user
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  return (
    <RootLayout>
      <MaxWidthWrapper>
        {loading ? (
          <span className='flex justify-center items-center min-h-screen'>
            <l-helix />
          </span>
        ) : (
          <div className='my-6'>
            <h1 className='text-2xl font-bold my-6'>{`Panel De Control Del ${user.rol}`}</h1>

            <div className='flex flex-col gap-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                <Card className='w-full'>
                  <CardHeader className='flex flex-row justify-between items-center pb-2'>
                    <CardTitle className='font-medium'>
                      Número total de vacas{' '}
                    </CardTitle>
                    <ClipboardList />
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-semibold'>{`${totalCows} vacas`}</p>
                  </CardContent>
                </Card>

                <Card className='w-full'>
                  <CardHeader className='flex flex-row justify-between items-center pb-2'>
                    <CardTitle className='font-medium'>
                      Producción Diaria
                    </CardTitle>
                    <CalendarCheck2 />
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-semibold'>{`${production.daily} ml`}</p>
                  </CardContent>
                </Card>

                <Card className='w-full'>
                  <CardHeader className='flex flex-row justify-between items-center pb-2'>
                    <CardTitle className='font-medium'>
                      Producción Mensual
                    </CardTitle>
                    <CalendarCheck2 />
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-semibold'>{`${production.monthly} ml`}</p>
                  </CardContent>
                </Card>

                <Card className='w-full'>
                  <CardHeader className='flex flex-row justify-between items-center pb-2'>
                    <CardTitle className='font-medium'>
                      Producción Anual
                    </CardTitle>
                    <CalendarCheck2 />
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-semibold'>{`${production.yearly} ml`}</p>
                  </CardContent>
                </Card>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-7 gap-6 '>
                <Card className='w-full col-span-4'>
                  <CardHeader>
                    <CardTitle>Producción de Leche</CardTitle>
                    <CardDescription>producción por mes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataChart />
                  </CardContent>
                </Card>

                {user.rol !== 'Administrador' ? (
                  <div className='h-[450px] col-span-3 p-6'>
                    <img className='' src={logo} alt='vaca-logo' />
                  </div>
                ) : (
                  <Card className='w-full h-[450px] overflow-hidden col-span-3'>
                    <CardHeader>
                      <CardTitle>Control de usuarios</CardTitle>
                      <CardDescription>{`Existen ${totalUsers} usuarios en total`}</CardDescription>
                    </CardHeader>
                    <CardContent className='h-full overflow-y-auto p-4 custom-scrollbar'>
                      {users.map((member, index) => (
                        <Card
                          key={index}
                          className='mb-4 last:mb-0 border-none shadow-none p-0 '
                        >
                          <div className='flex items-center justify-between pb-4'>
                            <div className='flex items-center space-x-4'>
                              <Avatar>
                                <AvatarFallback>
                                  {member.nombre[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className='text-sm font-medium leading-none'>
                                  {member.nombre}
                                </CardTitle>
                                <CardDescription className='text-sm text-muted-foreground'>
                                  {member.email}
                                </CardDescription>
                              </div>
                            </div>
                            <StatusButton
                              userId={member.id_usuario}
                              currentStatus={member.estado}
                              onToggleStatus={handleToggleStatus}
                            />
                          </div>
                        </Card>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </RootLayout>
  );
}
export default Dashboard;
