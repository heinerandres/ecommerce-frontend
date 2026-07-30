'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
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
    href: '/admin/pedidos',
    label: 'Pedidos',
    icon: "fa-solid fa-bag-shopping",
    children: [
      {
        href: '/admin/pedidos/enpagina',
        label: 'En página',
        icon: "fa-brands fa-internet-explorer"
      },
      {
        href: '/admin/pedidos/entienda',
        label: 'En tienda',
        icon: "fa-solid fa-store"
      }
    ]
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative w-75 ml-5 mt-5 min-h-[82vh] h-full text-black shadow-lg border border-gray-100 rounded-2xl">
      <div className="p-7 ">
        <h1 className="text-2xl font-bold">
          Administrador(a)
        </h1>
      </div>

      <nav className="flex flex-col p-4 gap-2">
        {links.map((link) => {
          if (link.children) {
              return (
                  <div key={link.label}>
                      <div 
                        className="rounded-lg px-4 py-3 font-semibold">
                          <i className={`${link.icon} mr-3 text-black/60`}></i>
                          {link.label}
                      </div>
                      <div className="ml-8 flex flex-col gap-1">
                          {link.children.map(child => (
                              <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`rounded-lg px-4 py-2 transition-colors ${
                                      pathname === child.href
                                          ? "bg-blue-200 text-blue-700"
                                          : "hover:bg-blue-100 hover:text-blue-700"
                                  }`}
                              >
                                  <i className={`${child.icon} mr-3 text-black/60`}></i>
                                  {child.label}
                              </Link>
                          ))}
                      </div>
                  </div>
              );
          }
          return (
              <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 transition-colors font-semibold ${
                      pathname === link.href
                          ? "bg-blue-200 text-blue-700"
                          : "hover:bg-blue-100 hover:text-blue-700"
                  }`}
              >
                  <i
                      className={`${link.icon} mr-3 ${
                          pathname === link.href ? "text-blue-700" : "text-black/60"
                      }`}
                  ></i>

                  {link.label}
              </Link>
          );
      })}
      </nav>
      <img className="absolute bottom-0" src="/asideimg2.PNG"></img>
    </aside>
  );
}