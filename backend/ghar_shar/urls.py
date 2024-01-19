"""
URL configuration for ghar_shar project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.views.generic.base import RedirectView
# from .views import signup
from .views import SignupView,LoginView,LogoutView,AuthenticatedView,get_user
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    # path('',RedirectView.as_view(url='/accounts/login/',permanent=True)),
    path("admin/", admin.site.urls),
    path("accounts/",include("django.contrib.auth.urls")), #django.contrib.auth -->app's name
    # path("signup/",signup, name='signup'),
    path('api/signup',SignupView.as_view(),name='api-signup'),
    path('api/login',LoginView.as_view(),name='api-login'),
    path('api/logout',LogoutView.as_view(),name='api-logout'),
    path('api/isAuthenticated',AuthenticatedView.as_view(),name='api-authenticate'),
    path('api/user/',get_user),
    path('api/',include("listings.urls")),
    path('api/',include("properties.urls")),

    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
