

const SmallLoader = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div
        className={`w-8 h-8 border-4 border-transparent text-primary-orange text-4xl animate-spin flex items-center justify-center border-t-primary-orange rounded-full`}
      >
        <div className="w-5 h-5 border-4 border-transparent text-secondary-orange text-2xl animate-spin flex items-center justify-center border-t-secondary-orange rounded-full"></div>
      </div>
    </div>
  )
}

export default SmallLoader