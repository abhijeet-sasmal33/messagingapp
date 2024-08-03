from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Channels(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    channel_name = models.CharField(max_length=255)
    status = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.user.username
    

class Messagelog(models.Model):
    message = models.CharField(max_length=255)
    to = models.CharField(max_length=255)
    status= models.BooleanField(default=False)
    sender = models.CharField(max_length=255)


class Friendship(models.Model):
    to = models.ForeignKey(User, on_delete=models.CASCADE)
    person = models.ForeignKey(User, on_delete=models.CASCADE)