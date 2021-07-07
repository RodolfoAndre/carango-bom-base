import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    border: '1px solid #f0f0f0',
    color: 'rgba(0,0,0,.85)',
    backgroundColor: '#fff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#E9F1FD',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: 0,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: '1px solid #f0f0f0',
    },
    '& .MuiDataGrid-cell': {
      color: 'rgba(0,0,0,.85)',
      cursor: 'pointer',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
  },
}));
