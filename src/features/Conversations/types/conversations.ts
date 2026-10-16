export interface MyConversations {
    conversations: MyConversation[]
    nextLastUpdatedAt: string
    nextLastId: number
}

export interface MyConversation {
    conversationId: number
    lastMessage: Message
    updatedAt: string
    unreadCount: number
}

export interface Message {
    id: number
    sender: Member
    text: string
    createdAt: string
    deletedAt: string
}

export interface Member {
    id: number
    displayName: string
}

export interface Conversation {
    id: number
    title: string
    type: string
    visibility: string
    createdAt: string
}

export interface Messages {
    messages: Message[]
    hasMore: boolean
    nextLastCreatedAt: string
    nextLastId: number
}
