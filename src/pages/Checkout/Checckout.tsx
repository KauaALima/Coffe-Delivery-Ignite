import { useContext } from 'react'
import * as z from 'zod'
import { CardContext } from '../../contexts/CardContextProvider'
import { Coffes } from '../../utils/Coffes.json'
import { getAddressByCEP } from 'cep-address-finder'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

import { Input } from '../../components/ui/Input'
import { InfoForm } from './components/InfoForm'
import { PayButton } from './components/PayButton'
import { CoffeCard } from './components/CoffeCard'
import { PayItems } from './components/PayItems'
import {
  MapPin,
  DollarSign,
  CreditCard,
  Landmark,
  Banknote,
  Search,
  ShoppingCartIcon,
} from 'lucide-react'

const NewAddressSchema = z.object({
  cep: z.string({ invalid_type_error: 'Informe o CEP' }).min(1),
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

type NewAddressFormData = z.infer<typeof NewAddressSchema>

export function Checkout() {
  const { cart } = useContext(CardContext)

  const NewCycleFormContext = useForm<NewAddressFormData>({
    resolver: zodResolver(NewAddressSchema),
  })

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

  const {
    handleSubmit,
    // formState: { errors },
    register,
    watch,
    setValue,
    setFocus,
    getValues,
  } = NewCycleFormContext

  const PaymentSelect = watch('payment')

  async function handleAutoCompleteCep() {
    const cepInput = getValues('cep')

    if (cepInput === '') {
      return alert('CEP não pode ser vazio.')
    }

    if (cepInput.length < 8) {
      return alert('CEP deve conter exatamente 8 números.')
    }
    const normalizeCepNumber = (value: string | undefined) => {
      if (!value) return ''
      return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
    }
    const cep = normalizeCepNumber(cepInput)

    const cepData = await getAddressByCEP(cep)

    setValue('road', cepData.street)
    setValue('complement', cepData.complement)
    setValue('neighborhood', cepData.neighborhood)
    setValue('city', cepData.city)
    setValue('uf', cepData.state)
    setFocus('houseNumber')
    console.log(cepData)
  }

  const onSubmit: SubmitHandler<NewAddressFormData> = (data) =>
    console.log(data)

  return (
    <section className="flex justify-between ">
      <div>
        <strong className="text-lg font-bold text-gray-800">
          Complete seu pedido
        </strong>

        <div className=" bg-gray-200 p-10 mt-4 rounded-md">
          <InfoForm
            logo={<MapPin className="text-yellow-300 w-[22px]" />}
            title="Endereço de Entrega"
            info="Informe o endereço onde deseja receber seu pedido"
          />

          <form id="order" onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-center">
                <Input
                  type="number"
                  placeholder="CEP"
                  className="w-[200px] "
                  {...register('cep')}
                />
                <button
                  className="p-3 ring-1 ring-gray-400 bg-gray-300 text-sm text-gray-700 rounded duration-150 hover:bg-gray-500"
                  onClick={handleAutoCompleteCep}
                >
                  <Search size={20} />
                </button>
              </div>

              <Input type="text" placeholder="Rua" {...register('road')} />

              <div className="flex gap-3">
                <Input
                  type="number"
                  id=""
                  placeholder="Numero"
                  {...register('houseNumber')}
                />

                <Input
                  type="text"
                  placeholder="Complemento"
                  className="w-full"
                  {...register('complement')}
                />
              </div>

              <div className="flex gap-3">
                <Input
                  type="text"
                  id=""
                  placeholder="Bairro"
                  {...register('neighborhood')}
                />
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Cidade"
                    className="w-[276px]"
                    {...register('city')}
                  />
                  <Input
                    type="text"
                    placeholder="UF"
                    className="w-[60px]"
                    {...register('uf')}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-8 bg-gray-200 px-10 py-5 mt-4 rounded-md">
          <InfoForm
            logo={<DollarSign className="text-purple-200 w-[22px]" />}
            title="Endereço de Entrega"
            info="Informe o endereço onde deseja receber seu pedido"
          />

          <div className="flex gap-3">
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

      <div className="w-[448px]">
        <strong className="text-lg font-bold text-gray-800">
          Complete seu pedido
        </strong>

        {coffesInCart.length === 0 ? (
          <div className="text-center bg-gray-200 p-10 mt-4 space-y-6 rounded-tr-[44px] rounded-tl-md rounded-bl-[44px] rounded-br-md">
            <strong className="text-2xl">O seu carrinho está vazio.</strong>
            <p>Deseja olhar outros produtos similares?</p>

            <Link
              to="/"
              className="w-full flex gap-3 items-center justify-center text-white text-sm font-bold uppercase py-3 bg-yellow-200 rounded-md"
            >
              <ShoppingCartIcon fill="white" to={'/'} />
              Continuar comprando
            </Link>
          </div>
        ) : (
          <div className="space-y-6 bg-gray-200 p-10 mt-4 rounded-tr-[44px] rounded-tl-md rounded-bl-[44px] rounded-br-md">
            {coffesInCart.map((coffee) => {
              return (
                <div className="space-y-6" key={coffee.id}>
                  <CoffeCard
                    itemId={coffee.id}
                    img={coffee.image}
                    title={coffee.name}
                    price={coffee.value.toFixed(2)}
                    quantity={coffee.quantity}
                  />
                  <div className="w-full h-[1px] bg-gray-400 mt-" />
                </div>
              )
            })}
            <div className="space-y-3">
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
              className="w-full text-white text-sm font-bold uppercase py-3 bg-yellow-200 rounded-md"
            >
              Confirmar pedido
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
