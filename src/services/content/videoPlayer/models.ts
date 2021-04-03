
export interface IVideoTokenResponse {
    readonly token: string | undefined
    readonly timestamp: number | undefined
    readonly client_id: string | undefined
}

export interface IVideoStreamResponse {
    readonly vods: IVideoStreamVod
    readonly live: IVideoStreamData
}

export interface IVideoStreamVod {
    readonly total: number | undefined
    readonly data: IVideoStreamDetails[] 
}

export interface IVideoStreamDetails {
    readonly type: string | undefined
    readonly data: IVideoStreamData
}

export interface IVideoStreamData {
    readonly id: number | undefined
    readonly draft: boolean | undefined
    readonly views: number | undefined
    readonly caption: string | undefined
    readonly description: string | undefined
    readonly duration: number | undefined
    readonly eventId: number |undefined
    readonly m3u8: string | undefined 
}

export interface IVideoPlayerState {
    readonly isLoading: boolean 
    readonly stream: IVideoStreamResponse | undefined
    readonly token: IVideoTokenResponse | undefined
}