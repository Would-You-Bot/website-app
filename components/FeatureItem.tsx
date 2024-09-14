const FeatureItem: React.FC<{
  left: React.ReactNode
  right: React.ReactNode
  reverse?: true
}> = ({ left, right, reverse }) => (
  <div className="flex w-full flex-col justify-between gap-8 md:flex-row md:gap-20">
    <div
      className="mx-auto flex flex-col justify-center gap-2 sm:w-2/3 md:w-1/2"
    >
      {left}
    </div>
    <div
      className={`mx-auto flex flex-col justify-center gap-2 sm:w-2/3 md:w-1/2 ${
        reverse ? 'order-last md:order-first' : ''
      }`}
    >
      {right}
    </div>
  </div>
)

export default FeatureItem
