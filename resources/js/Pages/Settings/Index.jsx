import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';

import Links from './Links';

export default function Index() {
  const [] = useState('users');
  return (
    <MainLayout>
      <MainLayout.Sidebar title="Pengaturan">
        <Links />
      </MainLayout.Sidebar>

      <MainLayout.Content>
        <div>
          <div>Pilih salah satu menu di sebelah kiri</div>
        </div>
      </MainLayout.Content>
    </MainLayout>
  );
}
