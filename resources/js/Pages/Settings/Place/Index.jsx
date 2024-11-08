import Loader from '@/Components/Loader';
import Table from '@/Components/Table';
import MainLayout from '@/Layouts/MainLayout';
import { router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

import Links from '../Links';
import PrimaryButton from '@/Components/PrimaryButton';
import Form from './Form';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';

export default function Index() {
  const [page, setPage] = useState({
    data: [],
    showingForm: false,
    activeData: null,
  });

  const visitRef = useRef();

  const debounceVisitRef = useMemo(() => {
    return debounce(() => visitRef.current?.(), 500);
  }, []);

  const fetchPage = () => {
    router.reload({
      data: {},
      only: ['places'],
      onSuccess: ({ props }) =>
        setPage({
          ...page,
          data: props.places,
          showingForm: false,
          activeData: null,
        }),
    });
  };

  useEffect(() => {
    visitRef.current = fetchPage;
  }, [fetchPage]);

  useEffect(() => {
    debounceVisitRef();
  }, []);

  const openForm = (activeData) => {
    setPage({ ...page, showingForm: true, activeData });
  };

  const closeForm = () => {
    setPage({ ...page, showingForm: false, activeData: null });
  };

  const cols = ['Nama', 'Kapasitas', 'Catatan', ''];
  const rows = page.data.map((place) => [
    place.name,
    place.capacity,
    place.note,
    <Cog8ToothIcon
      className="h-4 cursor-pointer"
      onClick={() => openForm(place)}
    />,
  ]);
  return (
    <MainLayout>
      <MainLayout.Sidebar title="Pengaturan Tempat">
        <div>
          <PrimaryButton onClick={() => openForm()} className="py-1 text-xs">
            Tambah
          </PrimaryButton>
        </div>

        <Links />
      </MainLayout.Sidebar>

      <MainLayout.Content>
        {page.data.length ? <Table cols={cols} rows={rows} /> : <Loader />}

        {page.showingForm && (
          <Form
            active={page.showingForm}
            close={closeForm}
            activeData={page.activeData}
            reload={fetchPage}
          />
        )}
      </MainLayout.Content>
    </MainLayout>
  );
}
