'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    href: '/admin/tallas',
    label: 'Tallas',
    icon: 'fa-solid fa-ruler'
  },
  {
    href: '/admin/colores',
    label: 'Colores',
    icon: 'fa-solid fa-palette'
  },
  {
    href: '/admin/productos',
    label: 'Productos',
    icon: 'fa-solid fa-gift'
  },
  {
    href: '/admin/categorias',
    label: 'Categorias',
    icon: "fa-solid fa-tag",
  },
  {
    href: '/admin/pedidos',
    label: 'Pedidos',
    icon: "fa-solid fa-bag-shopping",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-75 ml-5 min-h-[82vh] text-black shadow-lg border border-gray-100 rounded-2xl">
      <div className="p-7 ">
        <h1 className="text-2xl font-bold">
          Administrador(a)
        </h1>
      </div>

      <nav className="flex flex-col p-4 gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-4 py-3 transition-colors font-semibold ${
              pathname === link.href
                ? 'bg-blue-200 text-blue-700'
                : 'hover:bg-blue-100 hover:text-blue-700'
            }`}
          >
            <i className={`mr-3 text-black/60
                ${link.icon}  
                ${pathname === link.href
                    ? 'text-blue-700'
                    : ''
                }`}></i>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}