

interface Parmas{
    module:number;
    method:number;
    RequestType:boolean;
    identify:number;
    content?:string;
    exchangeId?:string;

}
function send(parmas:Parmas){
    if(parmas.content == null){

    }

}



function encodeUtf8(text:string):any {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (var i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}


var sendMsg = function(module:number, method:number, RequestType:boolean, identify:number, content:any, exchangeId:any=''):any{
    // 最终返回的是一个数组

    // return dataArray
    let data = [],contentArray = null;
    // data.push(byte.HEADER)

    // 如果传空字符串呢
    if (content == null){
        // contentArray = new byte[0]
    }else if(typeof content === 'string' || typeof content == 'number'){
        contentArray = encodeUtf8(content.toString());
    }else if(typeof content == 'boolean'){
        // contentArray = new byte[] { bool.Parse(content.toString()) ? (byte)1 : (byte)0 };
    }else if(Array.isArray(content)){
        // contentArray = content as byte[];
    }
    else{
        // contentArray = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(content));
    }
    return contentArray

    //     byte[] exchangeIdArray = exchangeId == null ? new byte[0] : Encoding.UTF8.GetBytes(exchangeId.ToString());
    //     data.AddRange(BitConverter.GetBytes((Int32)IPAddress.HostToNetworkOrder(contentArray.Length + BASEPACKETLENGTH + exchangeIdArray.Length)));
    //     data.Add(module);
    //     data.Add(method);
    //     data.Add((byte)requestType.GetHashCode());
    //     data.AddRange(BitConverter.GetBytes((Int32)IPAddress.HostToNetworkOrder((Int32)identify)));
    //     data.Add((byte)exchangeIdArray.Length);
    //     data.AddRange(exchangeIdArray);
    //     data.AddRange(contentArray);
    //     return data.ToArray();
    // }

        // byte是一个数组？那为什么有key

}
console.log(sendMsg(1,1,true,0,'hello'))

// 
let url:string = 'http:example.com/websocket';
var ws = new WebSocket(url); 

// 连接建立时调用向服务端发送消息
ws.onopen = function (evt) { 
    console.log(evt)
    ws.send("Hello");
} 

// 接收服务端发送的消息
ws.onmessage = function(msg) {
    console.log(msg)  
    ws.close()
    
}
// 关闭时调用
ws.onclose = function () { 
    console.log('closed')
} 
// 错误处理
ws.onerror = function (error) { 
    console.log('error:'+error)
} 