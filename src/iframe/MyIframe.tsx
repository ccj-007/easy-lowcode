import type { FC } from 'react';
import options from '../options'
import React, { useEffect } from 'react';

interface MyIframeProps { }

const MyIframe: FC<MyIframeProps> = (props) => {
    useEffect(() => {
        window.addEventListener('message', function (event) {
            console.log("我是iframe父亲", event);
        }, false);

        // if (isIframe) {
        //   let iframe = document.getElementsByTagName('iframe')[0] as HTMLIFrameElement
        //   iframe?.contentWindow?.postMessage({ json: globalObj }, "*")
        // }
    }, [])

    return (
        <iframe src={options.iframeURL} {...props} frameBorder="0" width={'100%'} height={'100%'}></iframe>
    );
}

export default MyIframe;
