// import {
//     Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { DataGrid, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';

// interface IdataGridProps{
//     hasPagination?: boolean;
//     rows: GridRowsProp;
//     columns: GridColDef[];
    
// }

// export const dataTable = ({columns, rows, hasPagination, ...props}: IdataGridProps) => {
//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//     <DataGrid
//       rows={rows}
//       columns={columns}
//       initialState={{ pagination: { paginationModel } }}
//       pageSizeOptions={[5, 10]}
//       checkboxSelection
//       sx={{ border: 0 }}
//     />
//   </Paper>
//   );
// };
