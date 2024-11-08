import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import { DateTime } from 'luxon';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export default function Receipt({ schedule }) {
  const marginTop = '.5cm';
  const widthSpacer1 = '4cm';
  const widthSpacer2 = '4.7cm';
  const widthColon = '.7cm';

  const [qrCode, setQrCode] = useState('/images/wonosobo.png');

  useEffect(() => {
    QRCode.toDataURL(route('public.editCarSchedule', schedule.id), {
      margin: 2,
      width: 80,
    }).then((data) => {
      setQrCode(data);
    });
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
          {/* header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottom: 1,
              paddingBottom: '0.5cm',
              marginBottom: '0.5cm',
            }}
          >
            <Image
              src="/images/wonosobo.png"
              style={{
                height: '2cm',
                width: '1.8cm',
              }}
            ></Image>
            <div
              style={{
                textAlign: 'center',
                flex: '1',
                lineHeight: '1.25pt',
              }}
            >
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: '12pt',
                  fontWeight: 'bold',
                  fontFamily: 'Times-Bold',
                }}
              >
                Pemerintah Kabupaten Wonosobo
              </Text>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  fontFamily: 'Times-Bold',
                }}
              >
                Sekretariat Daerah
              </Text>
              <Text style={{ fontFamily: 'Times-Roman' }}>
                Jalan Soekarno-Hatta Nomor 2-4 Wonosobo Telepon (0286) 321345
              </Text>
              <Text style={{ fontFamily: 'Times-Roman' }}>
                Fax (0286) 321183 Website wonosobo.go.id Kode Pos 56311
              </Text>
            </div>
          </div>

          {/* header */}
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
              Bukti Pengajuan Permohonan
            </Text>
            <Text
              style={{
                fontFamily: 'Helvetica-Bold',
                textTransform: 'uppercase',
                textDecoration: 'underline',
              }}
            >
              Pinjam Pakai Gedung
            </Text>
          </div>

          {/* Identitas */}
          <div style={{ marginTop }}>
            <Text>Bahwa pada tanggal ...,</Text>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Nama</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.customer}</Text>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Kantor/Badan/Dinas</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.organization}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Nomor Telepon</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.phone}</Text>
            </div>
          </div>

          {/* Kegiatan */}
          <div style={{ marginTop }}>
            <Text>
              Telah mengajukan permohonan Pinjam Pakai Kendaraan Dinas melalui
              Aplikasi E-Agenda, untuk menunjang kelancaran kegiatan
              Operasional:
            </Text>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Deskrispi</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.description}</Text>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Tujuan</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.place}</Text>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Dari Tanggal</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>
                {DateTime.fromISO(schedule.time).toFormat('cccc, dd MMMM yyyy')}
              </Text>
            </div>
          </div>

          {/* Persetujuan */}
          <div style={{ marginTop }}>
            <Text>...</Text>
          </div>

          {/* Links */}
          <div
            style={{
              paddingBottom: '0.5cm',
              marginBottom: '0.5cm',
            }}
          >
            <Image
              src={qrCode}
              style={{
                height: '80px',
                width: '80px',
              }}
            ></Image>
            <Text
              style={{
                fontSize: '8pt',
              }}
            >
              {route('public.editCarSchedule', schedule.id)}
            </Text>
          </div>
        </View>
      </Page>
    </Document>
  );
}
