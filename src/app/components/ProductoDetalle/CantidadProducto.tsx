'use client';

type Props = {
  cantidad: number | null,
  setCantidad : React.Dispatch<React.SetStateAction<number>>,
  stock: number,
}

export default function CantidadProducto({cantidad, setCantidad, stock}: Props) {


  return (
    <div className="">
      <h3 className="font-bold ">Cantidad</h3>
      <div className="flex items-center gap-3 mb-4">
        <button 
          onClick={() => setCantidad(v => Math.max(1, v - 1))}
          className="rounded-full cursor-pointer"
        >
          <i className="text-xl fa-regular fa-circle-left"></i>
        </button>

        <span className="w-8 text-center">{cantidad}</span>

        <button 
          onClick={ () => setCantidad(v => Math.min(stock, v + 1))}
          className="rounded-full cursor-pointer"
        >
          <i className="text-xl fa-regular fa-circle-right"></i>
        </button>
      </div>
      
    </div>
  );
}