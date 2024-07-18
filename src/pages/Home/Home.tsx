import { ShoppingCart, Timer, Package, Coffee } from 'lucide-react'
import { Items } from '../../components/ui/items'
import { Card } from './components/Card'
import Image from '../../assets/HomeImage.svg'

import { Coffes } from '../../utils/Coffes.json'

export function Home() {
  return (
    <main className="">
      <section className="flex justify-between items-center pt-[94px] pb-28 ">
        <div className="flex w-[588px] flex-col gap-[66px]">
          <div>
            <h1 className="font-bold text-5xl text-gray-900">
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <p className="text-xl text-gray-800 mt-4">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </p>
          </div>

          <div className="flex gap-6">
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

        <img src={Image} className="w-[400px]" alt="Coffe image" />
      </section>

      <section className="mt-20">
        <strong className="text-[32px] text-gray-800 font-extrabold">
          Nossos cafés
        </strong>

        <div className="mt-[54px] grid grid-cols-MainCard gap-x-8 gap-y-10 ">
          {Coffes.map((coffees) => {
            return <Card key={coffees.id} coffee={coffees} />
          })}
        </div>
      </section>
    </main>
  )
}
