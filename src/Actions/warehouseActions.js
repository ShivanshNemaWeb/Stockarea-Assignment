export const setWarehouses = (warehouses) => ({
    type: 'SET_WAREHOUSES',
    payload: warehouses,
  });
  
  export const setSelectedWarehouse = (warehouse) => ({
    type: 'SET_SELECTED_WAREHOUSE',
    payload: warehouse,
  });
  
  export const editWarehouse = (warehouse) => ({
    type: 'EDIT_WAREHOUSE',
    payload: warehouse,
  });
  