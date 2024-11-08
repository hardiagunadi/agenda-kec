import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import { DateTime } from 'luxon';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

import Header from './Parts/Header';
import Terms from './Parts/Terms';
import Title from './Parts/Title';

/**
 * types: 1>place; 2>official; 3>car;
 */
export default function Receipt({ type = 2, schedule }) {
  const marginTop = '.5cm';
  const widthSpacer = '4.7cm';
  const widthColon = '.7cm';

  const { id, updated_at, start_at, end_at } = schedule;

  const day = DateTime.fromISO(updated_at).toFormat('cccc');
  const date = DateTime.fromISO(updated_at).toFormat('dd MMMM yyyy');
  const time = DateTime.fromISO(updated_at).toFormat('HH:mm');

  const startDate = DateTime.fromISO(start_at).toFormat('cccc, dd MMMM yyyy');
  const endDate = DateTime.fromISO(end_at).toFormat('cccc, dd MMMM yyyy');

  const startHour = DateTime.fromISO(start_at).toFormat('HH:mm');
  const endHour = DateTime.fromISO(end_at).toFormat('HH:mm');

  const [qrCode, setQrCode] = useState('/images/wonosobo.png');

  const [editUrl, setEditUrl] = useState(route('homepage'));

  useEffect(() => {
    if (type == 2) setEditUrl(route('public.editEventSchedule', id));
    if (type == 3) setEditUrl(route('public.editCarSchedule', id));
  }, []);

  useEffect(() => {
    let url;
    if (type == 2) url = route('public.editEventSchedule', id);
    if (type == 3) url = route('public.editCarSchedule', id);

    QRCode.toDataURL(url).then((data) => setQrCode(data));
  }, []);

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
          <Header />

          <Title type={type} />

          {/* Identitas */}
          <div style={{ marginTop }}>
            <Text>Yang tercatat di bawah ini</Text>

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

          {/* Kegiatan */}
          <div style={{ marginTop }}>
            <Text>
              Bahwa pada hari {day} tanggal {date} pukul {time}, Telah
              mengajukan permohonan Pinjam Pakai
              {type == 2 ? ' Ruangan' : ' Kendaraan Dinas'} melalui Aplikasi
              E-Agenda, untuk kegiatan:
            </Text>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>Deskrispi</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.description}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>
                {type == 2 ? 'Tempat' : 'Tujuan'}
              </Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.place}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer }}>
                {type == 3 && 'Dari '}Tanggal
              </Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{startDate}</Text>
            </div>
            {type == 3 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ width: widthSpacer }}>Sampai Tanggal</Text>
                <Text style={{ width: widthColon }}>:</Text>
                <Text>{endDate}</Text>
              </div>
            )}
          </div>

          {/* Persetujuan */}
          <div style={{ marginTop }}>
            <Text>
              Demikian bukti permohonan ini disampaikan untuk dapat digunakan
              sebagaimana mestinya.
            </Text>
          </div>

          {/* Syarat dan Ketentuan */}
          <div style={{ marginTop }}>
            <Terms>{type == 2 ? <Terms.Event /> : <Terms.Car />}</Terms>
          </div>

          {/* Links */}
          <div
            style={{
              paddingBottom: '0.5cm',
              marginTop,
              marginBottom: '0.5cm',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: '9pt',
                lineHeight: '1.5pt',
              }}
            >
              <div>
                <Image
                  src={qrCode}
                  style={{
                    height: '3cm',
                    width: '3cm',
                  }}
                ></Image>
                {/* <Link
                  style={{
                    fontSize: '8pt',
                  }}
                  src={editUrl}
                >
                  Ubah Permohonan
                </Link> */}
              </div>

              <div style={{ flex: '1', marginLeft: '20pt' }}>
                <Text>
                  Diterbitkan secara resmi oleh Bagian Umum Sekretariat Daerah
                  Kabupaten Wonosobo melalui aplikasi E-Agenda Bagian Umum.
                </Text>
                <Text>
                  Segala bentuk pemalsuan dokumen ini akan ditindaklanjuti
                  sesuai dengan prosedur yang berlaku.
                </Text>
              </div>
            </div>
          </div>
        </View>
      </Page>
    </Document>
  );
}
