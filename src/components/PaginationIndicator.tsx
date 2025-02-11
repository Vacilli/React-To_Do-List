type PaginationIndicatorProps = {
  className: string
}

export default function PaginationIndicator({
  className,
}: PaginationIndicatorProps) {
  return <div className={`indicator ${className}`}></div>
}
