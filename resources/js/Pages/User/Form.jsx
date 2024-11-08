import Combobox from '@/Components/Combobox';
import Delete from '@/Components/DeleteConfirmation';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import MainLayout from '@/Layouts/MainLayout';
import { Link, useForm } from '@inertiajs/react';
import { find } from 'lodash';

export default function Form({ roles, user }) {
  const { data, setData, transform, post, put, errors } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user ? find(roles, { id: user.role }) : roles[3],
  });

  const submit = (e) => {
    e.preventDefault();

    transform((data) => ({
      ...data,
      role: data.role.id,
    }));

    return user
      ? put(route('users.update', user.id))
      : post(route('users.store'));
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 space-y-10">
            <h1 className="text-xl">Tambah User</h1>

            <form onSubmit={submit}>
              <div className="w-full space-y-3">
                <div>
                  <InputLabel forinput="name" value="Nama" />
                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    className="w-full mt-2"
                  />
                  <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                  <InputLabel forinput="email" value="Login ID" />
                  <TextInput
                    id="email"
                    name="email"
                    value={data.email}
                    autoComplete="new-password"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    className="w-full mt-2"
                    placeholder="name@occupation"
                  />
                  <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                  <InputLabel forinput="password" value="Password" />
                  <TextInput
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="w-full mt-2"
                    type="password"
                    placeholder={
                      user && 'biarkan kosong jika tidak ganti password'
                    }
                  />
                  <InputError className="mt-2" message={errors.password} />
                </div>

                <div>
                  <InputLabel forinput="role" value="Role" />
                  <Combobox
                    value={data.role}
                    onChange={(value) => setData('role', value)}
                    options={roles}
                    className="w-full mt-2"
                  />
                  <InputError className="mt-2" message={errors.role} />
                </div>
              </div>

              <div className="mt-5 space-x-3">
                <Link href={route('users')}>
                  <SecondaryButton>Kembali</SecondaryButton>
                </Link>
                <PrimaryButton type="submit">Simpan</PrimaryButton>
              </div>
            </form>

            {user && (
              <Delete
                path="users.delete"
                id={user.id}
                textTitle="User"
                textConfirmation="Lanjutkan menghapus?"
                textNotes="Data akan terhapus secara permanen. Lanjutkan dengan hati-hati!"
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
