import { ShoppingCart, Timer, Package, Coffee } from 'lucide-react'
import { Items } from '../../components/ui/items'
import { Card } from '../../components/Card/Card'
import Image from '../../assets/HomeImage.svg'
import 'react-toastify/dist/ReactToastify.css'

import { Coffes } from '../../utils/Coffes.json'

export function Home() {
  return (
    <main className="">
      <section className="flex justify-between items-center pt-[94px] pb-28 ">
        <div className="flex w-[588px] flex-col gap-[66px]">
          <div>
            <h1 className="font-bold text-5xl text-gray-900 dark:text-gray-500">
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <p className="text-xl text-gray-800 mt-4 dark:text-gray-400">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-col gap-6">
              <Items
                icon={<ShoppingCart size={16} />}
                className="bg-yellow-300"
                text="Compra simples e segura"
              />
              <Items
                icon={<Timer size={16} />}
                className="bg-yellow-200"
                text="Entrega rápida e rastreada"
              />
            </div>

            <div className="flex flex-col gap-6">
              <Items
                icon={<Package size={16} />}
                className="bg-gray-800"
                text="Embalagem mantém o café intacto"
              />
              <Items
                icon={<Coffee size={16} />}
                className="bg-purple-200"
                text="O café chega fresquinho até você"
              />
            </div>
          </div>
        </div>

        <img src={Image} alt="Coffe image" className="hidden lg:block" />
      </section>

      <section className="mt-20 text-center sm:text-start">
        <strong className="text-[32px] text-gray-800 font-extrabold dark:text-gray-400">
          Nossos cafés
        </strong>

        <div className="mt-[54px] justify-items-center grid gap-y-10 sm:justify-items-start sm:grid-cols-Check md:grid-cols-MainCardMD lg:gap-x-8 xl:grid-cols-MainCard">
          {Coffes.map((coffees) => {
            return <Card key={coffees.id} coffee={coffees} />
          })}
        </div>
      </section>
    </main>
  )
}
