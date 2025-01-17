import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { getMarketReport } from "../../fetcher";
import InputLabel from "@mui/material/InputLabel";

const Market = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "City",
      headerName: "City",
      flex: 1,
    },
    {
      field: "Number of Walmart Stores",
      headerName: "Number of Walmart Stores",
      flex: 1,
    },
    {
      field: "Number of Orders",
      headerName: "Number of Orders",
      flex: 1,
    },
    {
      field: "Sales",
      headerName: "Sales",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.Sales.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "Top Selling Product",
      headerName: "Top Selling Product",
      flex: 1,
    },
  ];

  const [year, setYear] = useState("");
  const [pageSize] = useState("20");
  const [searchResults, setSearchResults] = useState([]);

  const generateRandom = () => {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
    getMarketReport(event.target.value).then((res) => {
      setSearchResults(res.results);
    });
  };

  return (
    <Box m="20px">
      <Header
        title="Market Analysis"
        subtitle="Top 5 Cities With the most Walmart Stores"
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={year}
          onChange={handleChange}
          label="Year"
        >
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2017}>2017</MenuItem>
        </Select>
      </FormControl>

      <Box
        m="5px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={searchResults}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => generateRandom()}
          pageSize={pageSize ? parseInt(pageSize) : 20}
          pagination
        />
      </Box>
    </Box>
  );
};

export default Market;
