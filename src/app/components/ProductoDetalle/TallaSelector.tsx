import clsx from 'clsx';
type Props = {
    talla: String,
    setTalla: React.Dispatch<React.SetStateAction<string>>,
    disponibles?: {_id:string, valor:string}[],
}

export const TallaSelector = ({talla, setTalla, disponibles}: Props) => {
    const onSizeChanged = (size:string) => {
        setTalla(size);
    }
  return (
    <div className="my-2">
        <h3 className="font-bold mb-2">Tallas disponibles</h3>
        <div className="flex">
            {
                disponibles?.map(size =>(
                    <button 
                        key= { size._id }
                        onClick= { () => onSizeChanged(size._id)}
                        className= 
                        {clsx("mx-2 hover:underline xl:text-base 2xl:text-lg cursor-pointer",
                            {'underline': size._id === talla}
                        )}
                    >
                        { size.valor }
                    </button>
                ))
            }
        </div>

    </div>
  )
}