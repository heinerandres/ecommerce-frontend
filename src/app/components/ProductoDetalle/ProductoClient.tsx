'use client';

import { IProducto } from "@/src/interfaces/producto";
import { TallaSelector } from "./TallaSelector";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/src/utilities/currencyFormat";
import { ColorSelector } from "./ColorSelector";
import CantidadProducto from "./CantidadProducto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { agregarProductoCarrito } from "@/src/services/api/server/carritos";
import { updateCarritox } from "@/src/redux/slices/carritoSlice";

type Color = {_id:string, nombre: string, valor: string }
type Variante =  {_id: string, producto: string, color: {_id: string, nombre: string, valor: string}, talla: {_id: string, valor: string}, precio: number, cantidad: number};

type Props = {
    producto: IProducto | null,
    variantes: {_id: string, producto: string, color: {_id: string, nombre: string, valor: string}, talla: {_id: string, valor: string}, precio: number, cantidad: number}[] | null;
}

export const ProductoClient = ({producto, variantes}: Props) => {
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState('');
  const [coloresDisponibles, setColoresDisponibles] = useState<Color[]>();
  const [cantidad, setCantidad] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [variante, setVariante] = useState<Variante| null>(null);
  const router = useRouter();
  const carrito = useSelector((state: RootState) => state.carrito);
  const dispatch = useDispatch();
  

  //filtra tallas disponibles para la variante
  const tallasDisponibles = [
    ...new Map(
      variantes?.map(v=>[v.talla._id.toString(), v.talla])
    ).values()
  ];
  //filtra colores cuando selecciona talla
  useEffect(() => {
    if(!talla) return;
    setColoresDisponibles((variantes?? [])
      .filter(v => v.talla._id.toString() === talla)
      .map(v => v.color) 
    );
  }, [talla]);
  //filtra variante, muestra cantidad en stock de acuerdo con la talla y el color seleccionados
  useEffect(() => {
    if(!color) return;
      const varianteSeleccionada = variantes?.find(v=> v.talla._id === talla && v.color._id === color) ?? null;
      setVariante(varianteSeleccionada);
      setStock(varianteSeleccionada?.cantidad ?? 0);
      setCantidad(varianteSeleccionada?.cantidad ?? 0);
    }, [color]);

    const handleAgregar = async() => {
      //verificar si está logueado
      if (!carrito.carrito.usuario_id){
        Swal.fire({
          icon: "info",
          title: "Información",
          text: "Debes iniciar sesión para agregar productos al carrito",
          confirmButtonText: "Aceptar",
        }).then(() =>{
          router.push("/auth/login");
        });
        return;
      }
      //verificar que selecciono talla, color y cantidad
      if(!talla || !color || !cantidad){
        Swal.fire({
          icon: "info",
          title: "Información",
          text: "Debes seleccionar talla, color y cantidad",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      //agrega al carrito
      const respuestaInsertarProducto = await agregarProductoCarrito({
          _id: carrito.carrito._id, 
          productoId: producto?._id,
          varianteId: variante?._id,
          cantidad,
        });
      if(respuestaInsertarProducto.ok) 
      {
        //consultar la cantidad anterior en redux
        const cantidadCarrito = carrito.carrito.productos.find(
          p => p.variante === variante?._id
          )?.cantidad ?? 0;
        //actualizar en redux
        dispatch(
          updateCarritox([
            {
              id: producto?._id,
              variante: variante?._id,
              cantidad: cantidadCarrito + cantidad,
            },
          ])
        );
        router.push("/cart");
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: respuestaInsertarProducto.msg,
          confirmButtonText: "Aceptar",
        });
      }
    }
      
      

    

  return (
    <div className="flex">
      <div className="w-[55%]">
        <TallaSelector talla={talla} setTalla={setTalla} disponibles={tallasDisponibles}/>
        {talla && <ColorSelector color={color} setColor={setColor} disponibles={coloresDisponibles}/>}
        {(talla && color) && <CantidadProducto cantidad={cantidad} setCantidad={setCantidad} stock={stock}/>}
        
        
        <button onClick={handleAgregar} className="py-3 px-3 border border-black/50 rounded-xl cursor-pointer">Agregar al Carrito</button>
      </div>
      <div className="my-2 border h-fit p-4 rounded-xl">
        <p className="font-bold">Precio: <span className="font-normal">{currencyFormat(producto?.precio!)}</span></p>
        <p className="font-bold mt-4">SubTotal: {currencyFormat(producto?.precio! * cantidad)}</p>

      </div>
    </div>
  )
}
