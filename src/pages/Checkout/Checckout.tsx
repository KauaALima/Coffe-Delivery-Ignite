import { useContext } from 'react'
import { CardContext } from '../../contexts/CardContextProvider'
import { Coffes } from '../../utils/Coffes.json'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'

import { CartForm } from '../../components/Form/CartForm'
import { EmptyCart } from '../../components/Form/EmptyCart'
import { InfoForm } from '../../components/Form/InfoForm'
import { PayButton } from '../../components/Form/PayButton'
import { CoffeCard } from '../../components/Form/CoffeCard'
import { PayItems } from '../../components/Form/PayItems'
import {
  MapPin,
  DollarSign,
  CreditCard,
  Landmark,
  Banknote,
} from 'lucide-react'

const NewAddressSchema = z.object({
  cep: z.string({ invalid_type_error: 'Informe o CEP' }),
  road: z.string().min(1, 'Informe sua Rua'),
  houseNumber: z.string().min(1, 'Inform o numero da casa'),
  complement: z.string(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe a cidade'),
  uf: z.string().min(1).max(2, 'Informe a Uf'),
  payment: z.enum(['credit', 'debit', 'cash'], {
    invalid_type_error: 'Informe um método de pagamento',
  }),
})

export type NewAddressFormData = z.infer<typeof NewAddressSchema>

export function Checkout() {
  const { cart, checkout } = useContext(CardContext)

  const NewAddresFormContext = useForm<NewAddressFormData>({
    resolver: zodResolver(NewAddressSchema),
  })

  const { handleSubmit, register, watch, formState } = NewAddresFormContext

  const { isDirty, isValid } = formState

  const coffesInCart = cart.map((item) => {
    const coffesInfo = Coffes.find((coffee) => coffee.id === item.id)

    if (!coffesInfo) {
      throw new Error('Invalid Coffe')
    }

    return {
      ...coffesInfo,
      quantity: item.quantity,
    }
  })

  const deliveryPrice = coffesInCart.length < 1 ? 0 : 3.5

  const totalItemInCart = coffesInCart.reduce((previousValue, currentTime) => {
    return (previousValue += currentTime.value * currentTime.quantity)
  }, 0)

  const PaymentSelect = watch('payment')

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<NewAddressFormData> = (data) => {
    if (cart.length === 0) {
      return alert('erro')
    }
    checkout(data, navigate)
  }

  return (
    <section className="flex flex-col gap-3 md:flex-row xl:gap-0 xl:justify-between ">
      <div>
        <strong className="text-lg font-bold text-gray-800 dark:text-gray-400">
          Complete seu pedido
        </strong>

        <div className=" bg-gray-200 p-10 mt-4 rounded-md dark:bg-gray-900">
          <InfoForm
            logo={<MapPin className="text-yellow-300 w-[22px]" />}
            title="Endereço de Entrega"
            info="Informe o endereço onde deseja receber seu pedido"
          />

          <form id="order" onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <FormProvider {...NewAddresFormContext}>
              <CartForm />
            </FormProvider>
          </form>
        </div>

        <div className="flex flex-col gap-8 bg-gray-200 px-10 py-5 mt-4 rounded-md dark:bg-gray-900">
          <InfoForm
            logo={<DollarSign className="text-purple-200 w-[22px]" />}
            title="Endereço de Entrega"
            info="Informe o endereço onde deseja receber seu pedido"
          />

          <div className="flex flex-col xl:flex-row gap-3">
            <PayButton
              isSelected={PaymentSelect === 'credit'}
              {...register('payment')}
              value="credit"
            >
              <CreditCard className="w-4 text-purple-200" />
              <span>Cartão de crédito</span>
            </PayButton>

            <PayButton
              isSelected={PaymentSelect === 'debit'}
              {...register('payment')}
              value="debit"
            >
              <Landmark size={16} className="w-4 text-purple-200" />
              <span>Cartão de débito</span>
            </PayButton>

            <PayButton
              isSelected={PaymentSelect === 'cash'}
              {...register('payment')}
              value="cash"
            >
              <Banknote size={16} className="w-4 text-purple-200" />
              <span>Dinheiro</span>
            </PayButton>
          </div>
        </div>
      </div>

      <div className="md:w-full lg:w-[448px]">
        <strong className="text-lg font-bold text-gray-800 dark:text-gray-400">
          Complete seu pedido
        </strong>

        {coffesInCart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-6 w-full bg-gray-200 p-10 mt-4 rounded-tr-[44px] rounded-tl-md rounded-bl-[44px] rounded-br-md dark:bg-gray-900">
            {coffesInCart.map((coffee) => {
              return (
                <div className="w-full space-y-6" key={coffee.id}>
                  <CoffeCard
                    itemId={coffee.id}
                    img={coffee.image}
                    title={coffee.name}
                    price={coffee.value.toFixed(2)}
                    quantity={coffee.quantity}
                  />
                  <div className="w-full h-[1px] bg-gray-400 dark:bg-gray-800" />
                </div>
              )
            })}
            <div className="w-full space-y-3">
              <PayItems
                title="Total de itens"
                price={new Intl.NumberFormat('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemInCart)}
              />

              <PayItems
                title="Entrega"
                price={new Intl.NumberFormat('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(deliveryPrice)}
              />

              <PayItems
                title="Total"
                price={new Intl.NumberFormat('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemInCart + deliveryPrice)}
                className="text-lg font-bold text-gray-800"
              />
            </div>

            <button
              form="order"
              disabled={!isDirty || !isValid}
              className="w-full text-white text-sm font-bold uppercase py-3 bg-yellow-200 rounded-md disabled:opacity-55"
            >
              Confirmar pedido
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
