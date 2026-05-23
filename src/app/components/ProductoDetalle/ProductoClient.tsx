'use client';

import { IProducto } from "@/src/interfaces/producto";
import CantidadProducto from "./CantidadProducto";
import { TallaSelector } from "./TallaSelector";
import { useEffect, useState } from "react";
import { ColorSelector } from "./ColorSelector";
import { useDispatch, useSelector } from "react-redux";
import { updateCarritox } from "@/src/redux/slices/carritoSlice";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { actualizarCarrito } from "@/src/services/api/server/carritos";
import { currencyFormat } from "@/src/utilities/currencyFormat";


type Props = {
    productos: IProducto[] | null,
    tallas: {_id: string, valor:string}[] | null;
    colores: {_id: string,nombre:string, valor:string}[] | null;
}
type Color = {
  _id: string;
  nombre: string;
  valor: string;
};

export const ProductoClient = ({productos, tallas, colores}: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();


    //estados
    const [talla, setTalla] = useState("");
    const [cantidad, setCantidad] = useState(5);
    const [stock, setStock] = useState(5);
    const [color, setColor] = useState("");
    const [seleccioneColor, setSeleccioneColor] = useState("");
    const [seleccioneTalla, setSeleccioneTalla] = useState("");
    const [errorApi, setErrorApi] = useState("");
    const [coloresDisponibles, setColoresDisponibles] = useState<Color[]>();

    

    //agrega y filtra las tallas disponibles para el producto
    const idTallas = new Set(productos?.map(producto => producto.talla));
    const tallasDisponibles = tallas?.filter(talla => idTallas.has(talla._id));
    //agrega y filtra los colores disponibles para el producto
    const idColores = new Set(productos?.map(producto => producto.color));
    //los colores son un estado, entonces se hace con effect
    
    //accede a estados globales
    const carritoCompleto = useSelector((state:RootState) => state.carrito);
    const carrito = carritoCompleto.carrito;
    const user = useSelector((state: RootState) => state.user);

    //filtra solo los ids de colores que estan disponibles para el producto
    useEffect(() => {
      const idcolores = [
        ...new Set(
          productos
            ?.filter(producto => producto.talla === talla)
            .map(producto => producto.color) ?? []
        )
      ];
    //agrega la información completa en el estado de colores
    setColoresDisponibles(colores?.filter(color => idcolores.includes(color._id)));
    }, [talla]); 

    //filtra la cantidad disponible dependiento de la talla y el color seleccionados
    useEffect(() => {
      setSeleccioneTalla("");
      setSeleccioneColor("");
      const cantidadx =
        productos?.find(
          producto => producto.talla === talla && producto.color === color
        )?.cantidad ?? 5;
      setCantidad(cantidadx);
      setStock(cantidadx);
    }, [talla, color]); 

    //agrega los colores disponibles para el producto
    useEffect(() => {
      setColoresDisponibles(colores?.filter(color => idColores.has(color._id)));
    }, []);

    const handleAgregar = async() => {
      //validar usuario
      if(!user.uid){
        Swal.fire({
          title: "Inicia sesión",
          text: "Para agregar productos al carrito debes iniciar sesión",
          icon: "warning",
          confirmButtonText: "Iniciar sesión",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) router.push("/auth/login");
        });
        return;
      }

      //validar talla y color
      if(talla === "") {setSeleccioneTalla("Seleccione una talla");return;}
      if(color === "") {setSeleccioneColor("Seleccione un color");return;}
      
      //producto nuevo
      const producto = 
        productos?.find(producto => producto.talla === talla && producto.color === color)!;

        //almacenar en bd
      try{
        //validar producto (para que no inserte duplicados y para que no inserte más de la cantidad disponible)
        const existe = carrito.productos.find(p=> p._id === producto?._id);
        let productosActualizados;
        if (existe) {
          const nuevaCantidad = existe.cantidad + cantidad;
          //si la cantidad sobrepasa el stock
          if(nuevaCantidad > stock){
            Swal.fire({
              title: "Cantidad Disponible",
              text: `Ya tienes en el carrito ${ producto.nombre }, no tenemos disponible la suma de las dos cantidades ${ nuevaCantidad}`,
              icon: "warning",
              confirmButtonText: "Aceptar",
            })
            return;
          }
          //si existe le suma la cantidad
          productosActualizados = carrito.productos.map(p => p._id === producto?._id ? {...p, cantidad: p.cantidad + cantidad} : p);
        }
        else productosActualizados = [...carrito.productos, { _id: producto?._id, cantidad}];
        const carritotmp = {_id: carrito._id, usuario_id: carrito.usuario_id, productos: productosActualizados};
        const response = await actualizarCarrito(carritotmp);

        if(!response.ok){
          console.log(response.msg);
          setErrorApi("Error de conexión con la base de datos");
        }
        else{
          console.log("producto detalle");
          console.log(carritotmp.productos);
          dispatch(updateCarritox(carritotmp.productos));
          router.push("/cart");
        }
      }
      catch(error){
        console.log(error);
        setErrorApi("Error de conexión con la base de datos");
      }

    }

  return (
    <div className="flex">
      <div className="w-[55%]">
        {seleccioneTalla !== null && <p className="text-red-500">{seleccioneTalla}</p>}
        <TallaSelector talla={talla} setTalla={ setTalla } disponibles={ tallasDisponibles }/>
        {seleccioneColor !== null && <p className="text-red-500">{seleccioneColor}</p>}
        <ColorSelector colores={ coloresDisponibles } color={color} setColor={ setColor }/>
        <CantidadProducto cantidad={ cantidad } setCantidad={ setCantidad } stock={ stock }/>
        {errorApi !== null && <p className="text-red-500">{errorApi}</p>}
        <button onClick={handleAgregar} className="py-3 px-3 border border-black/50 rounded-xl cursor-pointer">Agregar al Carrito</button>
      </div>
      <div className="my-2 border h-fit p-4 rounded-xl">
        <p className="font-bold">Precio: <span className="font-normal">{currencyFormat(productos![0].precio)}</span></p>
        <p className="font-bold mt-4">SubTotal: {currencyFormat(productos![0].precio * cantidad)}</p>

      </div>
    </div>
  )
}
