import asyncio
import websockets

# 油猴 websocket 实现通讯 - 简书
#  https://www.jianshu.com/p/a09b8d37354b

# 测试链接
#   https://live.douyin.com/250873930075

ws_server = "127.0.0.1"
ws_port = 54321


async def recv_msg(websocket):
    while True:
        recv_text = await websocket.recv()
        # Todo: Add more processing functions
        print(recv_text)
        await websocket.send(recv_text)


async def main(websocket, path):
    await recv_msg(websocket)


try:
    start_server = websockets.serve(main, ws_server, ws_port)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
except:
    pass
