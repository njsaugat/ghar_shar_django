from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login
from rest_framework.decorators import api_view

class SignupView(APIView):
    permission_classes=[AllowAny]
    
    @api_view(['POST'])
    def post(self,request,*args,**kwargs):
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            login(request,user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes=[AllowAny]
    
    def post(self, request, *args,**kwargs):
        username=request.data.get('username')
        password=request.data.get('password')
        user=authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            serializer=UserSerializer(user)
            return Response(serializer.data)
        return Response({'error':'Invalid credentials'},status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def get_user(request):
    print('--->',request)
    all_users=User.objects.all()
    print("----------->",all_users)
    # user={'name':'John','age':21}
    # print(all_users.get_queryset())
    serialized_users=UserSerializer(all_users)
    return Response(serialized_users.data)








# from django.shortcuts import render,redirect
# from django.contrib.auth.decorators import login_required
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth import login, authenticate
# @login_required
# def home(request):
#     return render(request,'login.html')


# def signup(request):
#     print("here------>")
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             raw_password = form.cleaned_data.get('password1')
#             user = authenticate(username=username, password=raw_password)
#             login(request, user)
#             return redirect('home')
#     else:
#         form = UserCreationForm()
#     return render(request, 'registration/signup.html' ,{'form':form})



