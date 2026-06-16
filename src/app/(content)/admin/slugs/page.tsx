'use server';


import EliminarSlug from "@/src/app/components/admin/slugs/EliminarSlug";
import { getCategorias } from "@/src/services/api/server/categorias";
import { getSlugs } from "@/src/services/api/server/slugs";
import Link from "next/link";


export default async function SlugsPage() {
    let slugs: {_id: string, slug:string, img1:string, img2:string, img3:string, img4:string, categoria:string, cantidadProductos:number}[] | null = null;
    let categorias: {_id:string, nombre:string}[] | null = null;
    let errorMsg = null;

    const respuesta = await getSlugs();
    if (respuesta.ok) slugs = respuesta.slugs;
    else errorMsg = respuesta.msg;

    const respuestaCategoria = await getCategorias();
    if (respuestaCategoria.ok) categorias = respuestaCategoria.categorias;
    else errorMsg = respuestaCategoria.msg;
    return (
        <div className="min-h-[70vh]">
      <h5 className="mt-10 ml-20 text-2xl font-bold">Slugs</h5>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <div className="mt-10 px-20">
        <Link href="/admin/slugs/insertar" 
            className=" px-4 md:py-3 2xl:py-4 cursor-pointer rounded-lg bg-blue-300 text-sm font-medium">
                Agregar Slug Nuevo
                <i className="fa-solid fa-tag ml-3"></i>
        </Link>
        <table className="min-w-full mt-6">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                Slug
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                Productos
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                Categoria
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                Opciones
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {
                slugs?.map((slug, index) => (
                    <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {slug.slug}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                          {slug.cantidadProductos}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                          {categorias?.find(categoria => categoria._id === slug.categoria)?.nombre}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            <Link href={`/admin/slugs/${slug.slug}`} className="hover:underline">
                                <i className="fa-solid fa-pen-to-square md:text-md 2xl:text-xl drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                 Editar slug
                            </Link>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                          <EliminarSlug slug={slug} /> 
                      </td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
    )
}