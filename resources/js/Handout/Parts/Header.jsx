import { Image, Text } from '@react-pdf/renderer';

export default function Header() {
  return (
    <>
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
            Fax (0286) 321345 Email setda@wonosobokab.go.id Kode Pos 56311
          </Text>
        </div>
      </div>
    </>
  );
}
