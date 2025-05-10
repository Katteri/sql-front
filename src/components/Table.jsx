import React from "react";

const Table = ({ data }) => {
  // if (!data || !data.data || !data.columns) return null;
  return (
    <div
      className="overflow-x-auto overflow-y-auto max-h-96"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <table className="w-full font-moscow">
        <thead>
          <tr className="border-b border-dirty-red">
            {data.columns.map((column, index) => (
              <th
                key={index}
                className="px-1 py-1 text-left text-dirty-red font-bold text-base"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={`hover:bg-dirty-red/20 transition-colors duration-200 ${
                rowIndex % 2 === 0 ? 'bg-dirty-red/5' : ''
              }`}
            >
              {row.map((data, dataIndex) => (
                <td 
                  key={dataIndex}
                  className="px-1 py-1 text-dirty-red text-base"
                >
                  {data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-dirty-red text-xl font-moscow">
        Всего строк: {data.row_count}
      </p>
    </div>
  );
}

export default Table;