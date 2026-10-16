import type { Message } from './conversations'

export type EventType = 'NEW_MESSAGE' | 'USER_TYPING' | 'MESSAGE_READ' | 'MESSAGE_DELETED'

export interface BaseEvent {
    type: EventType
}

export interface NewMessageEvent extends BaseEvent {
    type: 'NEW_MESSAGE'
    message: Message
}

export interface UserTypingEvent extends BaseEvent {
    type: 'USER_TYPING'
    userId: number
    conversationId: number
}

export interface MessageReadEvent extends BaseEvent {
    type: 'MESSAGE_READ'
    memberId: number
    lastReadMessageId: number
}

export type MDType = 'FOR_ALL' | 'FOR_ONE'

export interface MessageDeletedEvent extends BaseEvent {
    type: 'MESSAGE_DELETED'
    mdType: MDType
    messageId: number
    memberId: number | null
}

export type WebSocketEvent =
    | NewMessageEvent
    | UserTypingEvent
    | MessageReadEvent
    | MessageDeletedEvent
