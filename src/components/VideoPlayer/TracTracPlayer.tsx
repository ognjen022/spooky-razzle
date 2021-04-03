import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export interface ITracTracPlayerProps {
    tracTracSource : string | undefined
}

const TracTracPlayer:  React.FC<ITracTracPlayerProps> = (props: ITracTracPlayerProps, context: any) => {

    return (<div
        className={'spooky-player theoplayer-container video-js theoplayer-skin vjs-16-9 THEOplayer'}
    >
        <iframe src={props.tracTracSource} title="tractrac" ></iframe>

    </div>)
}

export default TracTracPlayer