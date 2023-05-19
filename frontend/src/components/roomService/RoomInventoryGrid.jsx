import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import BasicButton from "../common/BasicButton";
import backgroundImage from "../../assets/images/hospitalbeds.jpg";
import { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

const styles = {
  header: {
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  content: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
};

function RoomInventoryGrid() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.inventory)
      .fetch()
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      });
  }, []);

  const deleteItem = (id) => {
    createAPIEndpoint(ENDPOINTS.inventory).delete(id);
    window.location.reload();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemNo",
        header: "Item No",
        maxSize: 20,
      },
      {
        accessorKey: "itemName",
        header: "Item ATM",
        maxSize: 10,
      },
      {
        accessorKey: "dueDate",
        header: "Expiry / Maintenance Due Date",
        maxSize: 10,
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        maxSize: 10,
      },
      {
        accessorKey: "noOfItems",
        header: "No of items",
        maxSize: 10,
      },
      {
        header: "Alerts",
        maxSize: 30,
        Cell: ({ cell, row }) => {
          console.log(row);
          return <Typography color='red'>{row.original.alerts}</Typography>;
        },
      },
    ],
    []
  );

  return (
    <>
      <div style={styles.header}>
        <Box
          //   minWidth='100vh'
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
          style={styles.content}
        >
          <Stack spacing={2}>
            <Typography color='#2F4FAA' variant='h4'>
              Inventory - Rooms
            </Typography>
            <Stack direction='row' spacing={2}>
              <MaterialReactTable
                enableRowActions
                renderRowActionMenuItems={({ row }) => [
                  <MenuItem
                    key='edit'
                    onClick={() =>
                      navigate("/inventoryEdit", {
                        state: { inventory: row.original },
                      })
                    }
                  >
                    Edit
                  </MenuItem>,
                  <MenuItem
                    key='delete'
                    onClick={() => deleteItem(row.original._id)}
                  >
                    Delete
                  </MenuItem>,
                ]}
                columns={columns}
                data={items}
              />
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default RoomInventoryGrid;
