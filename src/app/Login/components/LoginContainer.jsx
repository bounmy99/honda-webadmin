import WelcomeSection from './WelcomeSection'
import LoginForm from './LoginForm'

export default function LoginContainer() {
  return (
    <div className="w-full max-w-7xl h-[750px] bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex h-full">
        <WelcomeSection />
        <LoginForm />
      </div>
    </div>
  )
}
