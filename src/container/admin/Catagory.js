import React, { useEffect, useState } from 'react';
import * as yup from 'yup'
import { Form, Formik, useFormik } from 'formik'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { pink , blue} from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { addCategory, deleteCategory, GetCategory, updateCategory } from '../../redux/action/Catagory.Action';

const Admin = () => {
  const [open, setOpen] = useState(false)             //popup open close
    const [dopen, setDopen] = useState(false);          // delete popup box open close
    const [editData, setEditData] = useState(false)     // edit data 
    const [did, setDid] = useState(0)                   //delete data


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
        formik.resetForm();
        setEditData(false);
    };
    const handleClickDOpen = () => {
        setDopen(true);
    };

    const dispatch = useDispatch()

    const handleInsert = (values) => {
        console.log(values);
        dispatch(addCategory(values))
        handleClose()
    }
    const handleEdit = (params) => {
        handleClickOpen()
        formik.setValues(params.row)
        console.log(params.row);
        setEditData(true)
    }

    const handleUpdateData = (values) => {
      console.log(values)
        dispatch(updateCategory(values))
        handleClose()
    }

    const handleDelete = () => {
        dispatch(deleteCategory(did))
        handleClose()
    }

    let schema = yup.object().shape({
        cname: yup.string().required("please enter Product Name"),
        cimg: yup.mixed().required("please select profile image.")
    });

    const formik = useFormik({
        initialValues: {
            cname: '',
           cimg: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            // handleInsert(values);
            if (editData) {
                handleUpdateData(values)
            } else {
                handleInsert(values);
            }
        },
    });

    const columns = [
        { field: 'cname', headerName: 'Categoty Name', width: 150 },
        {
            field: 'cimg',
            headerName: 'Catagory Image',
            width: 100,
            renderCell: (params) => (
                <img src={params.row.cimg} width={50} height={50} />
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 500,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)} >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleClickDOpen(); setDid(params.row) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    useEffect(() => {
        // loadData()
        dispatch(GetCategory())
        console.log("useeefect");
    }, [])
    console.log(did);
    const category = useSelector(state => state.Catagory);
    // console.log(category);
    const { handleSubmit, handleBlur, handleChange, errors, touched, values, setFieldValue } = formik

  //   const rows = [
  //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  //   ]
  return (
        <div>
            <h2 style={{textAlign: 'center'}}>Category</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Categories
            </Button>
            <Dialog    // delete popup
                open={dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this data ?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={handleClose} fullWidth>

                {
                    editData ? <DialogTitle> update Category Details</DialogTitle>
                        : <DialogTitle> Add Category</DialogTitle>
                }
                <Formik values={formik} >
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.cname}
                                margin="dense"
                                id="cname"
                                name='cname'
                                label="Category Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.cname && touched.cname ? <p>{errors.cname}</p> : ''}
                            <TextField
                                type="file"
                                name="cimg"
                                onChange={(e) => setFieldValue('cimg', e.target.files[0])}
                            />
                            {errors.cimg && touched.cimg ? <p>{errors.cimg}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                                {
                                    // editData ? <Button type='submit'>update </Button>
                                    //     : 
                                    <Button type='submit'>Add </Button>
                                }
                            </DialogActions>

                        </DialogContent>
                    </Form>
                </Formik>

            </Dialog>
            <h4 style={{textAlign: 'center', color: "#7380dc"}}>category Data</h4>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={category.category}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[6]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}
export default Admin;