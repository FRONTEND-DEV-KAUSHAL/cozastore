import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../Firebase';
import * as ActionTypes from '../Actiontypes';





export const GetCategory = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "catagory"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        console.log(data);
        dispatch({ type: ActionTypes.GETDATA_CATEGORY, payload: data })

    } catch (error) {
        console.log(error.message);
        // dispatch(errorProduct(error.message));
    }
}

export const addCategory = (data) => async (dispatch) => {
    console.log(data);

    try {
        const rendomNum = Math.floor(Math.random() * 10000000).toString()
        const CategoryRef = ref(storage, 'catagory/' + rendomNum);

        uploadBytes(CategoryRef, data.cimg)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "catagory"), {
                                ...data,
                                cimg: url,
                                fileName: rendomNum
                            });
                            // console.log(docRef);
                        dispatch({
                            type: ActionTypes.ADD_CATEGORY, payload:
                            {
                                id: docRef.id,
                                ...data,
                                cimg: url,
                                fileName: rendomNum
                            }
                        })
                    })
            });

    } catch (error) {
        // dispatch(errorProduct(error.message))
    }
}

export const deleteCategory = (data) => async (dispatch) => {
    try {
        console.log(data);

        const CategoryRef = ref(storage, 'catagory/' + data.fileName);
        deleteObject(CategoryRef)
            .then(async () => {
                await deleteDoc(doc(db, "catagory", data.id));
                dispatch({ type: ActionTypes.DELETE_CATEGORY, payload: data.id })
            }).catch((error) => {
                console.log(error);
                // dispatch(errorProduct(error.message))
            });

    } catch (error) {
        console.log(error);
        // dispatch(errorProduct(error.message))
    }
}

export const updateCategory = (data) => async (dispatch) => {
    console.log(data);
    try {
        const CategoryRef = doc(db, "catagory", data.id);

        if (typeof data.cimg === "string") {
            await updateDoc(CategoryRef, {
                name: data.cname
            });
            dispatch({ type: ActionTypes.UPDATE_CATEGORY, payload: data })
        } else {
            console.log("image change");

            const DelCategoryRef = ref(storage, 'catagory/' + data.fileName);
            const rendomNum = Math.floor(Math.random() * 10000000).toString()
            const insCategoryRef = ref(storage, 'catagory/' + rendomNum);
            deleteObject(DelCategoryRef)
                .then(async () => {
                    uploadBytes(insCategoryRef, data.cimg)
                        .then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                            getDownloadURL(ref(storage, snapshot.ref))
                                .then(async (url) => {
                                    console.log(url);
                                    await updateDoc(CategoryRef, {
                                        name: data.cname,
                                        cimg: url,
                                        fileName: rendomNum
                                    });
                                    dispatch({
                                        type: ActionTypes.UPDATE_CATEGORY, payload: {
                                            ...data,
                                            cimg: url,
                                            fileName: rendomNum
                                        }
                                    })

                                })
                        })
                })

        }

    } catch (error) {
        console.log(error.message);
    }
}
