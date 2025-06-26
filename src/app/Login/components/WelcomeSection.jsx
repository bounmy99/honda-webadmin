export default function WelcomeSection() {
  return (
    <div className="w-1/2 bg-gradient-to-b from-[#1F263E] to-[#2A7A8B] relative overflow-hidden" 
         style={{
           clipPath: 'ellipse(90% 90% at 5% 50%)'
         }}>
      
      
      
      <div className="relative z-10 p-12 h-full flex flex-col justify-between text-white">
        <div className="mt-8">
          <h1 className="text-6xl font-bold mb-6 leading-tight">Hell, welcome!</h1>
          <p className="text-2xl text-white font-medium ml-16">CRM system Management</p>
        </div>
        
        <div className="mb-8">
          <p className="text-white mb-1 text-lg">Version 1.0</p>
          <p className="text-xl">
            <span className="text-green-400 font-bold">MiDi</span>
            <span className="text-white font-medium"> technology</span>
          </p>
        </div>
      </div>
    </div>
  )
}