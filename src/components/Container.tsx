import { cn } from "@/lib/utils"

const Container = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn("max-w-6xl w-full px-6 mx-auto", className)} {...props}>
      { children }
    </div>
  )
}

export default Container;