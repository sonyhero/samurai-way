import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg viewBox="-0.5 0 25 25" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M12 7.82001H22" stroke="#407c87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M2 7.82001H4" stroke="#407c87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M20 16.82H22" stroke="#407c87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M2 16.82H12" stroke="#407c87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path
        d="M8 11.82C10.2091 11.82 12 10.0291 12 7.82001C12 5.61087 10.2091 3.82001 8 3.82001C5.79086 3.82001 4 5.61087 4 7.82001C4 10.0291 5.79086 11.82 8 11.82Z"
        stroke="#407c87"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M16 20.82C18.2091 20.82 20 19.0291 20 16.82C20 14.6109 18.2091 12.82 16 12.82C13.7909 12.82 12 14.6109 12 16.82C12 19.0291 13.7909 20.82 16 20.82Z"
        stroke="#407c87"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const SettingsNav = memo(ForwardRef)
