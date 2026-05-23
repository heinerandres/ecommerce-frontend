//https://tailwindcomponents.com/component/hoverable-table


import Link from 'next/link';

export default function() {
  return (
    <div className="min-h-[70vh]">
      <h5 className="mt-10 ml-20 text-2xl font-bold">Ordenes</h5>

      <div className="mt-10 px-20">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>

            <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Andrés
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <i className="text-green-500 fa-solid fa-credit-card"></i>
                <span className='mx-2 text-green-800'>Pagada</span>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/orders/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>

            </tr>

            <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Andrés
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <i className="text-green-500 fa-solid fa-credit-card"></i>
                <span className='mx-2 text-green-800'>Pagada</span>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/ordenes/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>

            </tr>
            <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Andrés
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <i className="text-green-500 fa-solid fa-credit-card"></i>
                <span className='mx-2 text-green-800'>Pagada</span>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/orders/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>

            </tr>

            <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Sofia
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <i className="text-green-500 fa-solid fa-credit-card"></i>
                <span className='mx-2 text-green-800'>Pagada</span>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/ordenes/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>

            </tr>
            <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Sofia
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <i className="text-green-500 fa-solid fa-credit-card"></i>
                <span className='mx-2 text-green-800'>Pagada</span>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/orders/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>

            </tr>

            <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Sofia
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <i className="text-green-500 fa-solid fa-credit-card"></i>
                <span className='mx-2 text-green-800'>Pagada</span>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/ordenes/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>

            </tr>
            <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Andrés
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <i className="text-red-500 fa-solid fa-credit-card"></i>
                <span className='mx-2 text-red-800'>No Pagada</span>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/orders/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>

            </tr>

            <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Sofia
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <i className="text-red-500 fa-solid fa-credit-card"></i>
                <span className='mx-2 text-red-800'>No Pagada</span>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/ordenes/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>

            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}