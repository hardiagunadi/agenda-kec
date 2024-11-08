import { Text } from '@react-pdf/renderer';

export default function Title({ type = 3 }) {
  return (
    <>
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
          Bukti Pengajuan Permohonan
        </Text>
        <Text
          style={{
            fontFamily: 'Helvetica-Bold',
            textTransform: 'uppercase',
            textDecoration: 'underline',
          }}
        >
          {type == 3
            ? 'Pinjam Pakai Sementara Kendaraan Dinas'
            : 'Pinjam Pakai Ruang Rapat'}
        </Text>
      </div>
    </>
  );
}
