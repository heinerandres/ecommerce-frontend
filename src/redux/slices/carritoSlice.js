import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carrito: {
        _id: "",
        usuario_id: "",
        productos: [{_id: "", cantidad: 0}],
    },
    productos: []
};

const carritoSlice = createSlice({
    name: "carrito",
    initialState,
    reducers: {
        setCarritox: (state, action) => {
            state.carrito._id = action.payload._id;
            state.carrito.usuario_id = action.payload.usuario_id;
            state.carrito.productos = action.payload.productosCarrito
            state.productos = action.payload.productos;
        },
        updateCarritox: (state, action) => {
            console.log("carrito slice");
            console.log(action.payload);
            state.carrito.productos = action.payload;
        },
        updateCantidad: (state, action) => {
            const {_id, nuevaCantidad } = action.payload;
            const producto = state.carrito.productos.find(p => p._id === _id);
            if (producto) producto.cantidad = nuevaCantidad;
        }
    },
});

export const { setCarritox, updateCarritox, updateCantidad } = carritoSlice.actions;
export default carritoSlice.reducer;