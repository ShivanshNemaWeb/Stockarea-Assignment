import React, { useState } from 'react';
import styles from './WareHouseDetail.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { editWarehouse } from '../../Actions/warehouseActions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@material-ui/core';
import { FiEdit } from 'react-icons/fi';

const WarehouseDetail = () => {
  const selectedWarehouse = useSelector((state) => state.selectedWarehouse);
  const dispatch = useDispatch();

  const [isEditOpen, setEditOpen] = useState(false);
  const [editedWarehouse, setEditedWarehouse] = useState(selectedWarehouse);

  const handleEditOpen = () => {
    setEditedWarehouse(selectedWarehouse);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSave = () => {
    // Dispatch the edited warehouse to the Redux store
    dispatch(editWarehouse(editedWarehouse));
    setEditOpen(false);
  };

  return (
    <div className={styles.card}>
      <figure>
        <img src="https://picsum.photos/300/400" alt="example card" />
      </figure>
      <IconButton className={styles.edit} onClick={handleEditOpen}>
        <FiEdit />
      </IconButton>
      <div className={styles.content}>
        <h2 className={styles.content}>{selectedWarehouse.name}</h2>
        <div className={styles.text}>
          <p>Code: {selectedWarehouse.code}</p>
          <p>City: {selectedWarehouse.city}</p>
          <p>Space Available: {selectedWarehouse.space_available}</p>
          <p>Type: {selectedWarehouse.type}</p>
          <p>Cluster: {selectedWarehouse.cluster}</p>
          <p>Registered: {selectedWarehouse.is_registered ? 'Yes' : 'No'}</p>
          <p>Live: {selectedWarehouse.is_live ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Warehouse Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedWarehouse.name}
            onChange={(e) => setEditedWarehouse({ ...editedWarehouse, name: e.target.value })}
            fullWidth
          />
		  <TextField
            label="City"
            value={editedWarehouse.city}
            onChange={(e) => setEditedWarehouse({ ...editedWarehouse, city: e.target.value })}
            fullWidth
          />
		  <TextField
            label="Space Available"
            value={editedWarehouse.space_available}
            onChange={(e) => setEditedWarehouse({ ...editedWarehouse, space_available: e.target.value })}
            fullWidth
          />
         <TextField
            label="Cluster"
            value={editedWarehouse.cluster}
            onChange={(e) => setEditedWarehouse({ ...editedWarehouse, cluster: e.target.value })}
            fullWidth
          />
		  <TextField
            label="Type"
            value={editedWarehouse.type}
            onChange={(e) => setEditedWarehouse({ ...editedWarehouse, type: e.target.value })}
            fullWidth
          />
		  <TextField
            label="Rgistered"
            value={editedWarehouse.is_registered}
            onChange={(e) => setEditedWarehouse({ ...editedWarehouse, is_registered: e.target.value })}
            fullWidth
          />
		  <TextField
            label="Live"
            value={editedWarehouse.is_live}
            onChange={(e) => setEditedWarehouse({ ...editedWarehouse, is_live: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WarehouseDetail;
