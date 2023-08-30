import { SVGProps, Ref, forwardRef, memo } from 'react'

type PropsType = {
  like: '#990f2b' | '#4c4c4c'
}

const SvgComponent = (props: SVGProps<SVGSVGElement> & PropsType, ref: Ref<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24.00 24.00"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#990f2b"
    strokeWidth="0.00024000000000000003"
    ref={ref}
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

    <g id="SVGRepo_iconCarrier">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0501 7.04419C15.4673 5.79254 14.5357 4.5 13.2163 4.5C12.5921 4.5 12.0062 4.80147 11.6434 5.30944L8.47155 9.75H5.85748L5.10748 10.5V18L5.85748 18.75H16.8211L19.1247 14.1428C19.8088 12.7747 19.5406 11.1224 18.4591 10.0408C17.7926 9.37439 16.8888 9 15.9463 9H14.3981L15.0501 7.04419ZM9.60751 10.7404L12.864 6.1813C12.9453 6.06753 13.0765 6 13.2163 6C13.5118 6 13.7205 6.28951 13.627 6.56984L12.317 10.5H15.9463C16.491 10.5 17.0133 10.7164 17.3984 11.1015C18.0235 11.7265 18.1784 12.6814 17.7831 13.472L15.8941 17.25H9.60751V10.7404ZM8.10751 17.25H6.60748V11.25H8.10751V17.25Z"
        fill={props.like}
      />
    </g>
  </svg>
)

const ForwardRef = forwardRef(SvgComponent)

export const Like = memo(ForwardRef)
