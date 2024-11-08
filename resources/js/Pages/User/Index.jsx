import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import MainLayout from '@/Layouts/MainLayout';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import { Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Index({ users }) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const visitRef = useRef();

  const fetchPage = () => {
    router.reload({
      data: { search },
      only: ['users'],
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
    });
  };

  const debounceVisitRef = useMemo(() => {
    return debounce(() => visitRef.current?.(), 500);
  }, []);

  useEffect(() => {
    visitRef.current = fetchPage;
  }, [fetchPage]);

  useEffect(() => {
    debounceVisitRef();
  }, [search]);

  const cols = ['Nama', 'Email', 'Role', ''];
  const rows = users?.map((user) => [
    user.name,
    user.email,
    user.role,
    <Link href={route('users.edit', user.id)}>
      <Cog8ToothIcon className="h-5" />
    </Link>,
  ]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between space-y-5 px-3">
              <div className="flex flex-col md:flex-row items-center space-x-10">
                <h1 className="text-xl">Users</h1>

                <TextInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="cari..."
                  className="py-1 text-sm"
                />
              </div>

              <Link href={route('users.create')}>
                <PrimaryButton className="py-1 text-xs">Tambah</PrimaryButton>
              </Link>
            </div>

            {loading ? 'loading' : <Table cols={cols} rows={rows} />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
