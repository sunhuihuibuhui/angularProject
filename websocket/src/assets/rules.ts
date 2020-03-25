        //包头
        // private static byte[] HEADER = Encoding.UTF8.GetBytes("MS\n");

        //基础包长度 包头3  长度字节4 命令类型1 命令方法1 请求类型1 标识1 交换ID长度1
        // private const int BASEPACKETLENGTH = 15;

        // module模块，api？  method是方法，get post？ requestType是请求or响应，identify是第几次回传，为一个数字，content是发送内容，即api接受的参数  exchangeId是后台填写的，此处为空字符串
        // public static byte[] Packet(byte module, byte method, RequestType requestType, UInt32 identify, object content, string exchangeId)
        // {

        //     List<byte> data = new List<byte>();
        //     data.AddRange(HEADER);

        //     byte[] contentArray = null;

        //     if (content == null)
        //     {
        //         contentArray = new byte[0];
        //     }
        //     else if (content.GetType() == typeof(string))
        //     {
        //         contentArray = Encoding.UTF8.GetBytes(content.ToString());
        //     }
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

