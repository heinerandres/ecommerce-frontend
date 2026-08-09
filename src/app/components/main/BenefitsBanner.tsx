export const BenefitsBanner = () => {

  return (
    <div className="h-[10vh] 2xl:h-[13vh] flex justify-center mb-2 text-xs 2xl:text-sm">
        <div className="flex items-center w-[87%] xl:w-[85%] 2xl:w-[78%] shadow-sm rounded-lg">
          <div className="h-[80%] flex-1 flex items-center justify-center gap-3 border-r border-gray-200">
            <i className="shrink-0 h-fit fa-solid fa-truck p-4 2xl:p-5 bg-amber-100 rounded-full"></i>
            <div className="h-fit">
              <p className="font-semibold">Envios gratis</p>
              <p className="text-gray-600">En toda Costa Rica en pedidos</p>
              <p className="text-gray-600">mayores a ₡15000.</p>
            </div>
          </div>
          <div className="h-[80%] flex-1 flex items-center justify-center gap-3 border-r border-gray-200">
            <i className="shrink-0 h-fit fa-solid fa-shield-heart p-4 2xl:p-5 bg-blue-200 rounded-full"></i>
            <div className="h-fit">
              <p className="font-semibold">Compra segura</p>
              <p className="text-gray-600">Tus pagos están protegidos con</p>
              <p className="text-gray-600">encriptación</p>
            </div>
          </div>
          <div className="h-[80%] flex-1 flex items-center justify-center gap-3 border-r border-gray-200">
            <i className="shrink-0 h-fit fa-solid fa-rotate p-4 2xl:p-5 bg-purple-200 rounded-full"></i>
            <div className="h-fit">
              <p className="font-semibold">Devoluciones fáciles</p>
              <p className="text-gray-600">Tienes 30 días para cambios</p>
              <p className="text-gray-600">o devoluciones</p>
            </div>
          </div>
          <div className="h-[80%] flex-1 flex items-center justify-center gap-3">
            <i className="shrink-0 h-fit fa-brands fa-whatsapp p-4 2xl:p-5 bg-green-200 rounded-full"></i>
            <div className="h-fit">
              <p className="font-semibold">Contáctanos por whatsapp</p>
              <p className="text-gray-600">Estamos para ayudarte siempre</p>
              <p className="text-gray-600">que lo necesites</p>
            </div>
          </div>
        </div>
      </div>
  )
}