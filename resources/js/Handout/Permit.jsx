import { Document, Page, Text, View } from '@react-pdf/renderer';
import { DateTime } from 'luxon';

import Header from './Parts/Header';

export default function Permit({ schedule }) {
  const marginTop = '.5cm';
  const widthSpacer = '4.7cm';
  const widthColon = '.7cm';

  const entryDay = DateTime.fromISO(schedule.updated_at).toFormat('cccc');
  const entryDate = DateTime.fromISO(schedule.updated_at).toFormat(
    'dd MMMM yyyy'
  );
  const entryHour = DateTime.fromISO(schedule.updated_at).toFormat('HH:mm');

  const day = DateTime.fromISO(schedule.start_at).toFormat(
    'cccc, dd MMMM yyyy'
  );
  const start = DateTime.fromISO(schedule.start_at).toFormat('HH:mm');
  const end = DateTime.fromISO(schedule.end_at).toFormat('HH:mm');

  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: 'row',
          fontSize: '10pt',
          lineHeight: '1.5pt',
        }}
      >
        <View
          style={{
            paddingTop: '1cm',
            paddingLeft: '2cm',
            paddingRight: '1.5cm',
            flexGrow: 1,
            fontFamily: 'Helvetica',
          }}
        >
          {/* kop */}
          <Header />

          {/* judul */}
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Helvetica-Bold',
                textTransform: 'uppercase',
              }}
            >
              Surat Ijin
            </Text>
            <Text
              style={{
                fontFamily: 'Helvetica-Bold',
                textTransform: 'uppercase',
                textDecoration: 'underline',
              }}
            >
              Penggunaan Gedung/Ruang Rapat
            </Text>
            <Text>
              Nomor:
              031/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/2023
            </Text>
          </div>

          {/* permohonan */}
          <div style={{ marginTop }}>
            <Text>
              Berdasarkan permohonan melalu aplikasi e-Agenda pada hari{' '}
              {entryDay} tanggal {entryDate} pukul {entryHour}.
            </Text>
          </div>

          {/* identitas */}
          <div style={{ marginTop }}>
            <Text>
              Dengan ini kami memberikan ijin penggunaan Gedung/Ruang Rapat
              kepada:
            </Text>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>Nama</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.customer}</Text>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>Kantor/Badan/Dinas</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.organization}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>Nomor Telepon</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.phone}</Text>
            </div>
          </div>

          <div style={{ marginTop }}>
            <Text>Sebagai penunjang kegiatan:</Text>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>Nama Kegiatan</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.description}</Text>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>Tempat</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.place}</Text>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>Hari, Tanggal</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{day}</Text>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>Pukul</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>
                {start} s.d. {end}
              </Text>
            </div>
          </div>

          <div style={{ marginTop }}>
            <Text>Syarat dan Ketentuan:</Text>

            <Text>
              1. Pengguna/peminjam bersedia/wajib menjaga kebersihan ruangan
              baik saat dan sesudah selesai dipakai.
            </Text>
            <Text>
              2. Pengguna/peminjam dilarang merusak dan membuat kericuhan pada
              fasilitas ruangan yang sedang dipakai.
            </Text>
            <Text>
              3. Apabila terjadi kerusakan dan atau kehilangan fasilitas yang
              ada, maka pengguna/peminjam bisa langsung melakukan koordinasi
              dengan pengelola ruangan.
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
              6. Mematikan dan memastikan seluruh peralatan elektrik seperti
              lampu, ac, dan alat-alat elektrik lain yang digunakan sudah tidak
              menyala.
            </Text>
            <Text>
              7. Apabila dari pihak pengelola menentukan/me-reschedule jadwal
              ruangan yang sudah ditentukan sebelumnya diharapkan
              peminjam/pengguna bisa menerima untuk menentukan jadwal kembali.
            </Text>
            <Text>
              8. Sanksi diberlakukan bagi yang tidak mematuhi ketentuan
              peminjaman.
            </Text>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                marginTop,
              }}
            >
              <div
                style={{ flexGrow: 1, textAlign: 'center', width: '100%' }}
              ></div>

              <div style={{ flexGrow: 1, textAlign: 'center', width: '100%' }}>
                <Text>An. SEKRETARIS DAERAH</Text>
                <Text>KABUPATEN WONOSOBO</Text>
                <Text>KEPALA BAGIAN UMUM</Text>
                <Text
                  style={{
                    marginTop: '0.5cm',
                  }}
                >
                  ttd.
                </Text>
                <Text
                  style={{
                    marginTop: '0.5cm',
                    fontFamily: 'Helvetica-Bold',
                    textDecoration: 'underline',
                  }}
                >
                  Drs. PRISWANTO WAHYUNUGROHO
                </Text>
                <Text>NIP. 197410131995031004</Text>
              </div>
            </div>
          </div>
        </View>
      </Page>
    </Document>
  );
}
