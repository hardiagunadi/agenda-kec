export default function Table({ cols, rows }) {
  return (
    <div className="px-5 py-5 rounded bg-zinc-100">
      <table className="w-full text-left table-auto md:text-base">
        <thead>
          <tr>
            {cols.map((col, index) => (
              <th
                key={index}
                className="px-3 py-2 text-xs uppercase border-b border-zinc-200"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows?.map((row, index) => (
            <tr key={index}>
              {row?.map((item, index) => (
                <td key={index} className="px-3 py-2 text-base">
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
