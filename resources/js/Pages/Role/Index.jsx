import Table from '@/Components/Table';
import MainLayout from '@/Layouts/MainLayout';

export default function Index({ roles }) {
  const cols = ['ID', 'Role'];
  const rows = roles?.map((role) => [role.id, role.name]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 space-y-5">
            <h1 className="text-xl">Roles</h1>

            <Table cols={cols} rows={rows} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
