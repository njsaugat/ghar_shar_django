from django.contrib.sessions.models import Session
from django.utils import timezone
from django.contrib.auth.models import User


class AuthenticationMiddleware:
    def __init__(self,get_response):
        self.get_response=get_response
        
    def __call__(self,request):
        session_id=request.COOKIES.get('sessionid')
        
        if session_id:
            try:
                session=Session.objects.get(session_key=session_id)
                if session.expire_date>timezone.now():
                    user_id=session.get_decoded().get('_auth_user_id')
                    user=User.objects.get(pk=user_id)
                    
                    if user.is_authenticated:
                        request.user_id=user_id
            except (Session.DoesNotExist,User.DoesNotExist):    
                pass
        response=self.get_response(request)
        
        return response