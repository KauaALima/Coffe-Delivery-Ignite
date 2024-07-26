import { getAddressByCEP } from 'cep-address-finder'
import { Input } from '../ui/Input'
import { Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

export function CartForm() {
  const { register, getValues, setValue, setFocus } = useFormContext()

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

    if (cepData.city === undefined) {
      return alert('Cep não encontrado')
    }

    setValue('road', cepData.street)
    setValue('complement', cepData.complement)
    setValue('neighborhood', cepData.neighborhood)
    setValue('city', cepData.city)
    setValue('uf', cepData.state)
    setFocus('houseNumber')
    console.log(cepData)
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <Input
          type="number"
          placeholder="CEP"
          className="w-[200px] "
          {...register('cep')}
        />
        <button
          className="p-3 ring-1 ring-gray-400 bg-gray-300 text-sm text-gray-700 rounded duration-150 hover:bg-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-800 dark:hover:bg-gray-800"
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
  )
}
