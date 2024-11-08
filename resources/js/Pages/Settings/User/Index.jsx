import Table from '@/Components/Table';
import MainLayout from '@/Layouts/MainLayout';
import {
  Cog8ToothIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import Links from '../Links';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ pagination }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(pagination.current);

  const [page, setPage] = useState({ ...pagination, data: [] });

  const [showingForm, setShowingForm] = useState(false);
  const [formData, setFormData] = useState(null);

  const visitRef = useRef();

  const openForm = (formData) => {
    setFormData(formData);
    setShowingForm(true);
  };

  const closeForm = () => {
    setShowingForm(false);
    setTimeout(() => {
      setFormData(null);
    }, 500);
  };

  const fetchPage = () => {
    router.reload({
      data: { search, page: currentPage },
      only: ['users'],
      onSuccess: ({ props }) => setPage({ ...page, data: props.users }),
    });
  };

  const debounceVisitRef = useMemo(() => {
    if (!currentPage) setCurrentPage(1);
    return debounce(() => visitRef.current?.(), 500);
  }, []);

  useEffect(() => {
    visitRef.current = fetchPage;
  }, [fetchPage]);

  useEffect(() => {
    debounceVisitRef();
  }, [search, currentPage]);

  const cols = ['Nama', 'Email', 'Role', ''];
  const rows = page.data?.map((user) => [
    user.name,
    user.email,
    user.role,
    <Link href={route('users.edit', user.id)}>
      <Cog8ToothIcon className="h-5" />
    </Link>,
  ]);

  return (
    <MainLayout>
      <MainLayout.Sidebar title="Pengaturan Pengguna">
        <div>
          <PrimaryButton onClick={() => openForm()} className="py-1 text-xs">
            Tambah
          </PrimaryButton>
        </div>

        <div className="inline-flex items-center w-full px-3 space-x-1 rounded bg-zinc-200 focus-within:ring-1 focus-within:ring-rose-700">
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="cari nama, email, role..."
            className="flex-1 px-0 text-sm border-none shadow-none focus:ring-transparent"
          />

          {search.length > 0 ? (
            <XMarkIcon
              className="h-4 cursor-pointer hover:text-rose-700"
              onClick={() => setSearch('')}
            />
          ) : (
            <MagnifyingGlassIcon className="h-4" />
          )}
        </div>

        <Links />
      </MainLayout.Sidebar>

      <MainLayout.Content>
        <Table cols={cols} rows={rows} />
      </MainLayout.Content>

      {/* {showingForm && (
        <Form
          active={showingForm}
          close={closeForm}
          formData={formData}
          reload={fetchPage}
        />
      )}
 */}
    </MainLayout>
  );
}
