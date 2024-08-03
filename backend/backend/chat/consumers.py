import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Channels, Messagelog
from channels.db import database_sync_to_async

class ChatConsumer(WebsocketConsumer):
    
    @database_sync_to_async
    def createChannels(self):
        Channels.objects.update_or_create(user = self.user, channel_name=self.channel_name, status=True)

    @database_sync_to_async
    def deleteChannels(self):
        Channels.objects.update_or_create(user = self.user, channel_name=self.channel_name, status=False)

    @database_sync_to_async
    def getChannel_name(self, username):
        channel = Channels.objects.get(user__username = username)
        return channel.channel_name, channel.status

    @database_sync_to_async
    def database_log(self, message, to, status, sender):
        message = Messagelog.objects.create(message=message, to=to, status=status, sender=sender)
        return message

    @database_sync_to_async
    def fetchPendingMessage(self,to):
        message = Messagelog.objects.filter(to=to ,status=False).all()
        return message


    async def connect(self):
        self.user =  self.scope["user"]
        self.createChannels()
        await self.accept()
        message = self.fetchPendingMessage(to=self.user.username)
        msg = [{"from" : x.sender, "message" : x.message} for x in message]
        await self.send(text_data=json.dumps(msg))

    async def disconnect(self, close_code):
        self.deleteChannels()
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        to = text_data_json["to"]
        sender = text_data_json["from"]
        channel_name, status = self.getChannel_name(to)
        if status:
            async_to_sync(self.channel_layer.group_send)(
                channel_name, {"type": "chat.message", "message": message, "from": sender}
            )
        self.database_log(message, to, status, sender)     


    async def chat_message(self, event):
        message = event["message"]
        await self.send(text_data=message)
