import { Text } from '@react-pdf/renderer';

function Terms({ children }) {
  return (
    <div>
      <Text>Syarat dan Ketentuan:</Text>
      {children}
    </div>
  );
}

function Event() {
  return (
    <div>
      <Text>
        1. Pengguna/peminjam bersedia/wajib menjaga kebersihan ruangan baik saat
        dan sesudah selesai dipakai.
      </Text>
      <Text>
        2. Pengguna/peminjam dilarang merusak dan membuat kericuhan pada
        fasilitas ruangan yang sedang dipakai.
      </Text>
      <Text>
        3. Apabila terjadi kerusakan dan atau kehilangan fasilitas yang ada,
        maka pengguna/peminjam bisa langsung melakukan koordinasi dengan
        pengelola ruangan.
      </Text>
      <Text>
        4. Pengguna/peminjam dilarang memindahkan tangan atau meminjamkan
        fasilitas kepada pihak lain tanpa seizin pengelola.
      </Text>
      <Text>
        5. Setelah menggunakan ruangan wajib merapikan kembali kursi dan
        peralatan lain yang digunakan
      </Text>
      <Text>
        6. Mematikan dan memastikan seluruh peralatan elektrik seperti lampu,
        ac, dan alat-alat elektrik lain yang digunakan sudah tidak menyala.
      </Text>
      <Text>
        7. Apabila dari pihak pengelola menentukan/me-reschedule jadwal ruangan
        yang sudah ditentukan sebelumnya diharapkan peminjam/pengguna bisa
        menerima untuk menentukan jadwal kembali.
      </Text>
      <Text>
        8. Sanksi diberlakukan bagi yang tidak mematuhi ketentuan peminjaman.
      </Text>
    </div>
  );
}

function Car() {
  return (
    <div>
      <Text>
        1. Pengguna/peminjam bersedia/wajib menjaga kebersihan kendaraan baik
        saat dan sesudah selesai dipakai.
      </Text>
      <Text>
        2. Sebelum menggunakan kendaraan yang ingin dipinjam sebisa mungkin
        diperiksa terlebih dahulu.
      </Text>
      <Text>
        3. Apabila kendaraan mengalami kerusakan, peminjam wajib melapor kepada
        penganggung jawab kendaraan.
      </Text>
      <Text>
        4. Setelah selesai menggunakan kendaraan, wajib mengembalikan kunci.
        Kunci tidak dibawa pulang, tidak disimpan secara pribadi.
      </Text>
      <Text>5. Sebelum dipakai dipanaskan terlebih dahulu.</Text>
      <Text>
        6. Pemakai wajib mengontrol kendaraan dinas sebelum/sesudah dipakai.
      </Text>
      <Text>
        7. Peminjaman kendaraan hanya diperuntukkan untuk kegiatan yang
        menyangkut kedinasan.
      </Text>
      <Text>
        8. Apabila dari pihak pengelola menentukan/me-reschedule peminjaman
        kendaraan yang sudah ditentukan sebelumnya diharapkan peminjam/pengguna
        bisa menerima untuk menentukan jadwal kembali.
      </Text>
      <Text>
        9. Sanksi diberlakukan bagi yang tidak mematuhi ketentuan peminjaman.
      </Text>
    </div>
  );
}

Terms.Event = Event;
Terms.Car = Car;

export default Terms;
