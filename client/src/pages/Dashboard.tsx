import RootLayout from '@/layouts/Layout';
import { MaxWidthWrapper, DataChart } from '@/components';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/contexts/UserContext';
import { ChartBar, Clipboard } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
  Production,
  Users,
  getTotalUsers,
} from '@/API/services/apiService';
import { toggleUserStatus } from '@/helpers/toggleUserStatus';
import { logo } from '@/assets/images';

function Dashboard() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<Users[]>([]);
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
                  <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle>Número total de vacas </CardTitle>
                    <Clipboard />
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold'>{`${totalCows} vacas`}</p>
                  </CardContent>
                </Card>

                <Card className='w-full'>
                  <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle>Producción Diaria</CardTitle>
                    <ChartBar />
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold'>{`${production.daily} ml`}</p>
                  </CardContent>
                </Card>

                <Card className='w-full'>
                  <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle>Producción Mensual</CardTitle>
                    <ChartBar />
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold'>{`${production.monthly} ml`}</p>
                  </CardContent>
                </Card>

                <Card className='w-full'>
                  <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle>Producción Anual</CardTitle>
                    <ChartBar />
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold'>{`${production.yearly} ml`}</p>
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
                            <Button
                              onClick={() =>
                                handleToggleStatus(
                                  member.id_usuario,
                                  member.estado
                                )
                              }
                              className={`px-4 py-2 mt-2 text-white rounded ${
                                member.estado ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            >
                              {member.estado ? 'Activo' : 'Inactivo'}
                            </Button>
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
