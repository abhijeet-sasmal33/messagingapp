from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Friendship
from django.db.models import Q
from django.http import JsonResponse
import json

# Create your views here.
@api_view(['POST'])
def createUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['email']
        password = data['password']
        first_name = data['first_name']
        last_name = data['last_name']
        email =  username

        user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        return Response({'message': "User Registeration successful"})
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@api_view(['GET', 'POST'])
def addFriends(request):
    user = request.user
    
    if request.method == 'GET':
        friends = Friendship.objects.filter(Q(person=user) | Q(to=user)).values('person', 'to')
        return JsonResponse(list(friends), safe=False)
    
    if request.method == 'POST':
        to = request.POST['to']
        to = User.objects.get(username=to)

        fr = Friendship.objects.create(person=user, to=to)
        return Response({'message': "Friends Added"})

@api_view(['POST'])
def isAuthenticated(request):
    user = request.user
    if user.isAuthenticated:
        return Response({'msg': True})
    else:
        return Response({'msg': False})
