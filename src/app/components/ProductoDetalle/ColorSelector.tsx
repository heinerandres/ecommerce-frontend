import clsx from "clsx";

type Props = {
    colores: {_id:string, nombre:string, valor:string}[] | undefined,
    color: string,
    setColor: React.Dispatch<React.SetStateAction<string>>,
}

export const ColorSelector = ({colores, color, setColor}:Props) => {

    const onColorChanged = (color:string) => {
        setColor(color);
    }

  return (
    <div>
        <h1 className="font-bold">Seleccione el Color</h1>
        <div>
            {
                colores?.map((_color) => (
                    <button 
                        key={_color._id} 
                        onClick={() => onColorChanged(_color._id)}
                        style={{backgroundColor: _color.valor}} 
                        className={
                            clsx("h-8 w-8 my-2 mr-2 border border-black rounded-full cursor-pointer",
                                {'border-3 border-blue-500': _color._id === color}
                            )
                        } />
                ))
            }
        </div>
    </div>
  )
}
