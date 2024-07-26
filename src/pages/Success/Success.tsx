import { useContext } from 'react'
import SuccessImg from '../../assets/SuccessImg.svg'
import { MapPin, DollarSign, Timer } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { CardContext } from '../../contexts/CardContextProvider'

export function Success() {
  const { orders } = useContext(CardContext)
  const { orderId } = useParams()
  const orderInfo = orders.find((order) => order.id === Number(orderId))
  const paymentM = {
    credit: 'Cartão de credito',
    debit: 'Cartão de debito',
    cash: 'Dinheiro',
  }

  if (!orderInfo?.id) {
    return null
  }

  console.log(orders)
  console.log(orderId)
  console.log(orderInfo)

  return (
    <section className="flex items-end justify-between mt-20">
      <div>
        <h1 className="text-[32px] text-yellow-300">Uhu! Pedido confirmado</h1>
        <p className="text-xl text-gray-800 mt-1 dark:text-gray-400">
          Agora é só aguardar que logo o café chegará até você
        </p>

        <div className="max-w-[526px] flex flex-col border border-gray-700 rounded-tl-md rounded-tr-[36px] rounded-br-md rounded-bl-[36px] space-y-8 p-10 mt-10 dark:border-gray-300">
          <div className="flex gap-3 items-center">
            <div className="p-2 rounded-full text-white bg-purple-200">
              <MapPin />
            </div>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Entrega em{' '}
              <span className="font-bold ">
                {orderInfo.road}, {orderInfo.houseNumber}
              </span>{' '}
              {orderInfo.neighborhood} - {orderInfo.city}, {orderInfo.uf}
            </p>
          </div>

          <div className="flex gap-3 items-center ">
            <div className="p-2 rounded-full text-white bg-yellow-200">
              <Timer />
            </div>
            <div className="flex flex-col">
              <p className="text-base text-gray-700 dark:text-gray-300">
                Previsão de entrega
              </p>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                20 min - 30 min
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-center ">
            <div className="p-2 rounded-full text-white bg-yellow-300">
              <DollarSign />
            </div>
            <div className="flex flex-col">
              <p className="text-base text-gray-700 dark:text-gray-300">
                Pagamento na entrega
              </p>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {paymentM[orderInfo.payment]}
              </span>
            </div>
          </div>
        </div>
      </div>

      <img src={SuccessImg} alt="Imagem de entrega" />
    </section>
  )
}
