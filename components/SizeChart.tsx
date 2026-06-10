type SizeChartProps = {
  chart: {
    columns: string[];
    rows: string[][];
  };
};

export function SizeChart({ chart }: SizeChartProps) {
  return (
    <div className="overflow-hidden rounded-md border border-ink/10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] text-left text-sm">
          <thead className="bg-ink text-white">
            <tr>
              {chart.columns.map((column) => (
                <th key={column} className="px-4 py-3 font-black uppercase tracking-wide">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row) => (
              <tr key={row.join("-")} className="border-t border-ink/10 odd:bg-parchment/60">
                {row.map((cell) => (
                  <td key={cell} className="px-4 py-3 text-ink/75">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
