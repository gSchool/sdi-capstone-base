import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import GppBadTwoToneIcon from "@mui/icons-material/GppBadTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import GppGoodIcon from "@mui/icons-material/GppGood";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const useStyles = makeStyles({
  finalRow: {
    backgroundColor: "lightblue",
  },
  hover: {
    "&:hover": {
      backgroundColor: "lightblue",
    },
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "asset_name",
    numeric: false,
    disablePadding: true,
    label: "Asset",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "mission_title",
    numeric: true,
    disablePadding: false,
    label: "Operation",
  },
  {
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "justification",
    numeric: true,
    disablePadding: false,
    label: "Justification",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Approval Status",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all requests",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Requests
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Requests() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("mission_title");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [requestData, setRequestData] = useState([]);
  const [confirmShow, setConfirmShow] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const classes = useStyles();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClose = () => {
    setConfirmShow(false);
    console.log("deleteId", deleteId);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = requestData.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClickDelete = (rowId) => {
    console.log("rowid", rowId);
    setConfirmShow(true);
    setDeleteId(rowId);
  };

  const handleDeleteUser = (deleteId) => {
    let newArray = requestData;
    console.log("clicked", deleteId);
    const filtered = newArray.filter((item) => item.id !== deleteId);
    axios.delete(`http://localhost:8080/approvals/${deleteId}`);
    setRequestData(filtered);
    setConfirmShow(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requestData.length) : 0;

  useEffect(() => {
    const getRequestData = async () => {
      const response = await axios.get("http://localhost:8080/approvals");
      const data = await response.data;
      setRequestData(data);
      console.log("test");
    };
    getRequestData();
  }, [confirmShow]);
  return (
    <>
      <Header></Header>
      <div className="table-container">
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={requestData.length}
                />
                <TableBody>
                  {stableSort(requestData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          className={classes.hover}
                          tabIndex={-1}
                          key={row.Request_ID}
                        >
                          <TableCell padding="checkbox">
                            <DeleteIcon
                              color="error"
                              onClick={() => handleClickDelete(row.Request_ID)}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.asset_name}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.type}
                          </TableCell>
                          <TableCell align="center">
                            {row.mission_title}
                          </TableCell>
                          <TableCell align="center">{row.location}</TableCell>
                          <TableCell align="center">
                            {row.justification}
                          </TableCell>
                          <TableCell align="center">
                            {row.status === "Approved" ? (
                              <GppGoodIcon color="success" />
                            ) : row.status === "Rejected" ? (
                              <GppBadTwoToneIcon color="error" />
                            ) : (
                              <PendingActionsTwoToneIcon color="warning" />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              className={classes.finalRow}
              rowsPerPageOptions={[10, 15, 20]}
              component="div"
              count={requestData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
      <Modal show={confirmShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Button
          variant="outline-danger"
          onClick={() => handleDeleteUser(deleteId)}
        >
          Confirm
        </Button>
        <Button variant="outline-info" onClick={handleClose}>
          Cancel
        </Button>
      </Modal>
    </>
  );
}
