import { UIEvent, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../../../../app/store'
import { getMessages } from '../../../../../../app/model/selectors/chat-selector'
import { ChatMessage } from './ChatMessage/ChatMessage'

export const ChatMessages = () => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const messages = useAppSelector(getMessages)
  const [isAutoScrollIsActive, setIsAutoScrollIsActive] = useState(true)

  useEffect(() => {
    if (isAutoScrollIsActive) {
      messagesAnchorRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
  }, [messages])

  const onScrollHandler = (e: UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScrollIsActive && setIsAutoScrollIsActive(true)
    } else {
      isAutoScrollIsActive && setIsAutoScrollIsActive(false)
    }
  }

  const mappedMessages = messages?.map((m, index) => <ChatMessage key={index} messageBody={m} />)

  return (
    <div onScroll={onScrollHandler} style={{ height: '300px', overflowY: 'auto' }}>
      {mappedMessages}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}
