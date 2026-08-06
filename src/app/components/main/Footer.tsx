import React from 'react'

export const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] mt-[3%] bg-gray-50">
        <div className="flex justify-center w-[70%] h-[40%] mt-[3%] border-b border-gray-200">
            <div className="w-[25%] ">
                <h4 className="font-bold">Next js</h4>
                <p className="text-gray-500 mt-[2%]">Compra sin complicaciones, productos confiables</p>
                <p className="text-gray-500"></p>
                <p className="text-gray-500">Tu tienda de confianza, siempre a un clic</p>
            </div>
            <div className="w-[25%] ">
                <h3 className="font-bold">Ubicación</h3>
                <p className="text-gray-500 mt-[2%]">San José, calle x al final</p>
            </div>
            <div className="w-[25%] ">
                <h3 className="font-bold">Contacto</h3>
                <p className="text-gray-500 mt-[2%]">+506 8888-8888</p>
            </div>
            <div className="w-[25%] ">
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-500 mt-[2%]">next@next.com</p>
            </div>
        </div>
        <div className="h-[35%] w-[70%]">
            <div className="flex gap-4 justify-center mt-16 h-[10%] mb-[1%]">
                <a href="#" className="text-green-500">
                    <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a href="#" className="text-blue-600">
                    <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="text-black">
                    <i className="fa-brands fa-tiktok"></i>
                </a>
                <a href="#" className="text-pink-500">
                    <i className="fa-brands fa-instagram"></i>
                </a>
            </div>
            <p className="text-center text-xs">
                © 2026 RubyDevelopment - Next js. All rights reserved.
            </p>
        </div>
    </div>
    
  )
}
