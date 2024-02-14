import { forwardRef, memo, Ref, SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 4 8 8" width={8} height={16} fill="none" ref={ref} {...props}>
    <g>
      <path fill="#fff" d="M5.727 11.06 8.78 8 5.727 4.94l.94-.94 4 4-4 4-.94-.94Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const ArrowRight = memo(ForwardRef)
