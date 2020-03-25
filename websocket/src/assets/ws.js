
let byte = {
    HEADER : Encoding.UTF8.GetBytes("MS\n"),
    module:'',
    method:'',
}
let BASEPACKETLENGTH = 15;
var sendMsg = function(module, method, RequestType, identify, content, exchangeId){
    // 最终返回的是一个数组
    let data = [],contentArray = null;
    data.push(byte.HEADER)


            if (content == null) {
                contentArray = new byte[0]
            }else if (typeof content == 'sting'){
                contentArray = Encoding.UTF8.GetBytes(content.ToString());
            }
        //     else if (content.GetType() == typeof(int) || content.GetType() == typeof(long) || content.GetType() == typeof(float))
        //     {
        //         contentArray = Encoding.UTF8.GetBytes(content.ToString());
        //     }
        //     else if (content.GetType() == typeof(bool))
        //     {
        //         contentArray = new byte[] { bool.Parse(content.ToString()) ? (byte)1 : (byte)0 };
        //     }
        //     else if (content.GetType() == typeof(byte[]))
        //     {
        //         contentArray = content as byte[];
        //     }
        //     else
        //     {
        //         if(content is Google.Protobuf.IMessage)
        //         {
        //             IMessage iMessage = content as IMessage;
        //             contentArray = iMessage.ToByteArray();
        //         }
        //         else
        //         {
        //             contentArray = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(content));
        //         }
                
        //     }

        // 转成byte数组，数据域，作为整理封装
        // http，tcp
        // 控制器，
        // web接口会用ws
        // http的可能会改ws

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

        // byte是一个数组？那为什么有header





}


let url = 'http:example.com/websocket';
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