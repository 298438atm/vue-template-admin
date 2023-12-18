import CryptoJS from 'crypto-js'

const APISecret = 'MmEyMDk5MDY4NDU0MWIzNTllZDdmYmJl'
const APIKey = '9c55c46a4c72a3360fc1112f069cafcc'
const APPId = '5802eb00'


export class Ask {
  constructor(vm) {
    this.url = this.getUrl();
    this.vm = vm
    this.readyState = WebSocket.CONNECTING;
    this.socket = new WebSocket(this.url);
    
    // 处理连接成功事件
    this.socket.onopen = (event) => {
      this.readyState = WebSocket.OPEN;
      console.log('WebSocket连接成功');
      this.vm.$emit('ws', {
        type: 'success',
        data: event
      })

    };
    
    // 处理接收到消息事件
    this.socket.onmessage = (event) => {
      const {header, payload} = JSON.parse(event.data);
      if (header.code === 0) {
        console.log('WebSocket收到消息', payload);
        this.vm.$emit('ws', {
          type: 'getMessage',
          data: payload
        })
      } else {
        console.log('WebSocket收到错误消息', header.message);
      }
      
    };
    
    // 处理连接关闭事件
    this.socket.onclose = (event) => {
      this.readyState = WebSocket.CLOSED;
      console.log('WebSocket连接已关闭');
      this.vm.$emit('ws', {
        type: 'close',
        data: event
      })
    };
    
    // 处理连接出错事件
    this.socket.onerror = (event) => {
      this.vm.$emit('ws', {
        type: 'error',
        data: event
      })
      console.error('WebSocket连接出错', event);
    };
  }
  
  getUrl() {
    var apiKey = APIKey
    var apiSecret = APISecret
    var url = 'wss://spark-api.xf-yun.com/v1.1/chat'
    var host = 'spark-api.xf-yun.com'
    var date = new Date().toGMTString()
    var algorithm = 'hmac-sha256'
    var headers = 'host date request-line'
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
    var signature = CryptoJS.enc.Base64.stringify(signatureSha)
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    var authorization = btoa(authorizationOrigin)
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
    return url
  }
  // 发送数据
  send(text) {
    const params = {
      header: {
        app_id: APPId,
        uid: '17623643348'
      },
      parameter: {
        chat: {
          domain: 'general',
          temperature: 0.2,
          max_tokens: 4096
        }
      },
      payload: {
        message: {
          text: text
        }
      }
    }
    if (this.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(params));
    } else {
      console.error('WebSocket未连接或已关闭，无法发送数据');
    }
  }
  
  // 关闭WebSocket连接
  close() {
    if (this.readyState === WebSocket.OPEN) {
      this.socket.close();
    } else {
      console.error('WebSocket未连接或已关闭，无法关闭连接');
    }
  }
}


