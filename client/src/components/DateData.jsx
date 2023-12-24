import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DateData = ({ cryptoData, date }) => {
  const navigate = useNavigate();
  const [gridOptions, setGridOptions] = useState({
    defaultColDef: {
      sortable: true,
    },
    domLayout: "autoHeight",
    rowHeight: 30,

    columnDefs: [
      {
        headerName: "Coin Name",
        field: "name",
        sortable: true,
        cellRenderer: (params) => {
          const name = params.data.name;
          return (
            <button
              onClick={() => {
                navigate(`/${name}`, {
                  state: { date: date },
                });
              }}
            >
              {name}
            </button>
          );
        },
      },
      {
        headerName: "Price",
        field: "close",
        sortable: true,
        valueFormatter: (params) => {
          return `$${params.value.toFixed(2)}`;
        },
      },
      {
        headerName: "24h",
        field: "onedayChange",
        sortable: true,
        valueFormatter: (params) => {
          return `${(params.value * 100).toFixed(2)}%`;
        },
      },
      {
        headerName: "7d",
        field: "sevendaysChange",
        sortable: true,
        valueFormatter: (params) => {
          return `${(params.value * 100).toFixed(2)}%`;
        },
      },
      {
        headerName: "1 month",
        field: "onemonthChange",
        sortable: true,
        valueFormatter: (params) => {
          return `${(params.value * 100).toFixed(2)}%`;
        },
      },
      {
        headerName: "24h Volume",
        field: "volume",
        sortable: true,
        valueFormatter: (params) => {
          return `$${params.value}`;
        },
      },
      {
        headerName: "Market Cap",
        field: "marketCap",
        sortable: true,
        valueFormatter: (params) => {
          return `$${params.value}`;
        },
      },
    ],
    rowData: cryptoData,
  });

  return (
    <div className="ag-theme-quartz">
      <div style={{ width: "100%" }}>
        <AgGridReact {...gridOptions} />
      </div>
    </div>
  );
};

export default DateData;
