import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { DateTime } from 'luxon';

/**
 * types: 1>place; 2>official; 3>car;
 */
export default function Handover({ type = 3, schedule, car }) {
  const marginTop = '.5cm';
  const widthSpacer1 = '4cm';
  const widthSpacer2 = '4.7cm';
  const widthColon = '.7cm';

  const day = DateTime.fromISO(schedule.updated_at).toFormat('cccc');
  const date = DateTime.fromISO(schedule.updated_at).toFormat('dd MMMM yyyy');

  return (
    <Document>
      <Page
        size="FOLIO"
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

          {/* content */}

          {/* title */}
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
              Berita Acara Serah Terima
            </Text>
            <Text
              style={{
                fontFamily: 'Helvetica-Bold',
                textTransform: 'uppercase',
                textDecoration: 'underline',
              }}
            >
              Pinjam Pakai Sementara Kendaraan Dinas
            </Text>
            <Text>
              Nomor: 511/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/2023
            </Text>
          </div>

          {/* pihak kesatu */}
          <div
            style={{
              marginTop,
            }}
          >
            <Text>
              Pada hari {day} tanggal {date}, telah diadakan serah terima pinjam
              pakai kendaraan antara:
            </Text>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '.7cm',
              }}
            >
              <Text style={{ width: widthSpacer1 }}>Nama</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text style={{ textTransform: 'uppercase' }}>Erfan</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '.7cm',
              }}
            >
              <Text style={{ width: widthSpacer1 }}>NIP</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>198302052009011003</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '.7cm',
              }}
            >
              <Text style={{ width: widthSpacer1 }}>Pangkat/Golongan</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>Pengatur Tk. I/II.d</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '.7cm',
              }}
            >
              <Text style={{ width: widthSpacer1 }}>Jabatan</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>Pengurus Barang Bagian Umum SETDA Wonosobo</Text>
            </div>
            <Text>
              Selanjutnya disebut{' '}
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  textTransform: 'uppercase',
                }}
              >
                Pihak Kesatu
              </Text>
            </Text>
          </div>

          {/* pihak kedua */}
          <div
            style={{
              marginTop,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '.7cm',
              }}
            >
              <Text style={{ width: widthSpacer1 }}>Nama</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text style={{ textTransform: 'uppercase' }}>
                {schedule.customer}
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '.7cm',
              }}
            >
              <Text style={{ width: widthSpacer1 }}>NIP</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>
                .........................................................
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '.7cm',
              }}
            >
              <Text style={{ width: widthSpacer1 }}>Pangkat/Golongan</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>
                .........................................................
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '.7cm',
              }}
            >
              <Text style={{ width: widthSpacer1 }}>Jabatan</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>
                .........................................................
              </Text>
            </div>
            <Text>
              Selanjutnya disebut{' '}
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  textTransform: 'uppercase',
                }}
              >
                Pihak Kedua
              </Text>
            </Text>
          </div>

          {/* kendaraan */}
          <div style={{ marginTop }}>
            <Text>
              Pihak Kesatu telah menyerahkan kepada Pihak Kedua, 1 (satu) unit
              Kendaraan Dinas Roda Empat dengan keterangan sebagai berikut:
            </Text>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop,
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Jenis Kendaraan</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>Kendaraan Bermotor Roda Empat</Text>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Merk/Type</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>
                {car.brand} - {car.type}
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Nomor Rangka</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{car.chassis_number}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Nomor Mesin</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{car.machine_number}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Warna</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{car.color}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Tahun Pembuatan</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{car.year}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Nomor Polisi</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{schedule.car}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Nomor BPKB</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>{car.doc_number}</Text>
            </div>
          </div>

          {/* kegiatan */}
          <div
            style={{
              marginTop,
            }}
          >
            <Text>Untuk menunjang kelancaran kegiatan Operasional:</Text>
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
              <Text style={{ width: widthSpacer2 }}>Acara</Text>
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
                {DateTime.fromISO(schedule.start_at).toFormat(
                  'cccc, dd MMMM yyyy'
                )}
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ width: widthSpacer2 }}>Sampai Tanggal</Text>
              <Text style={{ width: widthColon }}>:</Text>
              <Text>
                {DateTime.fromISO(schedule.end_at).toFormat(
                  'cccc, dd MMMM yyyy'
                )}
              </Text>
            </div>
          </div>

          <div style={{ marginTop }}>
            <Text>
              Dengan demikian segala tanggung jawab penggunaan, pemeliharaan,
              dan keamanan menjadi tanggung jawab Pihak Kedua.
            </Text>
            <Text>
              Demikian Berita Acara ini dibuat untuk dapat digunakan seperlunya.
            </Text>
          </div>

          {/* signature | tanda tangan */}
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                marginTop,
              }}
            >
              <div style={{ flexGrow: 1, textAlign: 'center', width: '100%' }}>
                <Text style={{ textTransform: 'uppercase' }}>Pihak Kedua</Text>
                <Text>Yang Menerima</Text>
                <Text
                  style={{
                    marginTop: '1.2cm',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    textTransform: 'uppercase',
                    fontFamily: 'Helvetica-Bold',
                  }}
                >
                  {schedule.customer}
                </Text>
                <Text>HP: {schedule.phone}</Text>
              </div>

              <div style={{ flexGrow: 1, textAlign: 'center', width: '100%' }}>
                <Text style={{ textTransform: 'uppercase' }}>Pihak Kesatu</Text>
                <Text>Pengurus Kendaraan Dinas</Text>
                <Text
                  style={{
                    marginTop: '1.2cm',
                    fontFamily: 'Helvetica-Bold',
                    textDecoration: 'underline',
                    textTransform: 'uppercase',
                  }}
                >
                  Erfan
                </Text>
                <Text>NIP. 198302052009011003</Text>
              </div>
            </div>

            <div
              style={{
                flexGrow: 1,
                textAlign: 'center',
                width: '100%',
                marginTop,
              }}
            >
              <Text style={{ textTransform: 'uppercase' }}>Mengetahui</Text>
              <Text style={{ textTransform: 'uppercase' }}>
                Kepala Bagian Umum Setda
              </Text>
              <Text
                style={{
                  marginTop: '1.4cm',
                  fontFamily: 'Helvetica-Bold',
                  textDecoration: 'underline',
                }}
              >
                Drs. PRISWANTO WAHYUNUGROHO
              </Text>
              <Text>NIP. 197410131995031004</Text>
            </div>
          </div>
        </View>
      </Page>
    </Document>
  );
}
