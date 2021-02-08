import { useRouter } from 'next/router'
import { useUser } from '../src/hooks'
import { ROUTES } from '../src/utils/locale/constants'

export default function Dashboard() {
  const router = useRouter()
  const data = useUser()
  const { isError } = data
  console.log(data)

  if (isError) {
    router.push(ROUTES.SIGN_IN.URL)
  }

  return <div>dashboard</div>
}
