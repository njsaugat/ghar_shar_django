from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import UserSerializer,AuthenticatedResponseSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.sessions.models import Session
from django.utils import timezone
def get_form_data(request):
    requestBody=request.data["body"]
    data = {
    'first_name':requestBody.get("firstname"), 
    'last_name':requestBody.get("lastname"),
    'username':requestBody.get("username"),
    'email':requestBody.get("email"),
    'password':make_password(requestBody.get("password")),
    }
    return data
class SignupView(APIView):
    permission_classes=[AllowAny]
    
    # @api_view(['POST'])
    def post(self,request,*args,**kwargs):
        data=get_form_data(request=request)
        print("----->",data)
        serializer=UserSerializer(data=data)
        if serializer.is_valid():
            user=serializer.save()
            login(request,user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes=[AllowAny]
    
    def post(self, request, *args,**kwargs):
        username=request.data["body"].get('username')
        password=request.data["body"].get('password')
        print("username--------->",username)
        # account = User(email=self.validated_data['email'], username=self.validated_data['password'])
        # print("account-->",account)
        print("--->",username,password)
        user=authenticate(request, username=username,password=password)
        print("user--------->",user)
        if user is not None and check_password(password, user.password):
            login(request,user)
            serializer=UserSerializer(user)
            return Response(serializer.data)
        return Response({'error':'Invalid credentials'},status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes=[IsAuthenticated]
    
    def post(self,request,*args,**kwargs):
        logout(request)
        return Response({'message':'Logout successful'},status=status.HTTP_200_OK)


class AuthenticatedView(APIView):
    permission_classes=[AllowAny]
    
    def get(self,request):
        session_id= request.COOKIES.get('sessionid')
        if not session_id:
            serializer = AuthenticatedResponseSerializer({'loggedIn': False, 'message': 'Session ID not found'})
            return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)      
        try:
            session=Session.objects.get(session_key=session_id)
            if session.expire_date<=timezone.now():
                # Session is expired
                serializer = AuthenticatedResponseSerializer({'loggedIn': False, 'message': 'Session expired'})
                return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
            
            user_id=session.get_decoded().get('_auth_user_id')
            user=User.objects.get(pk=user_id)

            if not user.is_authenticated:
                # User is not authenticated
                serializer = AuthenticatedResponseSerializer({'loggedIn': False, 'message': 'User not authenticated'})
                return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)                            
            serializer=AuthenticatedResponseSerializer({'loggedIn':True,'user_id':user_id})
            return Response(serializer.data,status=status.HTTP_200_OK)
            
        except Session.DoesNotExist:
            # Invalid session ID
            serializer = AuthenticatedResponseSerializer({'loggedIn': False, 'message': 'Invalid session ID'})
            return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
        
               
    
@api_view(['GET'])
def get_user(request):
    print('--->',request)
    all_users=User.objects.all()
    print("----------->",all_users)
    # user={'name':'John','age':21}
    # print(all_users.get_queryset())
    serialized_users=UserSerializer(all_users)
    return Response(serialized_users.data)








