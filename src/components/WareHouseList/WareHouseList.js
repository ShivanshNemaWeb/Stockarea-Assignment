import React, { useState } from "react";
import styles from './WareHouseList.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Input } from '@mui/material';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWarehouse } from '../../Actions/warehouseActions';
import { Link } from 'react-router-dom';
const WareHouseList = () => {
  const [isDropdownActive, setDropdownActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [filterInput, setFilterInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  const rows = useSelector((state) => state.warehouses);

  const filteredRows = rows.filter((row) => {
    switch (selectedOption) {
      case "All":
        return (
          row.code.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.city.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.space_available.toString().includes(filterInput) ||
          row.type.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.cluster.toLowerCase().includes(filterInput.toLowerCase())
        );
      case "Name":
        return row.name.toLowerCase().includes(filterInput.toLowerCase());
      case "City":
        return row.city.toLowerCase().includes(filterInput.toLowerCase());
      case "Space":
        return row.space_available.toString().includes(filterInput);
      case "Type":
        return row.type.toLowerCase().includes(filterInput.toLowerCase());
      case "Cluster":
        return row.cluster.toLowerCase().includes(filterInput.toLowerCase());
      default:
        return false;
    }
  });

  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const dispatch = useDispatch();

  const handleRowClick = (warehouse) => {
    dispatch(setSelectedWarehouse(warehouse));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.search_box}>
          <div className={styles.dropdown}>
            <div className={styles.default_option} onClick={() => setDropdownActive(!isDropdownActive)}>
              {selectedOption}
            </div>
            <ul className={isDropdownActive ? styles.active : ""}>
              <li onClick={() => setSelectedOption("All")}>All</li>
              <li onClick={() => setSelectedOption("Name")}>Name</li>
              <li onClick={() => setSelectedOption("City")}>City</li>
              <li onClick={() => setSelectedOption("Space")}>Space</li>
              <li onClick={() => setSelectedOption("Type")}>Type</li>
              <li onClick={() => setSelectedOption("Cluster")}>Cluster</li>
              
            </ul>
          </div>
          <div className={styles.search_field}>
            <Input
              type="text"
              className={styles.input}
              placeholder="Search"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Space Available&nbsp;(g)</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Cluster</TableCell>
                <TableCell align="right">Details</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {renderRows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {((currentPage - 1) * itemsPerPage) + index + 1}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.space_available}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.cluster}</TableCell>
                  <TableCell><Link to="/details" onClick={() => handleRowClick(row)}>
                Details
              </Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pagination}>
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default WareHouseList;
